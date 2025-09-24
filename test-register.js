const axios = require('axios');

async function testRegister() {
    try {
        console.log('Testing registration API...');
        
        const testUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        // 直接测试本地 API，不通过 HTTP
        const { PrismaClient } = require('@prisma/client');
        const bcrypt = require('bcrypt');
        
        const prisma = new PrismaClient();
        
        // 检查用户是否已存在
        const exist = await prisma.user.findUnique({
            where: { email: testUser.email }
        });
        
        if (exist) {
            console.log('User already exists, deleting first...');
            await prisma.user.delete({
                where: { email: testUser.email }
            });
        }
        
        // 创建用户
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const user = await prisma.user.create({
            data: {
                name: testUser.name,
                email: testUser.email,
                hashedPassword,
                image: "/avtar/a.svg",
                role: 'FREE'
            }
        });
        
        console.log('User created successfully:', {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        });
        
        await prisma.$disconnect();
        
        console.log('Registration successful:', response.data);
        
    } catch (error) {
        console.error('Registration failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testRegister();