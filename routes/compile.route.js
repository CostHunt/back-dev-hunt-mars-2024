// routes/authRoutes.js
const express = require('express');
const compileController = require('../controllers/compilater.controller');

const router = express.Router();

const authController = require('../controllers/auth.controller');
// router.use(authController.verifyToken);
router.post('/code/',compileController.runCode );

module.exports = router;
