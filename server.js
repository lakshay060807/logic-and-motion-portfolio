const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. IMPORT YOUR NEW MODEL HERE
const Contact = require('./models/contact'); 

const app = express();

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB is successfully connected!'))
    .catch((err) => console.log('Database connection error:', err));

// --- ROUTES ---

// The test route
app.get('/', (req, res) => {
    res.send('Logic & Motion Backend is officially running!');
});

// 2. THE NEW RECEIVING ROUTE
app.post('/api/contact', async (req, res) => {
    try {
        // Grab the data sent from the frontend form
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        // Save it to MongoDB
        await newContact.save();
        
        // Send a success message back to the frontend
        res.status(201).json({ message: "Connection initiated. Message saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save message." });
    }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is locked in and listening on port ${PORT}`);
});