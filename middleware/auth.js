const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');
const Session = require('../models/Session'); 
const User = require('../models/User'); 

let userId;

const authenticateJWT = async (req, res, next) => {    
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({
            error: 'Token Missing.',
        });
    }

    const session = await Session.findOne({ token });

    if (!session) {
        return res.status(403).json({
            error: 'Session not found or expired.',
        });
    }

    const user = await User.findById(session.user_id);

    if (!user) {
        return res.status(403).json({
            error: 'User not found.',
        });
    }

    userId = user._id;
    
    req.user = user; 
    next();
};

const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        const user = await User.findById(userId);
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                error: 'Access Denied.',
            });
        }
        next();
    };
};

module.exports = {
    authorizeRoles,
    authenticateJWT,
};