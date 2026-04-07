import express from 'express';
import Task from '../models/Task.js';
import UserTask from '../models/UserTask.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get daily tasks for current user
router.get('/daily', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find or create daily tasks for today
    let dailyTasks = await Task.find({ isDaily: true, expiresAt: { $gte: today, $lt: tomorrow } });
    if (dailyTasks.length === 0) {
      // Generate random daily tasks
      const sampleTasks = [
        { title: "Password Strength Check", description: "Check your password strength using our tool", type: "password", rewardCredits: 10 },
        { title: "Phishing Detective", description: "Complete one phishing simulation", type: "phishing", rewardCredits: 15 },
        { title: "Quiz Master", description: "Score 80% or higher on any quiz", type: "quiz", rewardCredits: 20 },
        { title: "Module Learner", description: "Complete any study module", type: "module", rewardCredits: 10 },
      ];
      const selected = sampleTasks.slice(0, 3);
      for (const t of selected) {
        const task = new Task({
          ...t,
          isDaily: true,
          expiresAt: tomorrow,
        });
        await task.save();
        dailyTasks.push(task);
      }
    }

    // Get user's completion status
    const userTasks = await UserTask.find({ userId: req.userId, taskId: { $in: dailyTasks.map(t => t._id) } });
    const tasksWithStatus = dailyTasks.map(task => {
      const ut = userTasks.find(ut => ut.taskId.toString() === task._id.toString());
      return {
        ...task.toObject(),
        completed: ut?.completed || false,
        claimed: ut?.claimedReward || false,
        userTaskId: ut?._id,
      };
    });

    res.json({ tasks: tasksWithStatus });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete a task (called when user does the action)
router.post('/complete/:taskId', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    let userTask = await UserTask.findOne({ userId: req.userId, taskId: task._id });
    if (!userTask) {
      userTask = new UserTask({ userId: req.userId, taskId: task._id });
    }
    if (userTask.completed) {
      return res.json({ message: 'Already completed', claimed: userTask.claimedReward });
    }

    userTask.completed = true;
    userTask.completedAt = new Date();
    await userTask.save();

    res.json({ message: 'Task completed! Claim your reward.', taskId: task._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim reward for completed task
router.post('/claim/:userTaskId', authMiddleware, async (req, res) => {
  try {
    const userTask = await UserTask.findOne({ _id: req.params.userTaskId, userId: req.userId });
    if (!userTask) return res.status(404).json({ message: 'Task not found' });
    if (!userTask.completed) return res.status(400).json({ message: 'Task not completed' });
    if (userTask.claimedReward) return res.status(400).json({ message: 'Reward already claimed' });

    const task = await Task.findById(userTask.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    userTask.claimedReward = true;
    await userTask.save();

    // Add credits to user
    await User.findByIdAndUpdate(req.userId, { $inc: { credits: task.rewardCredits } });

    res.json({ message: `Reward claimed: +${task.rewardCredits} credits`, creditsAdded: task.rewardCredits });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;