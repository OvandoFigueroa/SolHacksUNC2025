import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotPage.css';

function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hello\nI am SOL AI", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = "AIzaSyAgIBJVkE_QNURHAHwP7njp6yHdpPAaYrk";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setInputMessage('');
    
    // Add thinking message
    setMessages(prev => [...prev, { text: "Thinking...", isUser: false }]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: [
            { 
              role: "user", 
              parts: [{ 
                text: "You are an AI bot for a LinkedIn type Latino website. You are helping Latino/as with events; These are the events:  0 code hackathon Kenan Flagler UNC GO TARHEELS CODING MARATHON! - UNC. Best hackathons in the country - #NC State. Tech innovation is the future! - #MIT. Join us for a weekend coding competition - #Stanford. So mention these events also you should be able to speak in spanish and translate english and spanish. Use spanish words frequently. Be consize with your messages and only use up to 5 sentances at max."
              }] 
            },
            { 
              role: "user", 
              parts: [{ text: message }] 
            }
          ] 
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API request failed");
      
      const aiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { text: aiResponse, isUser: false } : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { text: error.message, isUser: false, isError: true } : msg
      ));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    navigate('/Home');
  };

  // Simple text-based icons
  const Icons = {
    close: '✕',
    send: 'Send',
    bot: '🤖'
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container open">
        <header className="chatbot-header">
          <h2>SOL AI Assistant</h2>
          <button 
            className="close-btn"
            onClick={handleClose}
          >
            {Icons.close}
          </button>
        </header>
        
        <div className="chatbox" ref={chatboxRef}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isUser ? 'outgoing' : 'incoming'} ${message.isError ? 'error' : ''}`}
            >
              {!message.isUser && (
                <span className="bot-icon">{Icons.bot}</span>
              )}
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a message..."
            spellCheck="false"
            rows="1"
          />
          <button 
            id="send-btn" 
            onClick={handleSendMessage}
          >
            {Icons.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;