import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API - Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API - Gemini AI Plant Assistant Chat
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Graceful fallback helper if API key is not configured in secrets yet
      return res.json({
        reply: "Hi there! I am Sage, your virtual Plant Care specialist. It looks like the Gemini API key is currently loading, but I can still tell you about Pacific Flora Botanicals! We are an artisanal nursery based in Seattle, specializing in rare houseplants, custom terracotta ceramics, and sovereign raw soil mixes. How can I help you today?"
      });
    }

    try {
      // Lazy initialization of GoogleGenAI
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are 'Sage', the premium virtual botanical specialist representing 'Pacific Flora Botanicals' in Seattle, Washington.
Our store prides itself on high-end plants, bespoke terracotta vessels, and organic hand-blended sovereign soil.
Your character is highly knowledgeable, elegant, authentic, and deeply enthusiastic about green biology.

Keep answers concise (1-3 short paragraphs), beautifully structured with bullet points if explaining steps, and highly human-centric.
If asked about store products, mention items like our Monstera Deliciosa ($48), Variegated Monstera Albo ($185), Grecian Olive Tree ($75), or Sovereign Well-Draining Soil ($16).
If asked about simulated shipping or custom orders, let them know that Pacific Flora offers regional delivery to King County and flat-rate courier mail nationwide, and they can track any purchase directly via their Cart & Track workspace!`;

      // Format history into the style expected by Gemini 2.5
      const contents = [];
      
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }

      // Add the new user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash', // Safeguard standard flash model
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500,
        },
        contents,
      });

      const replyText = response.text || "I am here to support you and your plants. Could you tell me more about their light conditions?";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({
        reply: "Pardon me, it seems there was a temporary botanical signal interference. I would love to talk about your plants—could you try retyping or sharing what light they receive?"
      });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server loaded and listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
