const User = require('../models/User');
const Customer = require('../models/Customer');
const Delivery = require('../models/Delivery');
const MenuItem = require('../models/Menu');
const Restaurant = require('../models/Restaurant');
const DeliveryPersonnel = require('../models/DeliveryPersonnel');
const Order = require('../models/Order');

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            const userCount = await User.countDocuments();
            const customerCount = await Customer.countDocuments();
            const restaurantCount = await Restaurant.countDocuments();
            const deliveryPersonnelCount = await DeliveryPersonnel.countDocuments();
            const orderCount = await Order.countDocuments();
            const deliveryCount = await Delivery.countDocuments();
            const menuCount = await MenuItem.countDocuments();
            
            res.status(200).json({
                userCount,
                restaurantCount,
                customerCount,
                deliveryPersonnelCount,
                orderCount,
                deliveryCount,
                menuCount,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = dashboardController;
