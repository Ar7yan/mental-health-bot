import React, { useState } from 'react';

const QuizContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "How often do you feel anxious or stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 2,
      text: "How would you describe your sleep quality?",
      options: ["Excellent", "Good", "Fair", "Poor", "Very poor"]
    },
    {
      id: 3,
      text: "How motivated do you feel in daily activities?",
      options: ["Very motivated", "Motivated", "Neutral", "Unmotivated", "Very unmotivated"]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      // Here you can do something with the collected answers
      console.log('Quiz completed! Answers:', answers);
    }
  };

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>Thank you for completing the assessment.</p>
        <button onClick={() => {
          setCurrentQuestion(0);
          setAnswers({});
          setQuizCompleted(false);
        }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Mental Health Assessment</h2>
      <div className="question-card">
        <h3>Question {currentQuestion + 1} of {questions.length}</h3>
        <p>{questions[currentQuestion].text}</p>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(questions[currentQuestion].id, option)}
              className="option-btn"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;