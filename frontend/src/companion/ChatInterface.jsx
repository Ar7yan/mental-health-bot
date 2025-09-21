// src/companion/ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your AI mental health companion powered by Google Gemini. I'm here to listen and support you without judgment. How are you feeling today?", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history for Gemini
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage = {
        text: data.message,
        sender: 'ai',
        timestamp: new Date(),
        isFallback: data.isFallback
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const fallbackMessage = {
        text: "I'm having trouble connecting right now, but I'm here for you. This might be a good time to try some deep breathing or reach out to a trusted person. How are you feeling?",
        sender: 'ai',
        timestamp: new Date(),
        isFallback: true
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick coping strategies suggestions
  const quickSuggestions = [
    "I'm feeling anxious",
    "I need coping strategies",
    "How to reduce stress?",
    "I'm feeling overwhelmed"
  ];

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
              {msg.isFallback && (
                <div className="fallback-indicator">
                  ⚠️ Connection issue - using fallback response
                </div>
              )}
            </div>
            <div className="message-time">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai">
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 2 && (
        <div className="quick-suggestions">
          <p>Try saying:</p>
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(suggestion)}
              className="suggestion-btn"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Share how you're feeling or ask for support..."
          onKeyPress={handleKeyPress}
          className="chat-input"
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button"
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>

      <div className="chat-footer">
        <small>
          💡 Powered by Google Gemini AI | 
          🤝 I'm here to listen, but remember I'm not a replacement for professional help | 
          🆘 If you're in crisis, please call 102
        </small>
      </div>
    </div>
  );
};

export default ChatInterface;