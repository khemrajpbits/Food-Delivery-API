const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController'); 
const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.post('/api/deliveries', authenticateJWT, authorizeRoles('delivery_personnel', 'administrator', 'restaurant_owner'), deliveryController.createDelivery);
router.post('/api/deliveries/assign', authorizeRoles('delivery_personnel', 'administrator', 'restaurant_owner'), authenticateJWT, deliveryController.createDelivery);
router.get('/api/deliveries', authenticateJWT, deliveryController.getAllDeliveries);
router.get('/api/deliveries/:delivery_id', authenticateJWT, deliveryController.getDelivery);
router.get('/api/deliveries/status/:delivery_id', authenticateJWT, deliveryController.getDelivery);
router.put('/api/deliveries/:delivery_id', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator', 'customer', 'delivery_personnel'), deliveryController.updateDelivery);
router.delete('/api/deliveries/:delivery_id', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator', 'customer'), deliveryController.deleteDelivery);

module.exports = router;