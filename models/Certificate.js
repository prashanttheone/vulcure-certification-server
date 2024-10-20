const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: String,
    course: String,
    certificateId: String,
    date: Date,
    pdfPath: String
});

module.exports = mongoose.model('Certificate', certificateSchema);
