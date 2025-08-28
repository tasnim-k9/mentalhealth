// File: server/controllers/journalController.js
const Journal = require('../models/Journal');

// @desc    Get all journal entries for user
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-date' } = req.query;
    
    const journals = await Journal.find({ userId: req.user._id })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Journal.countDocuments({ userId: req.user._id });
    
    res.json({
      success: true,
      count: journals.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      journals
    });
  } catch (error) {
    console.error('Get journals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving journals'
    });
  }
};

// @desc    Get single journal entry
// @route   GET /api/journals/:id
// @access  Private
const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }
    
    res.json({
      success: true,
      journal
    });
  } catch (error) {
    console.error('Get journal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving journal'
    });
  }
};

// @desc    Create journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  try {
    const { date, mood, title, content, tags, isPrivate } = req.body;
    
    const journal = await Journal.create({
      userId: req.user._id,
      date: date || new Date(),
      mood,
      title,
      content,
      tags,
      isPrivate: isPrivate !== undefined ? isPrivate : true
    });
    
    // Update user streak (pseudo-code)
    // await updateUserStreak(req.user._id);
    
    res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      journal
    });
  } catch (error) {
    console.error('Create journal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating journal entry'
    });
  }
};

// @desc    Update journal entry
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = async (req, res) => {
  try {
    const { date, mood, title, content, tags, isPrivate } = req.body;
    
    let journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }
    
    journal = await Journal.findByIdAndUpdate(
      req.params.id,
      {
        date,
        mood,
        title,
        content,
        tags,
        isPrivate
      },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Journal entry updated successfully',
      journal
    });
  } catch (error) {
    console.error('Update journal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating journal entry'
    });
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }
    
    await Journal.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete journal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting journal entry'
    });
  }
};

// @desc    Get journal stats
// @route   GET /api/journals/stats/overview
// @access  Private
const getJournalStats = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const stats = await Journal.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    const totalEntries = await Journal.countDocuments({
      userId: req.user._id,
      date: { $gte: startDate }
    });
    
    const moodDistribution = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});
    
    // Get streak information
    const entries = await Journal.find({
      userId: req.user._id
    }).sort({ date: -1 });
    
    let currentStreak = 0;
    let previousDate = null;
    
    for (const entry of entries) {
      const entryDate = new Date(entry.date).setHours(0, 0, 0, 0);
      
      if (!previousDate) {
        previousDate = entryDate;
        currentStreak = 1;
        continue;
      }
      
      const dayDiff = (previousDate - entryDate) / (1000 * 60 * 60 * 24);
      
      if (dayDiff === 1) {
        currentStreak++;
        previousDate = entryDate;
      } else if (dayDiff > 1) {
        break;
      }
    }
    
    res.json({
      success: true,
      stats: {
        totalEntries,
        moodDistribution,
        currentStreak,
        period: `${days} days`
      }
    });
  } catch (error) {
    console.error('Get journal stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving journal stats'
    });
  }
};

module.exports = {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
  getJournalStats
};