const { PrismaClient } = require('@prisma/client');
const e = require('express');
const admin = require('../firebase.init');

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

  async function uploadProfile(req, res) {
    const bucket = admin.storage().bucket();
    const {id_account } = req.params
    try {
      if (!req.files) {
        res.status(400).send('No files uploaded');
        return;
      }
      const promises = req.files.map(async (file) => {
        const imageBuffer = file.buffer;
        const imageName = file.originalname;
        const Ufile = bucket.file(imageName);
        await Ufile.save(imageBuffer);
  
        const fileURL = await Ufile.getSignedUrl({ action: 'read', expires: '03-09-2025' });
        await prisma.account.update({
          where: { id: id_account },
          data: { image_profile: fileURL[0] }
        });
      });
  
      await Promise.all(promises);
  
      res.send({
        status: "200",
        message: "Files uploaded and database updated successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Error uploading image.');
    }
  }

  module.exports = {getOneAccount, getAllAccounts, uploadProfile};