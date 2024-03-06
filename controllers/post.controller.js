const { PrismaClient } = require('@prisma/client');
const e = require('express');

const prisma = new PrismaClient();

// Create a new post
async function createPost(req, res) {
  try {
    const { description, id_groupe, id_account } = req.body;
    const post = await prisma.post.create({
      data: {
        description,
        id_groupe,
        id_account,
      },
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get all posts
async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get a post by its ID
async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Update a post by its ID
async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { description, id_groupe, id_account, is_resolved } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        description,
        id_groupe,
        id_account,
        is_resolved,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Delete a post by its ID
async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function likePost(req, res) {
  const { user_id, post_id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: post_id } });
    const account = await prisma.account.findUnique({ where: { id: user_id } });

    if (!post || !account) {
      return res.status(404).json({ error: 'Post or account not found' });
    }

    // Vérifiez si le post n'est pas déjà liké par cet utilisateur
    const existingLike = await prisma.post.findUnique({
      where: { id: post_id },
      include: { likedBy: { where: { id: user_id } } },
    });

    if (existingLike?.likedBy.length > 0) {
      return res.status(400).json({ error: 'Post already liked by this account' });
    }

    // Ajoutez le like du post
    const likedPost = await prisma.post.update({
      where: { id: post_id },
      data: { likedBy: { connect: { id: user_id } } },
      include: { likedBy: true },
    });

    res.json({ message: 'Post liked successfully', likedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get group posts
async function getGroupPost(req, res) {
  try {
    const { id_groupe } = req.params;
    const post = await prisma.post.findMany({
      where: {
        id_groupe,
      },
    });
    if (!post) {
      res.status(404).send('No Group Posts');
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}




module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    getGroupPost
  };
