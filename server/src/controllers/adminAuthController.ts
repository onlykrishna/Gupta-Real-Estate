import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { isMockMode } from '../db/connectDB';
import { mockAdmins } from '../db/mockStore';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // 1. Handle Mock Mode Login
    if (isMockMode) {
       const mockAdmin = mockAdmins.find(a => a.email === email && a.password === password);
       if (mockAdmin) {
          return res.status(200).json({
             message: 'Login successful (Demo Mode)',
             admin: { id: mockAdmin._id, name: mockAdmin.name, email: mockAdmin.email }
          });
       }
       return res.status(401).json({ message: 'Invalid credentials in Demo Mode. Try admin@guptaestates.com / password123' });
    }

    // 2. Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 3. Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 5. Generate JWT
    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1d' }
    );

    // 6. Send JWT in httpOnly cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 
    });

    // 7. Send success response 
    res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logoutAdmin = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
};
