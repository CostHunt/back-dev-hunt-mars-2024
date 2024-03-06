const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

// Define routes for CRUD operations on posts
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
