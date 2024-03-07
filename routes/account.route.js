const express = require('express');
const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Define routes for CRUD operations on posts
// router.use(authController.verifyToken);

router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getOneAccount);
router.post('/:id_account/',accountController.uploadProfile)


module.exports = router;
