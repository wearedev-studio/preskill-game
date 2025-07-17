import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // <-- ИМПОРТИРУЕМ ОХРАННИКА

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FindGamePage from './pages/FindGamePage/FindGamePage';
import GamePage from './pages/GamePage/GamePage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import OfflineGamePage from './pages/OfflineGamePage/OfflineGamePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

import OnlineGamePage from './pages/OnlineGamePage/OnlineGamePage';

import Navbar from './components/Navbar';
import { PageContainer } from './styles/StyledComponents';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/game/:gameId" element={<OnlineGamePage />} />
            <Route path="/find-game" element={<FindGamePage />} />
            <Route path="/game/offline" element={<OfflineGamePage />} />
          </Route>

          <Route path="/" element={
            <PageContainer>
              <p>Начните новую игру через меню навигации.</p>
            </PageContainer>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;