const express = require('express');
const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificateRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());



// Use CORS with specific options (optional)
app.use(cors({
    origin: 'https://vulncrure-certification.vercel.app', // Allow requests from your React app
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true // Allow credentials (optional)
}));
// Connect to the database
connectDB();

// Use certificate routes
app.use('/api/certificates', certificateRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
