import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  isPremium: { type: Boolean, default: false },
  questions: [{
    text: String,
    options: [String],
    correctIndex: Number,
    explanation: String
  }],
  creditsReward: { type: Number, default: 10 }
});

export default mongoose.model('Quiz', quizSchema);