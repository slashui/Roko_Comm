// 测试远程数据库连接
const { PrismaClient } = require('@prisma/client');

async function testRemoteConnection() {
  console.log('=== 远程数据库连接测试 ===');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('1. 测试数据库连接...');
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    console.log('\n2. 检查数据库信息...');
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('数据库版本:', result);

    console.log('\n3. 检查环境变量...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '已设置' : '未设置');
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '已设置' : '未设置');
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '未设置');

    console.log('\n4. 测试User表查询...');
    const userCount = await prisma.user.count();
    console.log(`User表中的用户数量: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true
        }
      });
      console.log('用户列表:', users);
    }

    console.log('\n5. 测试表结构...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('数据库表:', tables);

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('错误详情:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testRemoteConnection().catch(console.error);