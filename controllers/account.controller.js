const { PrismaClient } = require('@prisma/client');
const e = require('express');

const prisma = new PrismaClient();

async function getAllAccounts(req, res) {
    try {
        const accounts = await prisma.account.findMany();
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