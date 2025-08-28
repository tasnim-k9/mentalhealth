// File: server/seeds/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Journal = require('../models/Journal');
const Blog = require('../models/Blog');
const ForumPost = require('../models/ForumPost');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    await Journal.deleteMany({});
    await Blog.deleteMany({});
    await ForumPost.deleteMany({});

    // Create users
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@mindfulspace.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true
    });

    // Removed therapist seeding

    const regularUser1 = await User.create({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      isVerified: true
    });

    const regularUser2 = await User.create({
      username: 'janedoe',
      email: 'jane@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'user',
      isVerified: true
    });

    // Create journal entries
    const journalEntries = [
      {
        userId: regularUser1._id,
        date: new Date('2023-11-10'),
        mood: 'happy',
        title: 'Great day today',
        content: 'Had a productive day at work and enjoyed a nice walk in the park. Felt grateful for the beautiful weather and my supportive friends.',
        tags: ['gratitude', 'productivity']
      },
      {
        userId: regularUser1._id,
        date: new Date('2023-11-09'),
        mood: 'neutral',
        title: 'Regular day',
        content: 'Nothing special happened today. Just a regular work day. Feeling a bit tired but overall okay.',
        tags: ['routine']
      },
      {
        userId: regularUser2._id,
        date: new Date('2023-11-08'),
        mood: 'sad',
        title: 'Feeling down',
        content: 'Struggled with motivation today. Missed my morning routine and felt off all day. Need to practice more self-care tomorrow.',
        tags: ['self-care', 'motivation']
      }
    ];

    await Journal.insertMany(journalEntries);

    // Create blog posts
    const blogPosts = [
      {
        title: 'Understanding Anxiety Disorders',
        content: 'Full content about anxiety disorders...',
        excerpt: 'Learn about different types of anxiety disorders and how to recognize symptoms.',
        category: 'mental health',
        authorId: adminUser._id,
        image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc5d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['anxiety', 'mental health', 'education'],
        isPublished: true,
        views: 150,
        likes: [regularUser1._id, regularUser2._id]
      },
      {
        title: '5 Mindfulness Techniques for Daily Stress',
        content: 'Full content about mindfulness techniques...',
        excerpt: 'Simple practices you can incorporate into your daily routine to reduce stress.',
        category: 'mindfulness',
        authorId: adminUser._id,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['mindfulness', 'stress relief', 'techniques'],
        isPublished: true,
        views: 89,
        likes: [regularUser1._id]
      }
    ];

    await Blog.insertMany(blogPosts);

    // Create forum posts
    const forumPosts = [
      {
        userId: regularUser1._id,
        title: 'Coping with anxiety in social situations',
        content: 'Does anyone have tips for managing anxiety in social settings? I struggle with work events and parties.',
        category: 'Anxiety',
        isAnonymous: false,
        views: 145,
        likes: [regularUser2._id],
        tags: ['social anxiety', 'coping strategies'],
        replies: [
          {
            userId: adminUser._id,
            content: 'Try practicing deep breathing exercises before social events. Also, remember that most people are focused on themselves, not judging you.',
            isAnonymous: false,
            likes: [regularUser1._id]
          }
        ]
      },
      {
        userId: regularUser2._id,
        title: 'Meditation techniques that actually work',
        content: 'I\'ve tried meditation but struggle to stay focused. What techniques have worked for you?',
        category: 'Mindfulness',
        isAnonymous: true,
        views: 98,
        likes: [regularUser1._id],
        tags: ['meditation', 'focus'],
        replies: [
          {
            userId: adminUser._id,
            content: 'Start with just 2-5 minutes daily. Use guided meditation apps and don\'t worry about "doing it right" - the practice is in returning your focus when it wanders.',
            isAnonymous: false,
            likes: [regularUser2._id]
          }
        ]
      }
    ];

    await ForumPost.insertMany(forumPosts);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();