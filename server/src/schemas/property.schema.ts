import { z } from 'zod';

// For multipart/form-data, most primitive typings arrive as string scalars. Let's preprocess where necessary.
export const createPropertySchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(3),
    price: z.preprocess((val) => Number(val), z.number().min(0)),
    bhk: z.preprocess((val) => Number(val), z.number().min(0)),
    area: z.preprocess((val) => Number(val), z.number().min(0)),
    location: z.string({ required_error: 'Location is required' }),
    address: z.string({ required_error: 'Address is required' }),
    category: z.enum(['apartment', 'villa', 'plot', 'commercial']),
    virtualTourUrl: z.string().url().optional().or(z.literal('')),
    description: z.string({ required_error: 'Description is required' }),
    isAvailable: z.preprocess((val) => val === 'true' || val === true, z.boolean().optional()),
  })
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.preprocess((val) => val !== undefined ? Number(val) : undefined, z.number().min(0).optional()),
    bhk: z.preprocess((val) => val !== undefined ? Number(val) : undefined, z.number().min(0).optional()),
    area: z.preprocess((val) => val !== undefined ? Number(val) : undefined, z.number().min(0).optional()),
    location: z.string().optional(),
    address: z.string().optional(),
    category: z.enum(['apartment', 'villa', 'plot', 'commercial']).optional(),
    virtualTourUrl: z.string().url().optional().or(z.literal('')),
    description: z.string().optional(),
    isAvailable: z.preprocess((val) => val !== undefined ? (val === 'true' || val === true) : undefined, z.boolean().optional()),
  })
});
