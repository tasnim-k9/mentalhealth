// File: client/src/pages/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, TrashIcon } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to provide mental health support. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '' || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate API call to backend
    try {
      // In a real implementation, this would be an API call to your backend
      // const response = await fetch('/api/chatbot', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message: inputText,
      //     userId: currentUser?._id || null
      //   })
      // });
      // const data = await response.json();
      
      // Simulate response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response for demonstration
      const botResponses = [
        "I understand how you're feeling. It's completely normal to have ups and downs.",
        "Thank you for sharing that with me. Would you like to talk more about what's been on your mind?",
        "I hear you. Remember that it's okay to not be okay sometimes. What's one small thing that brought you joy recently?",
        "That sounds challenging. Have you tried any coping strategies that have helped in similar situations?",
        "I appreciate you opening up. How have you been taking care of yourself lately?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm here to provide mental health support. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          Mental Health Support Chat
        </h1>
        <p className="mt-3 text-xl text-gray-500 dark:text-gray-300 transition-colors duration-300">
          Talk with our AI assistant for immediate support and resources
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="p-4 bg-lavender-600 dark:bg-lavender-700 text-white flex justify-between items-center transition-colors duration-300">
          <div>
            <h2 className="text-lg font-semibold">AI Mental Health Assistant</h2>
            <p className="text-sm opacity-90">Available 24/7 to provide support</p>
          </div>
          <button
            onClick={clearConversation}
            className="p-2 rounded-full hover:bg-lavender-700 dark:hover:bg-lavender-600 transition-colors duration-200"
            title="Clear conversation"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-lavender-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-lavender-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-lavender-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={isLoading || inputText.trim() === ''}
              className="bg-lavender-600 hover:bg-lavender-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-200"
            >
              <PaperAirplaneIcon className="w-5 h-5 transform -rotate-45" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-colors duration-300">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 transition-colors duration-300">Important Notice</h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm transition-colors duration-300">
          This AI chatbot is not a substitute for professional medical advice, diagnosis, or treatment. 
          If you're in crisis or experiencing a mental health emergency, please contact emergency services 
          or use our <a href="/emergency" className="underline">emergency resources page</a>.
        </p>
      </div>
    </div>
  );
};

export default Chatbot;