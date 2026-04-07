import express from 'express';
import PhishingAttempt from '../models/PhishingAttempt.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Submit phishing simulation result
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { templateId, score, totalSuspicious, correctDetections } = req.body;
    const attempt = await PhishingAttempt.create({
      userId: req.userId,
      templateId,
      score,
      totalSuspicious,
      correctDetections
    });

    const creditsEarned = Math.floor((score / totalSuspicious) * 20);
    if (creditsEarned > 0) {
      await User.findByIdAndUpdate(req.userId, { $inc: { credits: creditsEarned } });
    }

    res.json({ creditsEarned, attempt });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's phishing history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const attempts = await PhishingAttempt.find({ userId: req.userId });
    res.json({ attempts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;