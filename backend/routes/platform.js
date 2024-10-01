const express = require('express');
const authenticateToken = require('../Middleware/auth'); 
const Platform = require('../Models/Platform');
const router = express.Router();

const defaultPlatforms = [
    'Netflix', 'YouTube Premium', 'Spotify', 'Kaspersky',
    'Apple Music+', 'Amazon Prime', 'YouTube Music', 'HBO',
    'AWS', 'Vercel', 'Netlify', 'GCP', 'Gym'
];

// Apply authentication middleware
router.use(authenticateToken);

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id; 
        const userPlatforms = await Platform.find({ user: userId });
        const allPlatforms = [...defaultPlatforms, ...userPlatforms.map(p => p.name)];
        res.json(allPlatforms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving platforms' });
    }
});

// POST /platforms - Add a new platform for the authenticated user
router.post('/', async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; 

    // Check if the platform is a default platform
    if (defaultPlatforms.includes(name)) {
        return res.status(400).json({ message: 'Cannot create a default platform.' });
    }

    try {
        const existingPlatform = await Platform.findOne({ name, user: userId });
        if (existingPlatform) {
            return res.status(400).json({ message: 'Platform already exists for this user.' });
        }

        const newPlatform = new Platform({ name, user: userId });
        await newPlatform.save();

        res.status(201).json(newPlatform);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: 'Error adding platform', error: err.message });
    }
});

module.exports = router;
