// File: server/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 20000
  },
  excerpt: {
    type: String,
    maxlength: 300
  },
  category: {
    type: String,
    required: true,
    enum: ['mental health', 'mindfulness', 'wellness', 'therapy', 'self-care', 'relationships']
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
blogSchema.index({ authorId: 1, createdAt: -1 });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ isPublished: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);