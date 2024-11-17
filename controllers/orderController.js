const Order = require('../models/Order');

const orderController = {
    createOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('menu_id', 'item_name');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.order_id).populate('menu_id', 'item_name');
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(req.params.order_id, req.body, { new: true });
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.order_id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = orderController;
