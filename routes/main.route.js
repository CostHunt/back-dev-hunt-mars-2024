const express = require('express');
const fileRoute = require('./file.route');
const quartierRoute = require('../routes/quartier.rourte');
const projectRoute = require('../routes/project.route');
const postRoute = require('../routes/post.route');
const compileRoute = require('../routes/compile.route');
const groupeRoute = require('../routes/groupe.route')
const router = express.Router();
const authRoute = require('./auth.route');
router.use('/auth', authRoute);
router.use('/file',fileRoute);
router.use('/quartier',quartierRoute);
router.use('/project',projectRoute);
router.use('/post',postRoute);
router.use('/groupe/',groupeRoute);

router.use('/project',compileRoute,)
module.exports = router;