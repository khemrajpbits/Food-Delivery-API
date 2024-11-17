const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); 
const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.post('/api/orders', authenticateJWT, orderController.createOrder);
router.get('/api/orders', authenticateJWT, orderController.getAllOrders);
router.get('/api/orders/:order_id', authenticateJWT, orderController.getOrder);
router.put('/api/orders/:order_id', authenticateJWT, orderController.updateOrder);
router.delete('/api/orders/:order_id', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator', 'customer'), orderController.deleteOrder);

module.exports = router;