// 测试远程环境的NextAuth认证逻辑
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function testAuthLogic() {
  console.log('=== 远程认证逻辑测试 ===');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    // 测试用户查找逻辑（模拟NextAuth的authorize函数）
    console.log('\n1. 测试用户查找逻辑...');
    
    const testEmails = ['test@example.com', 'admin@example.com', 'user@test.com'];
    
    for (const email of testEmails) {
      console.log(`\n测试邮箱: ${email}`);
      
      try {
        // 模拟NextAuth的findUnique查询
        const user = await prisma.user.findUnique({
          where: { email: email }
        });
        
        if (user) {
          console.log(`✅ 找到用户:`, {
            id: user.id,
            email: user.email,
            role: user.role,
            hasPassword: !!user.password
          });
          
          // 测试密码验证（如果有密码）
          if (user.password) {
            const testPasswords = ['password', '123456', 'test123', 'admin'];
            for (const testPassword of testPasswords) {
              try {
                const isValid = await bcrypt.compare(testPassword, user.password);
                if (isValid) {
                  console.log(`✅ 密码匹配: ${testPassword}`);
                  break;
                }
              } catch (err) {
                console.log(`❌ 密码验证错误: ${err.message}`);
              }
            }
          }
        } else {
          console.log(`❌ 未找到用户: ${email}`);
        }
      } catch (error) {
        console.error(`❌ 查询用户失败 (${email}):`, error.message);
      }
    }

    // 测试所有用户
    console.log('\n2. 获取所有用户信息...');
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
        createdAt: true
      }
    });
    
    console.log(`总用户数: ${allUsers.length}`);
    allUsers.forEach((user, index) => {
      console.log(`用户 ${index + 1}:`, {
        id: user.id,
        email: user.email,
        role: user.role,
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0,
        createdAt: user.createdAt
      });
    });

    // 测试数据库查询性能
    console.log('\n3. 测试查询性能...');
    const startTime = Date.now();
    await prisma.user.findMany();
    const endTime = Date.now();
    console.log(`查询耗时: ${endTime - startTime}ms`);

  } catch (error) {
    console.error('❌ 认证逻辑测试失败:', error.message);
    console.error('错误详情:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthLogic().catch(console.error);