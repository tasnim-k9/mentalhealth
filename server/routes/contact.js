// File: server/routes/contact.js
const express = require('express');
const { body } = require('express-validator');
const { createContactMessage } = require('../controllers/contactController');

const router = express.Router();

const createValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be less than 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Subject is required and must be less than 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Message is required and must be less than 5000 characters')
];

router.post('/', createValidation, createContactMessage);

module.exports = router;

