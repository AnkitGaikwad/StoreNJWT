const {UnauthenticatedError} = require('../errors/index');
const jwt = require('jsonwebtoken');
const { request } = require('express');

const authorizationMiddleware = async (req, res, next) => {
    //console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('NO token provided');
    }
    const token = authHeader.split(' ')[1];
    //console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id,username} = decoded;
        request.user = {id,username};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
};

module.exports = authorizationMiddleware;