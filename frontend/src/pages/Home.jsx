// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Compassionate AI Mental Health Companion</h1>
            <p>Find peace, understanding, and support through personalized AI-powered mental wellness guidance</p>
            <div className="hero-buttons">
              <Link to="/dashboard" className="cta-button primary">
                Start Your Journey
              </Link>
              <Link to="/about" className="cta-button secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-cards">
              <div className="card card-1">🧠</div>
              <div className="card card-2">💭</div>
              <div className="card card-3">🌿</div>
              <div className="card card-4">✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>How Mindful Companion Supports You</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 AI Chat Support</h3>
              <p>Always available to listen and provide compassionate guidance whenever you need it</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Personalized Assessments</h3>
              <p>Understand your mental state with tailored personality and mood assessments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Journaling Tools</h3>
              <p>Express your thoughts and track your emotional journey with guided journaling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧘‍♂️</div>
              <h3>Mindfulness Exercises</h3>
              <p>Access breathing exercises and meditation guides to find calm and focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Section (Replaces Testimonials) */}
      <section className="inspiration-section">
        <div className="container">
          <h2>Words of Comfort & Inspiration</h2>
          <div className="quotes-grid">
            <div className="quote-card">
              <div className="quote-icon">🌱</div>
              <div className="quote-text">
                "Healing is not about moving on or 'getting over it,' it's about learning to make peace with our pain and finding meaning in our suffering."
              </div>
            </div>
            <div className="quote-card">
              <div className="quote-icon">💫</div>
              <div className="quote-text">
                "Your mental health is a journey, not a destination. Be gentle with yourself through the process."
              </div>
            </div>
            <div className="quote-card">
              <div className="quote-icon">🌄</div>
              <div className="quote-text">
                "Just when the caterpillar thought the world was over, it became a butterfly. Your transformation is possible."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Begin Your Wellness Journey?</h2>
          <p>Take the first step toward a more peaceful mind today</p>
          <Link to="/dashboard" className="cta-button large">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;