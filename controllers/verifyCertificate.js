const Certificate = require('../models/Certificate');

exports.verifyCertificate = async (req, res) => {
    const { id } = req.params; // Get the certificate ID from the request parameters

    try {
        // Find the certificate by its ID
        const certificate = await Certificate.findOne({ certificateId: id });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found.' });
        }

        // If found, return the certificate details
        return res.status(200).json({
            message: 'Certificate verified successfully.',
            certificate: {
                name: certificate.name,
                course: certificate.course,
                certificateId: certificate.certificateId,
                date: certificate.date,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying certificate.', error });
    }
};
