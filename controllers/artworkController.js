const Artwork = require('../lab assingment 1/models/Artwork');

// GET all artworks
exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET single artwork by ID
exports.getArtworkById = async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE new artwork
exports.createArtwork = async (req, res) => {
    try {
        const { title, value, medium } = req.body;

        // Validation
        if (!title || !value || !medium) {
            return res.status(400).json({ 
                error: 'Please provide title, value, and medium' 
            });
        }

        const newArtwork = new Artwork({
            title,
            value,
            medium
        });

        await newArtwork.save();
        res.status(201).json({
            message: 'Artwork created successfully',
            artwork: newArtwork
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE artwork
exports.updateArtwork = async (req, res) => {
    try {
        const { title, value, medium } = req.body;

        const artwork = await Artwork.findByIdAndUpdate(
            req.params.id,
            { title, value, medium },
            { new: true, runValidators: true }
        );

        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        res.json({
            message: 'Artwork updated successfully',
            artwork: artwork
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE artwork
exports.deleteArtwork = async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndDelete(req.params.id);

        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        res.json({
            message: 'Artwork deleted successfully',
            artwork: artwork
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
