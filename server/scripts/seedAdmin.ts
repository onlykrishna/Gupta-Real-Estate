import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Admin } from '../src/models/Admin';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gupta-real-estate';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');
    
    const adminEmail = 'admin@guptarealestate.com';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin with email ${adminEmail} already exists. No new admin created.`);
      process.exit(0);
    }

    // Hash the password
    const plainPassword = 'adminpassword';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Create the admin user
    const admin = new Admin({
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Super Admin'
    });

    await admin.save();
    
    console.log('Admin user seeded successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${plainPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

// Execute the clear script
seedAdmin();
