const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createComment(req, res) {
  try {
    const { contenu, id_post } = req.body;
    const comment = await prisma.comment.create({
      data: {
        contenu,
        post: {
          connect: {
            id: id_post,
          },
        },
      },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getComments(req, res) {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getCommentById(req, res) {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { contenu, id_post } = req.body;
    const updatedComment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        contenu,
        post: {
          connect: {
            id: id_post,
          },
        },
      },
    });
    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { createComment, getComments, getCommentById, updateComment, deleteComment };
