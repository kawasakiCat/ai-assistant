import React from 'react';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ChatPage from './pages/ChatPage';
import MemoPage from './pages/MemoPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PassewordForgotPage from './pages/PasswordForgotPage';
import TitlePage from './pages/TitlePage';
import HelpPage from './pages/HelpPage';
import './styles/global.css';

const App = () => {
  useTheme();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/memo" element={<MemoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pwforgot" element={<PassewordForgotPage />} />
          <Route path="/title" element={<TitlePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
