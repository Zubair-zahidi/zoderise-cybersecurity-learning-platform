import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    const user = await User.findById(req.userId);
    if (name) user.name = name;
    if (profileImage) user.profileImage = profileImage;
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email, profileImage: user.profileImage } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete own account (soft delete)
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { isActive: false });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Account deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;