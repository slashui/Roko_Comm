const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function testLogin() {
    try {
        console.log('Testing login logic...');
        
        const credentials = {
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        // 模拟 NextAuth authorize 函数的逻辑
        if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter an email and password');
        }
        
        // 查找用户
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        });
        
        if (!user || !user?.hashedPassword) {
            throw new Error('No user found');
        }
        
        console.log('User found:', {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            hasPassword: !!user.hashedPassword
        });
        
        // 验证密码
        const passwordMatch = await bcrypt.compare(
            credentials.password, 
            user.hashedPassword
        );
        
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        
        console.log('✅ Login test successful!');
        console.log('User would be authenticated with:', {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        });
        
    } catch (error) {
        console.error('❌ Login test failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin();