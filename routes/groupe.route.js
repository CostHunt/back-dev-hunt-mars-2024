// groupe.route.js
const express = require('express');
const groupeController = require('../controllers/groupe.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.use(authController.verifyToken);

router.post('/', groupeController.createGroupe);
router.get('/', groupeController.getGroupes);
router.get('/:id', groupeController.getGroupeById);
router.put('/:id', groupeController.updateGroupe);
router.delete('/:id', groupeController.deleteGroupe);

module.exports = router;
