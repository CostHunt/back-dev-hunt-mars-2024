const express = require('express');
const authRoute = require('./auth.route');
const fileRoute = require('./file.route');

const router = express.Router();
router.use('/auth', authRoute);
router.use('/file',fileRoute)

module.exports = router;