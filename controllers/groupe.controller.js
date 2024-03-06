const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createGroupe(req, res) {
  try {
    const { image_groupe, nom_groupe } = req.body;
    const groupe = await prisma.groupe.create({
      data: {
        image_groupe,
        nom_groupe
      },
    });
    res.json(groupe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get all posts
async function getGroupes(req, res) {
  try {
    const groupes = await prisma.groupe.findMany();
    res.json(groupes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get a post by its ID
async function getGroupeById(req, res) {
  try {
    const { id } = req.params;
    const groupe = await prisma.groupe.findUnique({
      where: {
        id,
      },
    });
    if (!groupe) {
      res.status(404).send('Groupe not found');
      return;
    }
    res.json(groupe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Update a post by its ID
async function updateGroupe(req, res) {
  try {
    const { id } = req.params;
    const { image_groupe, nom_groupe } = req.body;
    const updatedGroupe = await prisma.groupe.update({
      where: {
        id,
      },
      data: {
        description,
        nom_groupe,
        image_groupe,
      },
    });
    res.json(updatedGroupe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Delete a post by its ID
async function deleteGroupe(req, res) {
  try {
    const { id } = req.params;
    const deletedGroupe = await prisma.groupe.delete({
      where: {
        id,
      },
    });
    res.json(deletedGroupe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
    createGroupe,
    getGroupeById,
    getGroupes,
    updateGroupe,
    deleteGroupe
  };
