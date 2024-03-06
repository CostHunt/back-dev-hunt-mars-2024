// routes/authRoutes.js
const express = require('express');
const quartierController = require('../controllers/quartier.controller');

const router = express.Router();

const authController = require('../controllers/auth.controller');
router.use(authController.verifyToken);
router.post('/', quartierController.createQuartier);
router.get('/', quartierController.getAllQuartiers);

module.exports = router;
