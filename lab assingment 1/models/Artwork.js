const mongoose = require('mongoose');

// Schema for artwork items in the collection
const ArtworkSchema = new mongoose.Schema({
    title: String,
    value: Number,
    medium: String
});

module.exports = mongoose.model('Artwork', ArtworkSchema);