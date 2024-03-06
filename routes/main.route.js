const express = require('express');
const fileRoute = require('./file.route');
const quartierRoute = require('../routes/quartier.rourte');
const projectRoute = require('../routes/project.route');
const postRoute = require('../routes/post.route');
const compileRoute = require('../routes/compile.route');
const groupeRoute = require('../routes/groupe.route');
const commentRoute = require('../routes/comment.route');
const router = express.Router();
const authRoute = require('./auth.route');

router.use('/auth', authRoute);
router.use('/file',fileRoute);
router.use('/quartier',quartierRoute);
router.use('/project',projectRoute);
router.use('/post',postRoute);
router.use('/groupe',groupeRoute);
router.use('/comment',commentRoute)
router.use('/run',compileRoute,)
module.exports = router;