const express = require('express');
const fileUploadController = require("../controllers/file.upload.controller");

const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/', upload.array('file'), fileUploadController.upload); 
router.get('/url/', fileUploadController.get_url); 
router.get('/download/', fileUploadController.download);

module.exports = router;