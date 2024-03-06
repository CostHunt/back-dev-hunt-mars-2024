const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAttachedfile(req, res) {
  try {
    const { nom_fichier, url, id_post } = req.body;
    const attachedfile = await prisma.attachedfile.create({
      data: {
        nom_fichier,
        url,
        post: {
          connect: {
            id: id_post,
          },
        },
      },
    });
    res.json(attachedfile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAttachedfiles(req, res) {
  try {
    const attachedfiles = await prisma.attachedfile.findMany();
    res.json(attachedfiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAttachedfileById(req, res) {
  try {
    const { id } = req.params;
    const attachedfile = await prisma.attachedfile.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.json(attachedfile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateAttachedfile(req, res) {
  try {
    const { id } = req.params;
    const { nom_fichier, url, id_post } = req.body;
    const updatedAttachedfile = await prisma.attachedfile.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom_fichier,
        url,
        post: {
          connect: {
            id: id_post,
          },
        },
      },
    });
    res.json(updatedAttachedfile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteAttachedfile(req, res) {
  try {
    const { id } = req.params;
    const deletedAttachedfile = await prisma.attachedfile.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedAttachedfile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { createAttachedfile, getAttachedfiles, getAttachedfileById, updateAttachedfile, deleteAttachedfile };
