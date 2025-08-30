const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const auth = require('../middleware/auth'); // Make sure this path is correct

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Journals endpoint is working!' });
});

// Create journal entry - CORRECT WAY
router.post('/', auth, async (req, res) => { // ← auth middleware before async function
  try {
    console.log('Received journal data:', req.body);

    const { title, content, mood, tags } = req.body;

    const journal = new Journal({
      title,
      content,
      mood,
      tags: tags || [],
      user: req.user.id // This should work if auth middleware is set up correctly
    });

    await journal.save();
    
    res.json({
      success: true,
      message: 'Journal saved successfully!',
      data: journal
    });
    
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save journal'
    });
  }
});

// Get all journals for user
router.get('/', auth, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: journals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;