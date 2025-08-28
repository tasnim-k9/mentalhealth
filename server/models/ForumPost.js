// File: server/models/ForumPost.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const forumPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
    enum: ['General', 'Anxiety', 'Depression', 'Mindfulness', 'Relationships', 'Therapy', 'Self-Care', 'Support', 'Advice']
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  replies: [replySchema],
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  isLocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
forumPostSchema.index({ userId: 1, createdAt: -1 });
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ isAnonymous: 1 });

module.exports = mongoose.model('ForumPost', forumPostSchema);