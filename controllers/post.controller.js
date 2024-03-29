const { PrismaClient } = require('@prisma/client');
const e = require('express');

const secretKey = '$cost-hunt03-24';
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Create a new post
async function createPost(req, res) {
  try {
    const { description, id_groupe, id_account,code } = req.body;
    const post = await prisma.post.create({
      data: {
        description,
        id_groupe,
        id_account,
        code,
      },

      include: {
        account: {
          select : {
              username : true,
              image_profile : true,
          }
        },

        attachedfiles : {
          select : {
            url : true
          }
        },
        
      },

    });
    const commentsCount = 0;
    const likesCount = 0;

    res.json({...post, commentsCount, likesCount});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get all posts
async function getPosts(req, res) {
  
  try {
    const posts = await prisma.post.findMany({
      include: {
        account: {
          select: {
            username: true,
            image_profile: true
          }
        },
        attachedfiles: {
          select: {
            url: true
          }
        },
        likedBy: true,
        comments: true
      },
      orderBy: {
        date_publication: "desc"
      },
    });
    
    

    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        // Count comments
        const commentsCount = await prisma.comment.count({
          where: {
            id_post: post.id,
          },
        });

        // Count likedBy
        const likesCount = post.likedBy ? post.likedBy.length : 0;

        return {
          ...post,
          commentsCount,
          likesCount,
        };
      })
    );

    if (!posts) {
      res.status(404).send('Post not found');
      return;
    }
    res.json(postsWithCounts);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getLimitedPosts(req, res) {
  const token = req.header('X-access-token');
  const decoded = jwt.verify(token, secretKey);

  try {
    const { limit } = req.params;
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedLimit)) {
      res.status(400).send('Invalid limit parameter');
      return;
    }

    const posts = await prisma.post.findMany({
      take: parsedLimit,
      include: {
        account: {
          select: {
            username: true,
            image_profile: true,
          },
        },
        attachedfiles: {
          select: {
            url: true,
          },
        },
        likedBy: true,
      },
      orderBy: {
        date_publication: 'desc',
      },
    });

    if (!posts) {
      res.status(404).send('Post not found');
      return;
    }

    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await prisma.comment.count({
          where: {
            id_post: post.id,
          },
        });

        const likesCount = post.likedBy ? post.likedBy.length : 0;

        // Vérifie si decoded.accountId est présent dans likedBy
        const isLiked = post.likedBy.some((likedAccount) => likedAccount.id === decoded.accountId);

        return {
          ...post,
          commentsCount,
          likesCount,
          isLiked,
        };
      })
    );

    res.json(postsWithCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// Get a post by its ID
async function getPostById(req, res) {
  try {
    const { id } = req.params;
    console.log('Received ID:', id);

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        account: {
          select : {
              username : true,
              image_profile : true,
          }
        },

        attachedfiles : {
          select : {
            url : true
          }
        },
        
      },

    });

    const commentsCount = await prisma.comment.count({
      where: {
        id_post: id,
      },
    });

    const likesCount = post.likedBy ? post.likedBy.length : 0;
    if (!post) {
      res.status(404).send('Post not found');
      return;
    }

    res.json({...post, commentsCount, likesCount});
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

      include: {
        account: {
          select : {
              username : true,
              image_profile : true,
          }
        },

        attachedfiles : {
          select : {
            url : true
          }
        },
        
      },


    });
    const commentsCount = await prisma.comment.count({
      where: {
        id_post: id,
      },
    });

    const likesCount = updatedPost.likedBy ?updatedPost.likedBy.length : 0;

    if (!updatedPost) {
      res.status(404).send('Post not found');
      return;
    }
    res.json({...updatedPost, commentsCount, likesCount});
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
      const unlikedPost = await prisma.post.update({
        where: { id: post_id },
        data: { likedBy: { disconnect: { id: user_id } } },
        include: { likedBy: true },
      });

      res.json({ message: 'Post unliked successfully', numberOfLikes: unlikedPost.likedBy.length });
      return;
    }

    // Ajoutez le like du post
    const likedPost = await prisma.post.update({
      where: { id: post_id },
      data: { likedBy: { connect: { id: user_id } } },
      include: { likedBy: true },
    });

    // Retournez le nombre de likes après l'ajout du like
    res.json({ message: 'Post liked successfully', numberOfLikes: likedPost.likedBy.length });
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
      include: {
        account: {
          select : {
              username : true,
              image_profile : true,
          }
        },

        attachedfiles : {
          select : {
            url : true
          }
        },
        
      },
    });

    const postsWithCounts = await Promise.all(
      post.map(async (post) => {
        // Count comments
        const commentsCount = await prisma.comment.count({
          where: {
            id_post: post.id,
          },
        });

        // Count likedBy
        const likesCount = post.likedBy ? post.likedBy.length : 0;

        return {
          ...post,
          commentsCount,
          likesCount,
        };
      })
    );

    if (!post) {
      res.status(404).send('No Group Posts');
      return;
    }
    res.json(postsWithCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function SetResolved(req, res) {
  try {
    const { id } = req.params;
  
    // Retrieve the post by ID
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
  
    // Check if the post exists
    if (!post) {
      throw new Error('Post not found');
    }
  
    // Toggle the value of is_resolved
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        is_resolved: !post.is_resolved,
      },
    });
  
    // Return the updated post
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating post');
  }
}



module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    getGroupPost,
    SetResolved,
    getLimitedPosts
  };
