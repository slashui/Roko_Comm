const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
    try {
        console.log('Checking all users in database...');
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });
        
        console.log('Total users found:', users.length);
        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`, {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt
            });
        });
        
        // Check if there are any purchases
        const purchases = await prisma.purchase.findMany({
            select: {
                id: true,
                userId: true,
                status: true
            }
        });
        
        console.log('\nTotal purchases found:', purchases.length);
        purchases.forEach((purchase, index) => {
            console.log(`Purchase ${index + 1}:`, purchase);
        });
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();