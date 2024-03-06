// routes/authRoutes.js
const express = require('express');
const quartierController = require('../controllers/quartier.controller');

const router = express.Router();
router.post('/', quartierController.createQuartier);
router.get('/', quartierController.getAllQuartiers);

module.exports = router;
