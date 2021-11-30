const jwt = require('jsonwebtoken');
const config = require('./config');


const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(req.headers)
    if (!token) {
        return res.json({
            success: false,
            message: "A token is required for authentication"
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded

        return next();
    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }

};

module.exports = verifyToken;