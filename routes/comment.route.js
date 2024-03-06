// comment.route.js
const express = require('express');
const commentController = require('../controllers/comment.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();
router.use(authController.verifyToken);

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
