import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const recreateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({ email: { $in: ['zahidizubair0@gmail.com', 'zahidizubair025@gmail.com'] } });
    console.log('Deleted existing admin accounts');

    // Create new admin
    const admin = new User({
      email: 'zahidizubair025@gmail.com',
      password: '123kings',
      name: 'Zubair Zahidi',
      role: 'admin',
      isActive: true,
      plan: 'thunder',
      planType: 'admin_grant',
      credits: 1000,
    });
    await admin.save();
    console.log('Admin account created successfully');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

recreateAdmin();