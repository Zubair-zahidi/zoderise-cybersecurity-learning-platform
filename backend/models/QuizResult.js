import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: Number, // percentage
  totalQuestions: Number,
  answers: [Number],
  creditsEarned: Number,
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model('QuizResult', quizResultSchema);