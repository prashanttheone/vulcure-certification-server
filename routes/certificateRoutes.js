const express = require('express');
const { createCertificate} = require('../controllers/certificateController');
const {downloadCertificate} = require('../controllers/downloadCertificate');
const {verifyCertificate } = require('../controllers/verifyCertificate');

const router = express.Router();

router.post('/generate', createCertificate);
router.get('/download/:id', downloadCertificate);
router.get('/verify/:id', verifyCertificate); 

module.exports = router;
