import React, { useState } from 'react';

const CrisisMode = () => {
  const [isInCrisis, setIsInCrisis] = useState(false);

  const emergencyContacts = [
    { name: 'National Suicide Prevention Lifeline', number: '988' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741' },
    { name: 'Emergency Services', number: '911' },
    { name: 'Local Mental Health Hotline', number: '1-800-273-TALK' }
  ];

  if (isInCrisis) {
    return (
      <div className='min-h-screen bg-red-50 flex items-center justify-center p-4'>
        <div className='max-w-2xl w-full bg-white rounded-lg shadow-lg p-8'>
          <div className='text-center mb-8'>
            <div className='text-6xl mb-4'>🚨</div>
            <h1 className='text-3xl font-bold text-red-700 mb-4'>Immediate Support Available</h1>
            <p className='text-gray-600 mb-6'>
              You're not alone. Please reach out to one of these resources immediately:
            </p>
          </div>

          <div className='space-y-4 mb-8'>
            {emergencyContacts.map((contact, index) => (
              <div key={index} className='p-4 bg-red-100 rounded-lg'>
                <h3 className='font-semibold text-red-800 mb-1'>{contact.name}</h3>
                <p className='text-lg font-mono text-red-600'>{contact.number}</p>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <button
              onClick={() => setIsInCrisis(false)}
              className='bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 mr-4'
            >
              I'm Safe Now
            </button>
            <button
              onClick={() => window.location.href = 'tel:988'}
              className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700'
            >
              Call Emergency Line
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center p-4'>
      <div className='max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center'>
        <div className='text-6xl mb-6'>💙</div>
        <h1 className='text-3xl font-bold text-blue-700 mb-4'>Crisis Support</h1>
        <p className='text-gray-600 mb-8'>
          If you're experiencing a mental health crisis or having thoughts of self-harm, 
          we're here to help you get immediate support.
        </p>

        <div className='space-y-4 mb-8'>
          <button
            onClick={() => setIsInCrisis(true)}
            className='w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 text-lg font-semibold'
          >
            I Need Immediate Help
          </button>
          
          <button
            onClick={() => window.open('https://www.crisistextline.org/', '_blank')}
            className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700'
          >
            Chat with Crisis Counselor
          </button>
          
          <button
            onClick={() => window.open('https://www.mentalhealth.gov/', '_blank')}
            className='w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700'
          >
            Mental Health Resources
          </button>
        </div>

        <p className='text-sm text-gray-500'>
          Remember: You are not alone, and there are people who want to help you.
        </p>
      </div>
    </div>
  );
};

export default CrisisMode;