import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import OrganizationsPage from './OrganizationsPage';
import LoginPage from './LoginPage';
import MessageboardPage from './MessageboardPage';
import PrivatechatPage from './PrivatechatPage';
import ChatbotPage from './ChatbotPage';
import CreateAccountWrapper from './CreateAccountWrapper';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Organizations" element={<OrganizationsPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/Messageboard" element={<MessageboardPage />} />
        <Route path="/Privatechat" element={<PrivatechatPage />} />
        <Route path="/Chatbot" element={<ChatbotPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;