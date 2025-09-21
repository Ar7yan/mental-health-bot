// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [mood, setMood] = useState('');
  const [moodLog, setMoodLog] = useState([]);
  const [dailyQuote, setDailyQuote] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample user data
  const userData = {
    name: "Alex",
    streak: 7,
    lastSession: "2 hours ago"
  };

  // Sample mood data for chart
  const moodData = [
    { day: 'Mon', mood: 4 },
    { day: 'Tue', mood: 3 },
    { day: 'Wed', mood: 5 },
    { day: 'Thu', mood: 2 },
    { day: 'Fri', mood: 4 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: 4 }
  ];

  // Inspirational quotes
  const quotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, so don't waste it living someone else's life.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "If you look at what you have in life, you'll always have more."
  ];

  useEffect(() => {
    // Set random daily quote
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Load mood log from localStorage
    const savedMoodLog = localStorage.getItem('moodLog');
    if (savedMoodLog) {
      setMoodLog(JSON.parse(savedMoodLog));
    }
  }, []);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      const newMoodEntry = {
        mood,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      };
      const updatedLog = [newMoodEntry, ...moodLog.slice(0, 4)];
      setMoodLog(updatedLog);
      localStorage.setItem('moodLog', JSON.stringify(updatedLog));
      setMood('');
    }
  };

  const getMoodEmoji = (moodValue) => {
    const emojis = ['😢', '😔', '😐', '🙂', '😊'];
    return emojis[Math.min(4, Math.max(0, moodValue - 1))];
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {userData.name}!</h1>
          <p>How are you feeling today?</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{userData.streak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">✓</span>
            <span className="stat-label">Today's Check-in</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Quick Mood Check */}
          <div className="dashboard-card">
            <h2>Quick Mood Check</h2>
            <form onSubmit={handleMoodSubmit} className="mood-form">
              <div className="mood-options">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="mood-option">
                    <input
                      type="radio"
                      name="mood"
                      value={value}
                      checked={mood === value.toString()}
                      onChange={(e) => setMood(e.target.value)}
                    />
                    <span className="mood-emoji">
                      {getMoodEmoji(value)}
                    </span>
                    <span className="mood-label">
                      {['Very Sad', 'Sad', 'Neutral', 'Good', 'Great'][value - 1]}
                    </span>
                  </label>
                ))}
              </div>
              <button type="submit" className="submit-mood-btn">
                Log Mood
              </button>
            </form>
          </div>

          {/* Recent Mood History */}
          <div className="dashboard-card">
            <h2>Recent Mood Log</h2>
            <div className="mood-history">
              {moodLog.length > 0 ? (
                moodLog.map((entry, index) => (
                  <div key={index} className="mood-entry">
                    <span className="mood-emoji-small">{getMoodEmoji(parseInt(entry.mood))}</span>
                    <div className="mood-details">
                      <span className="mood-value">
                        {['Very Sad', 'Sad', 'Neutral', 'Good', 'Great'][parseInt(entry.mood) - 1]}
                      </span>
                      <span className="mood-time">{entry.timestamp}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No mood entries yet. Check in with how you're feeling!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Weekly Mood Chart */}
          <div className="dashboard-card">
            <h2>Weekly Mood Trend</h2>
            <div className="mood-chart">
              {moodData.map((data, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar" style={{ height: `${data.mood * 20}px` }}>
                    <span className="bar-value">{data.mood}</span>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Quote */}
          <div className="dashboard-card quote-card">
            <h2>Today's Inspiration</h2>
            <div className="quote-content">
              <div className="quote-icon">💭</div>
              <p className="quote-text">"{dailyQuote}"</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/chat" className="action-btn primary">
                💬 Chat Support
              </Link>
              <Link to="/journal" className="action-btn">
                📝 Journal
              </Link>
              <Link to="/meditation" className="action-btn">
                🧘 Meditation
              </Link>
              <Link to="/resources" className="action-btn">
                📚 Resources
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section className="tools-section">
        <h2>Mental Wellness Tools</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">💬</div>
            <h3>AI Chat Support</h3>
            <p>Talk to our compassionate AI companion anytime</p>
            <Link to="/chat" className="tool-link">Start Chat →</Link>
          </div>
          <div className="tool-card">
            <div className="tool-icon">📝</div>
            <h3>Journal</h3>
            <p>Express your thoughts and track your emotional journey</p>
            <Link to="/journal" className="tool-link">Write Entry →</Link>
          </div>
          <div className="tool-card">
            <div className="tool-icon">🧘‍♂️</div>
            <h3>Meditation</h3>
            <p>Guided sessions for mindfulness and relaxation</p>
            <Link to="/meditation" className="tool-link">Begin Session →</Link>
          </div>
          <div className="tool-card">
            <div className="tool-icon">📊</div>
            <h3>Progress</h3>
            <p>Track your mental health journey and patterns</p>
            <Link to="/progress" className="tool-link">View Insights →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;