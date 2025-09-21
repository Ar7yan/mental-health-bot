// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check if API key is available
const hasApiKey = !!process.env.GEMINI_API_KEY;
console.log(hasApiKey ? '✅ API Key loaded successfully' : '❌ API Key missing');

// Initialize Gemini AI if available
let genAI = null;
let model = null;

if (hasApiKey) {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('✅ Gemini AI initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Gemini AI:', error.message);
    hasApiKey = false;
  }
}

// Fallback responses for when API key is missing
const fallbackResponses = [
  "I understand you're looking for support. To enable my full capabilities, please make sure your API key is configured.",
  "I'm here to listen. For personalized mental health support, please ensure your Gemini API key is properly set up.",
  "Thank you for reaching out. To provide the best assistance, I need access to the Gemini API with a valid key.",
  "I appreciate you sharing this with me. For more comprehensive support, please check your API configuration.",
  "I'm here to support you on your mental wellness journey. To enable AI features, please configure your API key."
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    gemini_available: hasApiKey,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/debug', (req, res) => {
  res.json({
    gemini_configured: hasApiKey,
    api_key_length: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    all_env_keys: Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API') || key === 'NODE_ENV')
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Received message: ${message}`);
    
    if (hasApiKey && model) {
      // Use real Gemini API
      try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text, source: 'gemini-ai' });
      } catch (error) {
        console.error('Gemini API error:', error);
        // Fallback if Gemini API fails
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        res.json({ reply: randomResponse, source: 'fallback', error: error.message });
      }
    } else {
      // Use fallback response
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      res.json({ reply: randomResponse, source: 'fallback' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New route for mental health specific prompts
app.post('/api/mental-health-support', async (req, res) => {
  try {
    const { prompt, mood } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const mentalHealthPrompts = {
      anxiety: "I'm feeling anxious and overwhelmed. Can you help me with some calming techniques?",
      depression: "I've been feeling really down lately. What are some ways to cope with these feelings?",
      stress: "I'm experiencing a lot of stress at work/school. What are some healthy ways to manage this?",
      general: "I'd like some support with my mental wellbeing today."
    };

    const userPrompt = mood && mentalHealthPrompts[mood] 
      ? mentalHealthPrompts[mood] 
      : prompt;

    if (hasApiKey && model) {
      try {
        const fullPrompt = `As a mental health support assistant, please respond compassionately to this: ${userPrompt}. Provide supportive, evidence-based suggestions while reminding the user to seek professional help if needed.`;
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text, source: 'gemini-ai', mood: mood || 'general' });
      } catch (error) {
        console.error('Gemini API error:', error);
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        res.json({ reply: randomResponse, source: 'fallback' });
      }
    } else {
      const supportiveResponses = [
        "I hear you're going through a difficult time. Remember to practice self-care and consider reaching out to a mental health professional for support.",
        "It takes strength to acknowledge what you're feeling. Try some deep breathing exercises - inhale for 4 counts, hold for 4, exhale for 6.",
        "Thank you for sharing this with me. Remember that difficult emotions are temporary, and it's okay to not be okay sometimes.",
        "I'm here to support you. Consider taking a short walk, drinking some water, or calling a friend when you feel ready.",
        "Your feelings are valid. Be gentle with yourself today. Small steps forward are still progress."
      ];
      const response = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
      res.json({ reply: response, source: 'fallback', mood: mood || 'general' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(hasApiKey ? '✅ API Key status: Loaded' : '❌ API Key status: Missing');
  if (!hasApiKey) {
    console.log('⚠️  GEMINI_API_KEY not found in environment variables');
    console.log('⚠️  Using fallback mode - AI responses will be simulated');
  } else {
    console.log('✅ Gemini AI is available');
  }
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`🐛 Debug info: http://localhost:${port}/api/debug`);
  if (!hasApiKey) {
    console.log('⚠️  To fix this:');
    console.log('1. Create a .env file in your backend directory');
    console.log('2. Add: GEMINI_API_KEY=your_actual_api_key_here');
    console.log('3. Restart the server');
  }
});