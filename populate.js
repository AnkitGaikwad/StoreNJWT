require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected");
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Successfully inserted all products");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();