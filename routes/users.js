const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.post('/api/register', registerController.registerCustomer);
router.post('/api/delivery-register', registerController.registerDeliveryPersonnel);
router.post('/api/restaurant-register', registerController.registerRestaurantOwner);

router.post('/api/login', userController.login);
router.post('/api/logout', userController.logout);

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:user_id', userController.getUser);

module.exports = router;