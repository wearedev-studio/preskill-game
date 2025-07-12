import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChessPage from './pages/ChessPage';
import CheckersPage from './pages/CheckersPage';
import BackgammonPage from './pages/BackgammonPage';
import TicTacToePage from './pages/TicTacToePage';
import AboutPage from './pages/AboutPage';

import ContactPage from './pages/ContactPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/checkers" element={<CheckersPage />} />
          <Route path="/backgammon" element={<BackgammonPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;