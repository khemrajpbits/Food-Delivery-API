const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your secret

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = {
    generateToken,
    verifyToken,
};
