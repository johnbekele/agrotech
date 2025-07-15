// validateTokenHandler.js
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = validateToken;