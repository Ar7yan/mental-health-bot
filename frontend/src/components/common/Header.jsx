import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-blue-600 text-white shadow-lg'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='text-2xl font-bold'>MindCare AI</Link>
          <nav className='hidden md:block'>
            <ul className='flex space-x-6'>
              <li><Link to='/' className='hover:text-blue-200'>Home</Link></li>
              <li><Link to='/dashboard' className='hover:text-blue-200'>Dashboard</Link></li>
              <li><Link to='/personality-test' className='hover:text-blue-200'>Personality Test</Link></li>
              <li><Link to='/crisis-mode' className='hover:text-blue-200'>Crisis Help</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;