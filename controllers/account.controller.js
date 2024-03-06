const { PrismaClient } = require('@prisma/client');
const e = require('express');

const prisma = new PrismaClient();

async function getAllAccounts(req, res) {
    try {
        const accounts = await prisma.account.findMany({
          select: {
            id: true,
            username: true,
            email: true,
            nom: true,
            prenoms: true,
            matricule: true,
            image_profile: true,
            createdAt: true,
            updatedAt: true,
            id_quartier: true,
            quartier: true,
            writtenPosts: true,
            likedPost: true,
            projects: true,
            messages: true,
            comments: true,
          },
        });
        res.json(accounts);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  }

async function getOneAccount(req, res) {
    try {
        const { id } = req.params;
        const account = await prisma.account.findUnique({
          select: {
            id: true,
            username: true,
            email: true,
            nom: true,
            prenoms: true,
            matricule: true,
            image_profile: true,
            createdAt: true,
            updatedAt: true,
            id_quartier: true,
            quartier: true,
            writtenPosts: true,
            likedPost: true,
            projects: true,
            messages: true,
            comments: true,
          },
          where: {
            id,
          },
        });
        if (!account) {
          res.status(404).send('Account not found');
          return;
        }
        res.json(account);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  }

  module.exports = {getOneAccount, getAllAccounts};