// controllers/projectController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new project
const createProject = async (req, res) => {
  try {
    const { nom_project, categorie, code, id_user } = req.body;
    const project = await prisma.project.create({
      data: {
        nom_project,
        categorie,
        code,
        id_user,
      },
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createProject, getAllProjects };
