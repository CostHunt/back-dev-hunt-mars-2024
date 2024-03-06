// controllers/quartierController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new quartier
const createQuartier = async (req, res) => {
  try {
    const { nom_quartier } = req.body;
    const quartier = await prisma.quartier.create({
      data: {
        nom_quartier,
      },
    });
    res.json(quartier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all quartiers
const getAllQuartiers = async (req, res) => {
  try {
    const quartiers = await prisma.quartier.findMany();
    res.json(quartiers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createQuartier, getAllQuartiers };
