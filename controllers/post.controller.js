const { PrismaClient } = require('@prisma/client');

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
    const { description, id_groupe, id_account } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        description,
        id_groupe,
        id_account,
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

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
  };
