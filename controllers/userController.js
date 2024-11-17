const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const mongoose = require('mongoose');
const Session = require('../models/Session');

const userController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const userId = req.params.user_id;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            res.status(400).json({
                 message: 'Invalid email or password',
            });
            return false;
        }

        var token = generateToken(user);
        req.session.token = token;

        const session = await Session.findOneAndUpdate(
            { user_id: user._id }, 
            { token: token }, 
            { 
                new: true, 
                upsert: true, 
            }
        );

        res.json({
            token:token,
            user_id: user._id,
            role_id: user.role_id,
            message: 'Login successful'
        });
    },

    logout: async (req, res) => {
        try {
            if (req.session.token) {
                req.session.token = null; 
            }

            res.json({
                message: 'You have successfully logged out.',
            });
        } catch (error) {
            console.error('Logout error:', error);
            req.flash('error', 'An error occurred during logout.');
            res.status(500).json({
                message: 'An error occurred during logout.',
            });
        }
    },
};

module.exports = userController;
