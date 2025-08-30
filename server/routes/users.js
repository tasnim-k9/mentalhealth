const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const journalCount = await Journal.countDocuments({ user: req.user.id });
    
    // Calculate days active (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Get distinct days with journal entries
    const journalEntries = await Journal.find({
      user: req.user.id,
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const uniqueDays = new Set();
    journalEntries.forEach(entry => {
      const dateStr = entry.createdAt.toISOString().split('T')[0];
      uniqueDays.add(dateStr);
    });
    
    // Simple streak calculation (entries in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentEntries = await Journal.countDocuments({
      user: req.user.id,
      createdAt: { $gte: sevenDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        entries: journalCount,
        daysActive: uniqueDays.size,
        streak: recentEntries > 0 ? Math.min(7, recentEntries) : 0
      }
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, bio, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, bio, phone },
      { new: true }
    ).select('-password');
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Users endpoint is working!' });
});

module.exports = router;