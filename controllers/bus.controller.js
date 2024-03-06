// controllers/busController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new bus
const createBus = async (req, res) => {
  try {
    const { ligne } = req.body;
    const bus = await prisma.bus.create({
      data: {
        ligne,
      },
    });
    res.json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await prisma.bus.findMany();
    res.json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBus, getAllBuses };
