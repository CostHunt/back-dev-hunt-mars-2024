const express = require('express');
const postController = require('../controllers/post.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Define routes for CRUD operations on posts
router.use(authController.verifyToken);
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/:user_id/like/:post_id/', postController.likePost)
router.get('/groupe/:id_groupe/', postController.getGroupPost);
router.put('/isresolved/:id/', postController.SetResolved);
router.get('/limit/:limit/', postController.getLimitedPosts);

module.exports = router;
