// src/pages/Journal.jsx
import React, { useState } from 'react';
import './Journal.css';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [mood, setMood] = useState('neutral');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        content: currentEntry,
        mood,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toLocaleTimeString()
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setMood('neutral');
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h1>📝 Mental Health Journal</h1>
        <p>Express your thoughts and track your emotional journey</p>
      </div>

      <div className="journal-content">
        <div className="journal-editor">
          <form onSubmit={handleSubmit} className="journal-form">
            <div className="mood-selector">
              <label>How are you feeling?</label>
              <div className="mood-options">
                {['😢', '😔', '😐', '🙂', '😊'].map((emoji, index) => (
                  <label key={index} className="mood-option">
                    <input
                      type="radio"
                      name="mood"
                      value={['sad', 'unhappy', 'neutral', 'happy', 'very-happy'][index]}
                      checked={mood === ['sad', 'unhappy', 'neutral', 'happy', 'very-happy'][index]}
                      onChange={(e) => setMood(e.target.value)}
                    />
                    <span className="mood-emoji">{emoji}</span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write about your day, your feelings, or anything on your mind..."
              className="journal-textarea"
              rows="8"
            />

            <button type="submit" className="save-entry-btn">
              Save Entry
            </button>
          </form>
        </div>

        <div className="journal-entries">
          <h3>Your Journal Entries</h3>
          {entries.length === 0 ? (
            <p className="no-entries">No entries yet. Start writing to track your journey!</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="journal-entry-card">
                <div className="entry-header">
                  <span className="mood-display">{entry.mood === 'sad' ? '😢' : 
                     entry.mood === 'unhappy' ? '😔' : 
                     entry.mood === 'neutral' ? '😐' : 
                     entry.mood === 'happy' ? '🙂' : '😊'}</span>
                  <div className="entry-date">
                    <strong>{entry.date}</strong>
                    <span>{entry.timestamp}</span>
                  </div>
                </div>
                <p className="entry-content">{entry.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;