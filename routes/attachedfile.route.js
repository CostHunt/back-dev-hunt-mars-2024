const express = require('express');
const attachedfileController = require('../controllers/attachedfile.controller');

const router = express.Router();

router.post('/', attachedfileController.createAttachedfile);
router.get('/', attachedfileController.getAttachedfiles);
router.get('/:id', attachedfileController.getAttachedfileById);
router.put('/:id', attachedfileController.updateAttachedfile);
router.delete('/:id', attachedfileController.deleteAttachedfile);

module.exports = router;
