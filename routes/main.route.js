const express = require('express');
const fileRoute = require('./file.route');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.use(authController.verifyToken);
router.use('/file',fileRoute)

module.exports = router;