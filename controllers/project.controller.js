// controllers/projectController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new project
const createProject = async (req, res) => {
  try {
    const { nom_project, categorie, code, id_account } = req.body;
    const project = await prisma.project.create({
      data: {
        nom_project,
        categorie,
        code,
        id_account,
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

async function getProjectsByUser(req, res) {
  const { id_account } = req.params;

  try {
    const projects = await prisma.project.findMany({
      where: {
        id_account: id_account,
      },
      include:{
        accounts:true
      }
    });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { nom_project, categorie, code } = req.body;
    
    // Vérifier si le projet existe avant de tenter la mise à jour
    const existingProject = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        nom_project,
        categorie,
        code
      },
    });

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = { createProject, getAllProjects, getProjectsByUser,updateProject };
