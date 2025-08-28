// File: server/controllers/contactController.js
const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;
    const created = await ContactMessage.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: { id: created._id }
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending message'
    });
  }
};

module.exports = { createContactMessage };

