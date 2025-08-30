"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.apartment.deleteMany();
    await prisma.apartment.createMany({
        data: [
            {
                title: 'Sunny 2BR in Zamalek',
                description: 'Bright apartment with Nile view, close to cafes.',
                price: 12000,
                city: 'Cairo',
                imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
            },
            {
                title: 'Modern Studio in New Cairo',
                description: 'Cozy studio near business district.',
                price: 8000,
                city: 'New Cairo',
                imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59',
            },
            {
                title: 'Family 3BR in Sheikh Zayed',
                description: 'Spacious apartment close to parks and schools.',
                price: 15000,
                city: 'Giza',
                imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
            },
        ],
    });
    console.log('Seeded 3 apartments');
}
main().finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map