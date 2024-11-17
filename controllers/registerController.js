const Customer = require('../models/Customer');
const DeliveryPersonnel = require('../models/DeliveryPersonnel');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const registerController = {
    registerCustomer: async (req, res) => {
        try{
            const { first_name, last_name, email, password, phone, address, confirm_password } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);
            const confirmPasswordHash = await bcrypt.hash(confirm_password, 10);
    
            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
    
            const newCustomer = new Customer({
                first_name,
                last_name,
                email,
                phone,
                address,
                password_hash: passwordHash,
                confirm_password_hash: confirmPasswordHash,
            });

            await newCustomer.save();

            const newUser = new User({
                email,
                password_hash: passwordHash,
                role: 'customer',
                role_id: newCustomer._id,
            });
    
            await newUser.save();
            const token = generateToken(newCustomer);
            res.status(201).json({ token });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email) 
            {
                return res.status(409).json({ 
                    message: 'Email is already in use. Please use a different email.'
                });
            }
            res.status(500).json({ 
                message: 'An error occurred during registration. Please try again.'
            });
        }
    },

    registerDeliveryPersonnel: async (req, res) => {
        try{
            const { first_name, last_name, email, age, address, contact, govt_id, vehicle_number, availability_timings, password, confirm_password } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);
            const confirmPasswordHash = await bcrypt.hash(confirm_password, 10);

            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
    
            const newDelivery = new DeliveryPersonnel({
                first_name,
                last_name,
                email,
                age, 
                address, 
                contact, 
                govt_id, 
                vehicle_number, 
                availability_timings,
                password_hash: passwordHash,
                confirm_password_hash: confirmPasswordHash,
            });

            await newDelivery.save();
    
            const newUser = new User({
                email,
                password_hash: passwordHash,
                role: 'delivery_personnel',
                role_id: newDelivery._id,
            });

            await newUser.save();
            const token = generateToken(newDelivery);
            res.status(201).json({ token });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email) 
            {
                return res.status(409).json({ 
                    message: 'Email is already in use. Please use a different email.'
                });
            }
            res.status(500).json({ 
                message: 'An error occurred during registration. Please try again.'
            });
        }
    },

    registerRestaurantOwner: async (req, res) => {
        try{
            const { first_name, last_name, email, restaurant_name, restaurant_address, contact, govt_id, gstin, availability_timings, password, confirm_password } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);
            const confirmPasswordHash = await bcrypt.hash(confirm_password, 10);

            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
    
            const newRestaurant = new Restaurant({
                first_name,
                last_name,
                email,
                restaurant_name, 
                restaurant_address, 
                contact, 
                govt_id, 
                gstin,
                availability_timings,
                password_hash: passwordHash,
                confirm_password_hash: confirmPasswordHash,
            });

            await newRestaurant.save();

            const newUser = new User({
                email,
                password_hash: passwordHash,
                role: 'restaurant_owner',
                role_id: newRestaurant._id,
            });
    
            await newUser.save();
            const token = generateToken(newRestaurant);
            res.status(201).json({ token });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email) 
            {
                return res.status(409).json({ 
                    message: 'Email is already in use. Please use a different email.'
                });
            }
            res.status(500).json({ 
                message: 'An error occurred during registration. Please try again.'
            });
        }
    },
}

module.exports = registerController;