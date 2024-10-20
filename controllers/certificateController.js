const Certificate = require('../models/Certificate');
const { v4: uuidv4 } = require('uuid');
const pdfkit = require('pdfkit');
const path = require('path');

// Create a new certificate
exports.createCertificate = async (req, res) => {
    try {
        const { name, course } = req.body;
        const certificateId = uuidv4();
        const date = new Date();

        // Save certificate details to DB
        const certificate = new Certificate({
            name,
            course,
            certificateId,
            date
        });

        await certificate.save();
        res.status(200).json({ message: 'Certificate generated successfully', certificateId });
    } catch (error) {
        res.status(500).json({ message: 'Error generating certificate', error });
    }
};
