import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const clearUsersAndSetupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete all users except the admin
    const deleteResult = await User.deleteMany({ email: { $ne: 'zahidizubair025@gmail.com' } });
    console.log(`Deleted ${deleteResult.deletedCount} user accounts`);

    // Check if admin exists, if not create it
    const existingAdmin = await User.findOne({ email: 'zahidizubair025@gmail.com' });
    if (!existingAdmin) {
      console.log('Creating admin account...');
      const admin = new User({
        email: 'zahidizubair025@gmail.com',
        password: '123kings', // Don't hash here - let the pre-save hook handle it
        name: 'Zubair Zahidi',
        role: 'admin',
        isActive: true,
        plan: 'thunder',
        planType: 'admin_grant',
        credits: 1000,
      });
      await admin.save();
      console.log('Admin account created successfully');
    } else {
      // Update admin to ensure proper settings
      await User.updateOne(
        { email: 'zahidizubair025@gmail.com' },
        {
          role: 'admin',
          isActive: true,
          plan: 'thunder',
          planType: 'admin_grant',
          credits: 1000
        }
      );
      console.log('Admin account updated with proper permissions');
    }

    console.log('\n=== ADMIN ACCOUNT DETAILS ===');
    console.log('Email: zahidizubair025@gmail.com');
    console.log('Password: 123kings');
    console.log('Role: admin');
    console.log('Plan: thunder (unlimited access)');
    console.log('Credits: 1000');

    console.log('\n=== ADMIN FEATURES ===');
    console.log('✅ View all users');
    console.log('✅ Activate/Deactivate user accounts');
    console.log('✅ Delete user accounts');
    console.log('✅ Grant Thunder plan access');
    console.log('✅ Add credits to users');
    console.log('✅ View user statistics');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

clearUsersAndSetupAdmin();