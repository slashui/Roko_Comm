const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// 使用Supabase数据库连接
const supabaseUrl = 'postgresql://postgres.knhmfovfedmbgesxdwnv:Hsnjhmx2025@aws-0-us-east-2.pooler.supabase.com:5432/postgres';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: supabaseUrl
    }
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function testSupabaseAuth() {
  try {
    console.log('🔗 Testing Supabase database connection...');
    
    // 测试数据库连接
    await prisma.$connect();
    console.log('✅ Supabase database connected successfully');
    
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
    
    console.log('\n📊 All users in Supabase database:');
    if (allUsers.length === 0) {
      console.log('❌ No users found in Supabase database');
    } else {
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}, Email: ${user.email}, Name: ${user.name}, Role: ${user.role}`);
        console.log(`   Has password: ${user.hashedPassword ? 'Yes' : 'No'}`);
      });
    }
    
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
        console.log('✅ User found via findUnique in Supabase');
        console.log(`   User ID: ${user.id}`);
        console.log(`   User Email: ${user.email}`);
        console.log(`   User Name: ${user.name}`);
        console.log(`   User Role: ${user.role}`);
        console.log(`   Has hashed password: ${user.hashedPassword ? 'Yes' : 'No'}`);
        
        // 测试密码验证（如果有密码）
        if (user.hashedPassword) {
          console.log('\n🔐 Testing password verification...');
          // 注意：这里我们不知道原始密码，所以只是演示流程
          console.log('   Password hash exists, verification would happen here');
        }
      } else {
        console.log('❌ User NOT found via findUnique in Supabase');
      }
    }
    
    // 测试数据库表结构
    console.log('\n📋 Testing Supabase table structure...');
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      ORDER BY ordinal_position;
    `;
    
    console.log('User table columns in Supabase:');
    tableInfo.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
    // 测试创建一个测试用户（如果没有用户的话）
    if (allUsers.length === 0) {
      console.log('\n🆕 Creating test user in Supabase...');
      const hashedPassword = await bcrypt.hash('testpassword123', 12);
      
      const newUser = await prisma.user.create({
        data: {
          email: 'test-supabase@example.com',
          name: 'Test Supabase User',
          hashedPassword: hashedPassword,
          role: 'FREE'
        }
      });
      
      console.log('✅ Test user created in Supabase:');
      console.log(`   ID: ${newUser.id}`);
      console.log(`   Email: ${newUser.email}`);
      console.log(`   Name: ${newUser.name}`);
      console.log(`   Role: ${newUser.role}`);
    }
    
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

testSupabaseAuth();