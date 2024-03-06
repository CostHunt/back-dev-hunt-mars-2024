const express = require('express');
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Define routes for CRUD operations on posts
// router.use(authController.verifyToken);
router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);
router.get('/:id_post', commentController.getCommentByPost);

module.exports = router;
