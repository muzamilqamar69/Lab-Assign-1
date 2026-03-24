const express = require('express');
const mongoose = require('mongoose');
const artworkRoutes = require('./routes/artwork');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artcollection')
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./lab assingment 1/public'));

// API Routes
app.use('/api/artworks', artworkRoutes);

// Home route
app.get('/', (req, res) => {
    res.sendFile('./lab assingment 1/public/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`  - View artworks: http://localhost:${PORT}/view.html`);
    console.log(`  - Add artwork: http://localhost:${PORT}/add.html`);
});