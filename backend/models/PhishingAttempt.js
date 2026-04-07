import mongoose from 'mongoose';

const phishingAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: String,
  score: Number,
  totalSuspicious: Number,
  correctDetections: Number,
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PhishingAttempt', phishingAttemptSchema);