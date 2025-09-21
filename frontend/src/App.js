// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Exercises from './pages/Exercises';
import Assessment from './pages/Assessment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/assessment" element={<Assessment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;