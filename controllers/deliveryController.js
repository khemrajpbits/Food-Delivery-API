const Delivery = require('../models/Delivery');

const deliveryController = {
    createDelivery: async (req, res) => {
        try {
            const newDelivery = new Delivery(req.body);
            await newDelivery.save();
            res.status(201).json(newDelivery);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllDeliveries: async (req, res) => {
        try {
            const deliveries = await Delivery.find().populate({
                path: 'order_id',
                populate: {
                    path: 'menu_id', 
                    model: 'Menu'
                }
            }).populate('user_id','name');
            res.status(200).json(deliveries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDelivery: async (req, res) => {
        try {
            const delivery = await Delivery.findById(req.params.delivery_id).populate({
                path: 'order_id',
                populate: {
                    path: 'menu_id', 
                    model: 'Menu'
                }
            }).populate('user_id','name');
            if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
            res.status(200).json(delivery);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateDelivery: async (req, res) => {
        try {
            const delivery = await Delivery.findByIdAndUpdate(req.params.delivery_id, req.body, { new: true });
            if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
            res.status(200).json(delivery);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteDelivery: async (req, res) => {
        try {
            const delivery = await Delivery.findByIdAndDelete(req.params.delivery_id);
            if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
            res.status(200).json({ message: 'Delivery deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = deliveryController;
