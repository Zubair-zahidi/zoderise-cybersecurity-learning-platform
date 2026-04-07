import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Activate 7-day free trial
router.post('/trial', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.plan === 'thunder') {
      return res.status(400).json({ message: 'Already on Thunder plan' });
    }
    if (user.planType === 'free_trial') {
      return res.status(400).json({ message: 'Trial already used' });
    }

    user.plan = 'thunder';
    user.planType = 'free_trial';
    user.trialExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save();

    res.json({ message: '7-day trial activated', expiry: user.trialExpiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase with credits
router.post('/purchase', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.plan === 'thunder') {
      return res.status(400).json({ message: 'Already on Thunder plan' });
    }
    const cost = 100;
    if (user.credits < cost) {
      return res.status(400).json({ message: `Need ${cost} credits` });
    }

    user.credits -= cost;
    user.plan = 'thunder';
    user.planType = 'purchased';
    user.trialExpiry = null;
    await user.save();

    res.json({ message: 'Thunder plan purchased', credits: user.credits });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Check plan status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    let status = { plan: user.plan, type: user.planType, expires: user.trialExpiry };
    if (user.planType === 'free_trial' && user.trialExpiry < new Date()) {
      user.plan = 'free';
      user.planType = null;
      user.trialExpiry = null;
      await user.save();
      status.plan = 'free';
      status.type = null;
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;