// File: server/controllers/chatbotController.js
const ChatLog = require('../models/ChatLog');
const { v4: uuidv4 } = require('uuid');

// Mock AI response function (to be replaced with actual AI API)
const generateAIResponse = (userMessage, chatHistory) => {
  const responses = [
    "I understand how you're feeling. It's completely normal to have ups and downs.",
    "Thank you for sharing that with me. Would you like to talk more about what's been on your mind?",
    "I hear you. Remember that it's okay to not be okay sometimes. What's one small thing that brought you joy recently?",
    "That sounds challenging. Have you tried any coping strategies that have helped in similar situations?",
    "I appreciate you opening up. How have you been taking care of yourself lately?",
    "It takes courage to talk about these feelings. Would it help to explore some relaxation techniques together?",
    "I'm here to listen. Sometimes just putting feelings into words can be helpful in itself.",
    "Thank you for trusting me with this. What do you think would help you feel even a little bit better right now?",
    "I understand this is difficult. Remember to be kind to yourself during tough times.",
    "Let's focus on your breathing for a moment. Take a deep breath in... and out. How does that feel?"
  ];
  
  // Simple logic to make responses slightly contextual
  const message = userMessage.toLowerCase();
  if (message.includes('anxious') || message.includes('worry') || message.includes('nervous')) {
    return "It sounds like you're experiencing some anxiety. Have you tried any breathing exercises to help calm your nervous system?";
  }
  
  if (message.includes('sad') || message.includes('depress') || message.includes('hopeless')) {
    return "I hear that you're feeling down. Remember that feelings are temporary, even when they don't feel that way. What's one small thing you could do for yourself today?";
  }
  
  if (message.includes('angry') || message.includes('frustrat') || message.includes('mad')) {
    return "Anger can be a difficult emotion to sit with. Sometimes identifying what's underneath the anger can be helpful. What do you think might be contributing to these feelings?";
  }
  
  // Random response if no keywords match
  return responses[Math.floor(Math.random() * responses.length)];
};

// @desc    Start a new chat session
// @route   POST /api/chatbot/session
// @access  Public
const startChatSession = async (req, res) => {
  try {
    const { userId } = req.body;
    const sessionId = uuidv4();
    
    const chatLog = await ChatLog.create({
      userId: userId || null,
      sessionId,
      messages: [{
        sender: 'bot',
        text: "Hello! I'm here to provide mental health support. How are you feeling today?",
        timestamp: new Date()
      }]
    });
    
    res.json({
      success: true,
      sessionId: chatLog.sessionId,
      messages: chatLog.messages
    });
  } catch (error) {
    console.error('Start chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error starting chat session'
    });
  }
};

// @desc    Send message to chatbot
// @route   POST /api/chatbot/message
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { sessionId, message, userId } = req.body;
    
    let chatLog = await ChatLog.findOne({ sessionId });
    
    if (!chatLog) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    // Add user message
    chatLog.messages.push({
      sender: 'user',
      text: message,
      timestamp: new Date()
    });
    
    // Generate AI response
    const aiResponse = generateAIResponse(message, chatLog.messages);
    
    // Add bot response
    chatLog.messages.push({
      sender: 'bot',
      text: aiResponse,
      timestamp: new Date()
    });
    
    await chatLog.save();
    
    res.json({
      success: true,
      messages: chatLog.messages
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending message'
    });
  }
};

// @desc    Get chat history
// @route   GET /api/chatbot/history/:sessionId
// @access  Public
const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const chatLog = await ChatLog.findOne({ sessionId });
    
    if (!chatLog) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }
    
    res.json({
      success: true,
      messages: chatLog.messages
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving chat history'
    });
  }
};

// @desc    Clear chat session
// @route   DELETE /api/chatbot/session/:sessionId
// @access  Public
const clearChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    await ChatLog.findOneAndDelete({ sessionId });
    
    res.json({
      success: true,
      message: 'Chat session cleared successfully'
    });
  } catch (error) {
    console.error('Clear chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error clearing chat session'
    });
  }
};

module.exports = {
  startChatSession,
  sendMessage,
  getChatHistory,
  clearChatSession
};