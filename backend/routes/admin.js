import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';

const router = express.Router();

// All admin routes require auth + admin role
router.use(authMiddleware, adminMiddleware);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Deactivate user
router.patch('/users/:id/deactivate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isActive = false;
    await user.save();
    res.json({ message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Activate user
router.patch('/users/:id/activate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isActive = true;
    await user.save();
    res.json({ message: 'User activated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Grant Thunder plan
router.post('/users/:id/grant-thunder', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.plan = 'thunder';
    user.planType = 'admin_grant';
    user.trialExpiry = null;
    await user.save();
    res.json({ message: 'Thunder plan granted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add credits
router.post('/users/:id/add-credits', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.credits += amount;
    await user.save();
    res.json({ message: `Added ${amount} credits`, credits: user.credits });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;