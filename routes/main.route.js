const express = require('express');
const fileRoute = require('./file.route');
const authController = require('../controllers/auth.controller');
const quartierRoute = require('../routes/quartier.rourte');
const projectRoute = require('../routes/project.route');
const router = express.Router();

router.use(authController.verifyToken);
router.use('/file',fileRoute);
router.use('/quartier',quartierRoute);
router.use('/project',projectRoute);

module.exports = router;