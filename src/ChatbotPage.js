import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#724ae8',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h2>SOL AI Assistant</h2>
        <button 
          onClick={() => navigate('/Home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem'
          }}
        >
          x
        </button>
      </header>
      
      <div style={{
        flex: 1,
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        color: 'black'
      }}>
        <p>Chatbot UI will go here</p>
      </div>
    </div>
  );
};

export default ChatbotPage;