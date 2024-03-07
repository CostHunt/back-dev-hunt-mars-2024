const express = require('express');
const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Define routes for CRUD operations on posts
// router.use(authController.verifyToken);

router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getOneAccount);
router.post('/:id_account/', upload.array('file'),accountController.uploadProfile)


module.exports = router;
