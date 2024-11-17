const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); 

const { authorizeRoles,authenticateJWT  } = require('../middleware/auth');

router.get('/api/dashboard', authenticateJWT, authorizeRoles('administrator'), dashboardController.getDashboard);

module.exports = router;
