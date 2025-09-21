// src/pages/Assessment.jsx
import React, { useState } from 'react';
import './Assessment.css';

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const mentalHealthQuestions = [
    {
      id: 1,
      question: "How often have you felt anxious or nervous in the past week?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day"
      ],
      category: "anxiety"
    },
    {
      id: 2,
      question: "How would you rate your sleep quality recently?",
      options: [
        "Excellent - I wake up refreshed",
        "Good - Mostly restful sleep",
        "Fair - Sometimes restless",
        "Poor - Often wake up tired"
      ],
      category: "sleep"
    },
    {
      id: 3,
      question: "How often have you felt little interest or pleasure in doing things?",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day"
      ],
      category: "depression"
    },
    {
      id: 4,
      question: "How would you describe your stress levels recently?",
      options: [
        "No stress - I feel calm and balanced",
        "Mild stress - Manageable pressure",
        "Moderate stress - Sometimes overwhelming",
        "High stress - Frequently overwhelming"
      ],
      category: "stress"
    },
    {
      id: 5,
      question: "How often do you practice self-care or relaxation techniques?",
      options: [
        "Daily - I make time for myself regularly",
        "Several times a week",
        "Rarely - Maybe once a week",
        "Never - I don't practice self-care"
      ],
      category: "self_care"
    },
    {
      id: 6,
      question: "How supported do you feel in your personal relationships?",
      options: [
        "Very supported - I have strong connections",
        "Moderately supported - Some good relationships",
        "Somewhat isolated - Few close connections",
        "Very isolated - I feel alone most of the time"
      ],
      category: "relationships"
    },
    {
      id: 7,
      question: "How often do you experience physical symptoms of stress (headaches, stomach issues, tension)?",
      options: [
        "Never or rarely",
        "Occasionally",
        "Frequently",
        "Almost constantly"
      ],
      category: "physical_health"
    },
    {
      id: 8,
      question: "How satisfied are you with your current work-life balance?",
      options: [
        "Very satisfied - Good balance",
        "Somewhat satisfied - Could be better",
        "Dissatisfied - Often overwhelmed",
        "Very dissatisfied - No balance"
      ],
      category: "work_life"
    },
    {
      id: 9,
      question: "How often do you feel optimistic about your future?",
      options: [
        "Most of the time",
        "Often",
        "Sometimes",
        "Rarely or never"
      ],
      category: "outlook"
    },
    {
      id: 10,
      question: "How would you rate your overall mental well-being right now?",
      options: [
        "Excellent - I feel great",
        "Good - Generally positive",
        "Fair - Some struggles",
        "Poor - Significant challenges"
      ],
      category: "overall"
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Move to next question or show results
    if (currentQuestion < mentalHealthQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const calculateResults = () => {
    const scores = {
      anxiety: 0,
      depression: 0,
      stress: 0,
      overall: 0
    };

    mentalHealthQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        const score = q.options.indexOf(answer);
        if (q.category in scores) {
          scores[q.category] += score;
        }
      }
    });

    return scores;
  };

  const getRecommendations = (scores) => {
    const recommendations = [];

    if (scores.anxiety >= 6) {
      recommendations.push({
        icon: "🌬️",
        title: "Anxiety Management",
        text: "Consider practicing daily breathing exercises and mindfulness meditation. The 4-7-8 breathing technique can be particularly helpful."
      });
    }

    if (scores.depression >= 6) {
      recommendations.push({
        icon: "☀️",
        title: "Mood Support",
        text: "Try to incorporate small enjoyable activities into your daily routine. Even 10 minutes of something you love can help improve mood."
      });
    }

    if (scores.stress >= 8) {
      recommendations.push({
        icon: "🧘‍♂️",
        title: "Stress Reduction",
        text: "Regular physical activity and setting healthy boundaries can significantly reduce stress levels. Consider yoga or walking."
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: "🌟",
        title: "Maintenance",
        text: "Your mental health seems generally good! Continue practicing self-care and consider journaling to maintain your well-being."
      });
    }

    return recommendations;
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const scores = calculateResults();
    const recommendations = getRecommendations(scores);

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h1>🎯 Assessment Complete</h1>
          <p>Thank you for completing your mental health assessment</p>
        </div>

        <div className="results-container">
          <div className="results-summary">
            <div className="summary-card">
              <h3>📊 Your Results</h3>
              <div className="score-grid">
                <div className="score-item">
                  <span className="score-label">Anxiety Level</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${(scores.anxiety / 12) * 100}%` }}
                    ></div>
                  </div>
                  <span className="score-value">{scores.anxiety}/12</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Stress Level</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${(scores.stress / 12) * 100}%` }}
                    ></div>
                  </div>
                  <span className="score-value">{scores.stress}/12</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Overall Well-being</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${(scores.overall / 12) * 100}%` }}
                    ></div>
                  </div>
                  <span className="score-value">{scores.overall}/12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h3>💡 Personalized Recommendations</h3>
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="rec-icon">{rec.icon}</div>
                  <h4>{rec.title}</h4>
                  <p>{rec.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={restartAssessment} className="btn-primary">
              🔄 Take Assessment Again
            </button>
            <button onClick={() => window.location.href = '/dashboard'} className="btn-secondary">
              🏠 Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = mentalHealthQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mentalHealthQuestions.length) * 100;

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1>🧠 Mental Health Assessment</h1>
        <p>Take a few minutes to understand your current mental well-being</p>
      </div>

      <div className="assessment-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {mentalHealthQuestions.length}
        </span>
      </div>

      <div className="question-container">
        <div className="question-card">
          <h2 className="question-text">{currentQ.question}</h2>
          
          <div className="options-grid">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                className={`option-btn ${answers[currentQ.id] === option ? 'selected' : ''}`}
              >
                <span className="option-number">{index + 1}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="assessment-info">
          <h3>📋 About This Assessment</h3>
          <p>This assessment helps identify areas where you might need support. Your answers are completely private and anonymous.</p>
          
          <div className="info-tips">
            <h4>💡 Tips:</h4>
            <ul>
              <li>Answer honestly based on your recent experiences</li>
              <li>There are no right or wrong answers</li>
              <li>Your results will include personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;