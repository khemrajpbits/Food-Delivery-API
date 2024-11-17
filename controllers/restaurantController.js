const Restaurant = require('../models/Restaurant');

const restaurantController = {
    index: async (req, res) => {
        const restaurants = await Restaurant.find();

        res.render('restaurants',{restaurants});
    },

    getAllRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.find();
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getRestaurant: async (req, res) => {
        try {
            const restaurantId = req.params.restaurant_id;

            if (req.user.role === 'restaurant_owner' && req.user.role_id !== restaurantId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }
            const restaurant = await Restaurant.findById(req.params.restaurant_id);
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateRestaurant: async (req, res) => {
        try {
            const restaurantId = req.params.restaurant_id;

            if (req.user.role === 'restaurant_owner' && req.user.role_id !== restaurantId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }
            const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurant_id, req.body, { new: true });
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteRestaurant: async (req, res) => {
        try {
            const restaurantId = req.params.restaurant_id;

            if (req.user.role === 'restaurant_owner' && req.user.role_id !== restaurantId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }
            const restaurant = await Restaurant.findByIdAndDelete(req.params.restaurant_id);
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = restaurantController;
