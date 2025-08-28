// File: server/models/Journal.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'anxious', 'angry', 'tired', 'neutral', 'excited']
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  isPrivate: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for user and date for efficient querying
journalSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Journal', journalSchema);