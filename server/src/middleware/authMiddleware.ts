import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isMockMode } from '../db/connectDB';

// Extend Express Request object to include admin info
export interface AuthRequest extends Request {
  admin?: any;
}

export const protectAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  // If in Mock Mode, we bypass verification to avoid login loops while DB is down
  if (isMockMode) {
    req.admin = { id: 'mockadmin', name: 'Master Admin', email: 'admin@guptaestates.com' };
    return next();
  }

  let token;

  // 1. Check for token in cookies (preferred)
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } 
  // 2. Fallback to Bearer token in Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 3. If no token is found, return 401
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    
    // 5. Attach decoded admin data to request object
    req.admin = decoded;
    
    // 6. Proceed to next
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
