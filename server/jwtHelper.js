const jwt = require('jsonwebtoken');
const config = require('./config');


const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.json({
            success: false,
            message: "A token is required for authentication"
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;

    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;