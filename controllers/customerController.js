const Customer = require('../models/Customer');
const { generateToken } = require('../utils/jwt');

const customerController = {

    getAllCustomers: async (req, res) => {
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCustomer: async (req, res) => {
        try {
            const customerId = req.params.customer_id;

            if (req.user.role === 'customer' && req.user.role_id !== customerId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }

            const customer = await Customer.findById(customerId);
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCustomer: async (req, res) => {
        try {
            const customerId = req.params.customer_id;

            if (req.user.role === 'customer' && req.user.role_id !== customerId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }

            const customer = await Customer.findByIdAndUpdate(req.params.customer_id, req.body, { new: true });
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(customer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const customerId = req.params.customer_id;

            if (req.user.role === 'customer' && req.user.role_id !== customerId) {
                return res.status(403).json({ message: 'Unauthorized access to this account' });
            }

            const customer = await Customer.findByIdAndDelete(req.params.customer_id);
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = customerController;
