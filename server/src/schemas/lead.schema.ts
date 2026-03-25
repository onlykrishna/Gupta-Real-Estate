import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    phone: z.string({ required_error: 'Phone number is required' }).min(10, 'Invalid phone number length'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address format'),
    message: z.string({ required_error: 'Message is required' }).min(5, 'Message must be at least 5 characters'),
    propertyId: z.string({ required_error: 'Property ID is required' }),
  })
});

export const updateLeadStatusSchema = z.object({
  body: z.object({
    status: z.enum(['new', 'contacted', 'closed'])
  })
});
