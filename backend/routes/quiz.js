import express from 'express';
import Quiz from '../models/Quiz.js';
import QuizResult from '../models/QuizResult.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all quizzes (filter premium based on user plan)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const quizzes = await Quiz.find(
      user.plan === 'thunder' ? {} : { isPremium: false }
    );
    res.json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz answers
router.post('/submit/:quizId', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const user = await User.findById(req.userId);
    if (quiz.isPremium && user.plan !== 'thunder') {
      return res.status(403).json({ message: 'Premium quiz requires Thunder plan' });
    }

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score++;
    });

    const percentage = (score / quiz.questions.length) * 100;
    const creditsEarned = percentage >= 70 ? quiz.creditsReward : 0;

    await QuizResult.create({
      userId: req.userId,
      quizId: quiz._id,
      score: percentage,
      totalQuestions: quiz.questions.length,
      answers,
      creditsEarned
    });

    if (creditsEarned > 0) {
      user.credits += creditsEarned;
      await user.save();
    }

    res.json({ score: percentage, creditsEarned, total: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's quiz history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.userId }).populate('quizId', 'title difficulty');
    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;