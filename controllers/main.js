const {BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    // mongoose validation
    // Joi
    // check in the controller
    if(!username || !password) {
        throw new BadRequestError('Please provide a username and password');
    }
    const id = new Date().getDate();
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});
    //res.send('Fake login/Register route');
    res.status(200).json({msg: "user created successfully", token});
};

const dashboard = async(req, res) => {
    //console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your lucky number: ${luckyNumber}`});
};

module.exports = {
    login, dashboard
}