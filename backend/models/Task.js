import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['quiz', 'phishing', 'password', 'module'] },
  targetId: String, // e.g., quizId or moduleId
  rewardCredits: Number,
  isDaily: { type: Boolean, default: true },
  expiresAt: Date,
});

export default mongoose.model('Task', taskSchema);