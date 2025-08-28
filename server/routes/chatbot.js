// File: server/routes/chatbot.js
const express = require('express');
const {
  startChatSession,
  sendMessage,
  getChatHistory,
  clearChatSession
} = require('../controllers/chatbotController');

const router = express.Router();

router.post('/session', startChatSession);
router.post('/message', sendMessage);
router.get('/history/:sessionId', getChatHistory);
router.delete('/session/:sessionId', clearChatSession);

module.exports = router;