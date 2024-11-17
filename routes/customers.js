const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); 
const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.get('/api/customers', authenticateJWT, authorizeRoles('administrator'), customerController.getAllCustomers);
router.get('/api/customers/:customer_id', authenticateJWT, authorizeRoles('administrator', 'customer'), customerController.getCustomer);
router.put('/api/customers/:customer_id', authenticateJWT, authorizeRoles('administrator', 'customer'), customerController.updateCustomer);
router.delete('/api/customers/:customer_id', authenticateJWT, authorizeRoles('administrator', 'customer'), customerController.deleteCustomer);

module.exports = router;