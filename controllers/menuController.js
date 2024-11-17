const Menu = require('../models/Menu');

const menuController = {
    createMenuItem: async (req, res) => {
        try {
            const newMenuItem = new Menu(req.body);
            await newMenuItem.save();
            res.status(201).json(newMenuItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllMenuItems: async (req, res) => {
        try {
            const menuItems = await Menu.find().populate('restaurant_id', 'restaurant_name');
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMenuItem: async (req, res) => {
        try {
            const menuItem = await Menu.findById(req.params.menu_id);
            if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateMenuItem: async (req, res) => {
        try {
            const menuItem = await Menu.findByIdAndUpdate(req.params.menu_id, req.body, { new: true });
            if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteMenuItem: async (req, res) => {
        try {
            const menuItem = await Menu.findByIdAndDelete(req.params.menu_id);
            if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = menuController;
