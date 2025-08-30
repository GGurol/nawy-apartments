import { z } from 'zod';

export const ApartmentCreateSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  unitNumber: z.string().min(1, 'Unit number is required'),
  project: z.string().min(1, 'Project is required'),
  price: z.number().int().nonnegative('Price must be a non-negative integer'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

export type ApartmentCreate = z.infer<typeof ApartmentCreateSchema>;
