import React from 'react';
import QuizContainer from '../components/personality-test/QuizContainer';

const PersonalityTest = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-blue-700 mb-4'>Personality Assessment</h1>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Discover more about yourself with our quick personality assessment. 
          This will help us understand how to best support your mental health journey.
        </p>
      </div>
      
      <QuizContainer />
    </div>
  );
};

export default PersonalityTest;