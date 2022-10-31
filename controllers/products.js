const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // Instead of setting the try catch and
    // instead of setting our own middleware, we use package to do all the tasks
    //throw new Error('testing async error');
    const products = await Product.find({}).sort("-name price");
    res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
    const { featured,company,name,sort } = req.query;
    // http://localhost:3000/api/v1/products/?name=e&featured=false&company=ikea
    // Search for products using various filters
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i'};
    }
    console.log(queryObject);
    let result = Product.find(queryObject);
    // http://localhost:3000/api/v1/products?sort=name,-price
    if (sort) {
        console.log(sort);
        result = result.sort();
    }
    const limit = Number(req.query.limit) || 10;
    result.limit(limit);
    const products = await result;
    res.status(200).json({products, nbhits: products.length});
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}