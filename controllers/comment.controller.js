// controllers/comment.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function  getAllComments (req, res){
    try {
      const comments = await prisma.comment.findMany({
        include : {
          account : {
            select : {
              username : true,
          }
          }
        }
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function getCommentByPost(req, res) {
    const { id_post } = req.params;
    try {
      const comments = await prisma.comment.findMany({
        where: { id_post: id_post },
        include: {
          account: {
            select : {
              username : true,
          }
          } // Inclure les détails de l'utilisateur associé au commentaire
        },
      });
  
      if (!comments || comments.length === 0) {
        res.status(200).json({ message: 'No comments' });
        return;
      }
  
      // La variable 'comments' contient maintenant les informations de l'utilisateur pour chaque commentaire
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

async function  createComment(req, res) {
    const { contenu, id_post, id_account } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
          contenu,
          id_post,
          id_account,
        },
        include: {
            account: {
              select : {
                username : true,
            }
            } // Inclure les détails de l'utilisateur associé au commentaire
          },
        });
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
module.exports = {createComment, getAllComments,getCommentByPost};
