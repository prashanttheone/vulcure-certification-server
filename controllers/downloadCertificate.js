const pdfkit = require('pdfkit');
const Certificate = require('../models/Certificate'); // Ensure you have the Certificate model imported

exports.downloadCertificate = (req, res) => {
    const { id } = req.params;

    Certificate.findOne({ certificateId: id })
        .then((certificate) => {
            if (!certificate) {
                return res.status(404).json({ message: 'Certificate not found' });
            }

            const doc = new pdfkit({ margin: 50 });

            // Set the filename
            const filename = `${id}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

            // Optional: Draw a background rectangle
            // doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f7f7f7'); // Light gray background

            // Title
            doc.fontSize(30).font('Helvetica-Bold').text('Certificate of Completion', {
                align: 'center',
                underline: true,
                margin: 20,
            });

            doc.moveDown();

            // Quote
            doc.fontSize(16).font('Helvetica-Oblique')
                .text('"This is to certify that', {
                    align: 'center',
                    italics: true,
                    margin: 10,
                });

            doc.moveDown(1); // Add some space

            // Content
            doc.fontSize(20).font('Helvetica').text('This certifies that', {
                align: 'center',
                margin: 10,
            });

            doc.moveDown();

            // Name
            doc.fontSize(24).font('Helvetica-Bold').text(certificate.name, {
                align: 'center',
                margin: 20,
            });

            // Course
            doc.fontSize(20).text(`has completed the course`, {
                align: 'center',
                margin: 10,
            });

            doc.fontSize(24).text(certificate.course, {
                align: 'center',
                margin: 20,
            });

            doc.moveDown(2);

            // Additional info
            doc.fontSize(16).text(`Certificate ID: ${certificate.certificateId}`, {
                align: 'center',
                margin: 5,
            });
            doc.text(`Date: ${new Date(certificate.date).toLocaleDateString()}`, {
                align: 'center',
                margin: 5,
            });

            doc.moveDown(2);

            // Signature space
            doc.fontSize(16).text('______________________________', {
                align: 'center',
                margin: 20,
            });
            doc.text('Signature', {
                align: 'center',
                margin: 5,
            });

            // Optional: Add a footer
            doc.moveDown(3);
            doc.fontSize(12).text('This certificate is issued by [Your Organization Name]', {
                align: 'center',
                margin: 10,
                color: '#999999', // Light gray color for footer text
            });

            // Finalize the PDF and send it to the response
            doc.pipe(res);
            doc.end();
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error fetching certificate', error });
        });
};
