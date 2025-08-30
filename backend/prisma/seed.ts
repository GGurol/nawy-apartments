import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const apartments = [
    {
      unitName: 'Lake View 1BR',
      unitNumber: 'A-101',
      project: 'Mivida',
      price: 3200000,
      description: 'One-bedroom apartment with stunning lake views, modern amenities, and spacious balcony.',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    },
    {
      unitName: 'Garden Studio',
      unitNumber: 'B-205',
      project: 'Mivida',
      price: 1800000,
      description: 'Cozy studio apartment with garden access, perfect for young professionals.',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    },
    {
      unitName: 'Premium 2BR',
      unitNumber: 'C-301',
      project: 'Mivida',
      price: 4500000,
      description: 'Luxurious two-bedroom apartment with premium finishes and city skyline views.',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    },
  ];

  for (const apartment of apartments) {
    const created = await prisma.apartment.create({
      data: apartment,
    });
    console.log(`✅ Created apartment: ${created.unitName} (${created.unitNumber})`);
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
