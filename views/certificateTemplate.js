const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateCertificate = (data) => {
    const doc = new PDFDocument();
    const filePath = `./certificates/${data.certificateId}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25).text('Certificate of Completion', { align: 'start' });
    doc.fontSize(20).text(`Awarded to ${data.name}`, { align: 'center', margin: 20 });
    doc.fontSize(16).text(`For completing the ${data.course}`, { align: 'center', margin: 10 });
    doc.fontSize(12).text(`Date: ${data.date.toDateString()}`, { align: 'center' });

    doc.end();
    return filePath;
};

module.exports = generateCertificate;
