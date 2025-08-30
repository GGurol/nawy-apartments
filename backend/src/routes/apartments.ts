import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { validate } from '../lib/validate';
import { ApartmentCreateSchema } from '../schemas/apartment';
import { Prisma } from '@prisma/client';

const router = Router();

// List apartments with search and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = Math.min(parseInt(limit as string, 10), 100);
    const skip = (pageNum - 1) * limitNum;

    const where: Prisma.ApartmentWhereInput = search
      ? {
          OR: [
            { unitName: { contains: search as string, mode: 'insensitive' } },
            { unitNumber: { contains: search as string, mode: 'insensitive' } },
            { project: { contains: search as string, mode: 'insensitive' } },
          ],
        }
      : {};

    const [apartments, total] = await Promise.all([
      prisma.apartment.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.apartment.count({ where }),
    ]);

    res.json({
      items: apartments,
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get apartment by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const apartment = await prisma.apartment.findUnique({
      where: { id },
    });

    if (!apartment) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create new apartment
router.post('/', validate(ApartmentCreateSchema), async (req: Request, res: Response) => {
  try {
    const apartmentData = req.body as any;
    
    const apartment = await prisma.apartment.create({
      data: apartmentData,
    });

    res.status(201).json(apartment);
  } catch (error) {
    console.error('Error creating apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
