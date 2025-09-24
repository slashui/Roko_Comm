const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// 使用远程数据库URL（需要从环境变量或直接设置）
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testRemoteAuth() {
  try {
    console.log('Testing remote database connection...');
    
    // 测试数据库连接
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // 查询所有用户
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        hashedPassword: true
      }
    });
    
    console.log('\n📊 All users in database:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user.id}, Email: ${user.email}, Name: ${user.name}, Role: ${user.role}`);
      console.log(`   Has password: ${user.hashedPassword ? 'Yes' : 'No'}`);
    });
    
    // 测试特定用户查询（模拟NextAuth的authorize函数）
    if (allUsers.length > 0) {
      const testEmail = allUsers[0].email;
      console.log(`\n🔍 Testing user lookup for: ${testEmail}`);
      
      const user = await prisma.user.findUnique({
        where: {
          email: testEmail
        }
      });
      
      if (user) {
        console.log('✅ User found via findUnique');
        console.log(`   User ID: ${user.id}`);
        console.log(`   User Email: ${user.email}`);
        console.log(`   User Name: ${user.name}`);
        console.log(`   User Role: ${user.role}`);
        console.log(`   Has hashed password: ${user.hashedPassword ? 'Yes' : 'No'}`);
      } else {
        console.log('❌ User NOT found via findUnique');
      }
    }
    
    // 测试数据库表结构
    console.log('\n📋 Testing table structure...');
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      ORDER BY ordinal_position;
    `;
    
    console.log('User table columns:');
    tableInfo.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
  } finally {
    await prisma.$disconnect();
  }
}

testRemoteAuth();