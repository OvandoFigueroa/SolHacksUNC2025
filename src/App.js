import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import OrganizationsPage from './OrganizationsPage';
import LoginPage from './LoginPage';
import MessageboardPage from './MessageboardPage';
import PrivatechatPage from './PrivatechatPage';
import ChatbotPage from './ChatbotPage';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Organizations" element={<OrganizationsPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Messageboard" element={<MessageboardPage />} />
        <Route path="/Privatechat" element={<PrivatechatPage />} />
        <Route path="/Chatbot" element={<ChatbotPage />} />
      </Routes>
    </Router>
  );
}

export default App;