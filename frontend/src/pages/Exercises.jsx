// src/pages/Exercises.jsx
import React, { useState, useEffect } from 'react';
import './Exercises.css';

const Exercises = () => {
  const [activeExercise, setActiveExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const exercises = [
    {
      id: 1,
      title: "4-7-8 Breathing",
      description: "Calm your nervous system and reduce anxiety",
      duration: 120,
      steps: [
        "Breathe in through your nose for 4 seconds",
        "Hold your breath for 7 seconds",
        "Exhale slowly through your mouth for 8 seconds",
        "Repeat the cycle"
      ]
    },
    {
      id: 2,
      title: "Box Breathing",
      description: "Improve focus and reduce stress",
      duration: 180,
      steps: [
        "Breathe in for 4 seconds",
        "Hold your breath for 4 seconds",
        "Exhale for 4 seconds",
        "Hold for 4 seconds",
        "Repeat the cycle"
      ]
    },
    {
      id: 3,
      title: "Deep Belly Breathing",
      description: "Promote relaxation and oxygen flow",
      duration: 300,
      steps: [
        "Place one hand on your chest, one on your belly",
        "Breathe deeply through your nose for 5 seconds",
        "Feel your belly expand",
        "Exhale slowly for 5 seconds",
        "Repeat the cycle"
      ]
    }
  ];

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setTimeLeft(exercise.duration);
    setIsRunning(true);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exercises-container">
      <div className="exercises-header">
        <h1>🧘‍♂️ Breathing Exercises</h1>
        <p>Calm your mind and reduce stress with guided breathing techniques</p>
      </div>

      {activeExercise ? (
        <div className="active-exercise">
          <div className="exercise-timer">
            <h2>{activeExercise.title}</h2>
            <div className="timer-circle">
              <div className="timer-text">
                <div className="time">{formatTime(timeLeft)}</div>
                <div className="timer-label">remaining</div>
              </div>
            </div>
            <div className="timer-controls">
              {isRunning ? (
                <button onClick={() => setIsRunning(false)} className="control-btn pause">
                  ⏸️ Pause
                </button>
              ) : (
                <button onClick={() => setIsRunning(true)} className="control-btn play">
                  ▶️ Resume
                </button>
              )}
              <button onClick={stopExercise} className="control-btn stop">
                ⏹️ Stop
              </button>
            </div>
          </div>

          <div className="exercise-steps">
            <h3>Instructions</h3>
            <div className="steps-list">
              {activeExercise.steps.map((step, index) => (
                <div key={index} className="step-item">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="exercises-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-content">
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <div className="exercise-meta">
                  <span>⏱️ {Math.floor(exercise.duration / 60)} minutes</span>
                  <span>🔄 {exercise.steps.length} steps</span>
                </div>
              </div>
              <button 
                onClick={() => startExercise(exercise)}
                className="start-exercise-btn"
              >
                Start Exercise
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;