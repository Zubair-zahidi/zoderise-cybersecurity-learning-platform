import mongoose from 'mongoose';

const userTaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  completed: { type: Boolean, default: false },
  completedAt: Date,
  claimedReward: { type: Boolean, default: false },
});

export default mongoose.model('UserTask', userTaskSchema);