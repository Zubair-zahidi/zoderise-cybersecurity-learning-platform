import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  plan: { type: String, enum: ['free', 'thunder'], default: 'free' },
  planType: { type: String, enum: ['free_trial', 'purchased', 'admin_grant', null], default: null },
  trialExpiry: { type: Date, default: null },
  credits: { type: Number, default: 50 },
  securityScore: { type: Number, default: 0 },
  profileImage: { type: String, default: null },
  completedModules: [{ moduleId: String, completedAt: Date }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);