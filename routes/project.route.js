// routes/authRoutes.js
const express = require('express');
const projectController = require('../controllers/project.controller');

const router = express.Router();

const authController = require('../controllers/auth.controller');
router.use(authController.verifyToken);
router.post('/', projectController.createProject);
router.get('/', projectController.getAllProjects);

module.exports = router;
