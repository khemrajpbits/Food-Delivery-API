const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); 
const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.get('/api/restaurants', authenticateJWT, authorizeRoles('delivery_personnel', 'administrator', 'customer'), restaurantController.getAllRestaurants);
router.get('/api/restaurants/:restaurant_id', authenticateJWT, restaurantController.getRestaurant);
router.put('/api/restaurants/:restaurant_id',authenticateJWT, authorizeRoles('restaurant_owner', 'administrator'), restaurantController.updateRestaurant);
router.delete('/api/restaurants/:restaurant_id',authenticateJWT, authorizeRoles('restaurant_owner', 'administrator'), restaurantController.deleteRestaurant);

module.exports = router;