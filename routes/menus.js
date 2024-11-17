const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController'); 
const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.post('/api/menus', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator', 'customer'), menuController.createMenuItem);
router.get('/api/menus', authenticateJWT, menuController.getAllMenuItems);
router.get('/api/menus/:menu_id', authenticateJWT, menuController.getMenuItem);
router.put('/api/menus/:menu_id', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator'), menuController.updateMenuItem);
router.delete('/api/menus/:menu_id', authenticateJWT, authorizeRoles('restaurant_owner', 'administrator'), menuController.deleteMenuItem);

module.exports = router;