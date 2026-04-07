import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get current credits
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Spend credits
router.post('/spend', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.userId);
    if (user.credits >= amount) {
      user.credits -= amount;
      await user.save();
      res.json({ credits: user.credits, success: true });
    } else {
      res.status(400).json({ message: 'Insufficient credits', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;