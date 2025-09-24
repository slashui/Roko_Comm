const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

// 诊断认证问题的脚本
async function diagnoseAuthIssue() {
  console.log('🔍 开始诊断认证问题...');
  console.log('=' .repeat(50));
  
  // 1. 检查环境变量
  console.log('\n1️⃣ 检查环境变量配置:');
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '已设置' : '未设置'}`);
  if (process.env.DATABASE_URL) {
    const dbUrl = process.env.DATABASE_URL;
    const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
    const isSupabase = dbUrl.includes('supabase.com');
    console.log(`   数据库类型: ${isLocal ? '本地数据库' : isSupabase ? 'Supabase' : '其他远程数据库'}`);
    console.log(`   连接字符串预览: ${dbUrl.substring(0, 30)}...`);
  }
  
  // 2. 测试数据库连接
  console.log('\n2️⃣ 测试数据库连接:');
  const prisma = new PrismaClient({
    log: ['error'],
  });
  
  try {
    await prisma.$connect();
    console.log('   ✅ 数据库连接成功');
    
    // 3. 检查用户表
    console.log('\n3️⃣ 检查用户表:');
    const userCount = await prisma.user.count();
    console.log(`   用户总数: ${userCount}`);
    
    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          hashedPassword: true
        },
        take: 5
      });
      
      console.log('   前5个用户:');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.name}) - ${user.role}`);
        console.log(`      有密码: ${user.hashedPassword ? '是' : '否'}`);
      });
      
      // 4. 测试NextAuth authorize逻辑
      console.log('\n4️⃣ 测试NextAuth authorize逻辑:');
      const testUser = users[0];
      
      if (testUser && testUser.hashedPassword) {
        console.log(`   测试用户: ${testUser.email}`);
        
        // 模拟NextAuth的authorize函数
        try {
          const foundUser = await prisma.user.findUnique({
            where: {
              email: testUser.email
            }
          });
          
          if (foundUser) {
            console.log('   ✅ findUnique查询成功');
            console.log(`   用户ID: ${foundUser.id}`);
            console.log(`   用户邮箱: ${foundUser.email}`);
            console.log(`   用户角色: ${foundUser.role}`);
            console.log(`   密码哈希存在: ${foundUser.hashedPassword ? '是' : '否'}`);
          } else {
            console.log('   ❌ findUnique查询失败 - 这就是问题所在!');
          }
        } catch (error) {
          console.log('   ❌ findUnique查询出错:', error.message);
        }
      } else {
        console.log('   ⚠️ 没有找到有密码的用户进行测试');
      }
    } else {
      console.log('   ⚠️ 数据库中没有用户');
    }
    
    // 5. 检查数据库表结构
    console.log('\n5️⃣ 检查数据库表结构:');
    try {
      const tableInfo = await prisma.$queryRaw`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'User' 
        ORDER BY ordinal_position;
      `;
      
      console.log('   User表字段:');
      tableInfo.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type}`);
      });
    } catch (error) {
      console.log('   ❌ 无法获取表结构:', error.message);
    }
    
  } catch (error) {
    console.log('   ❌ 数据库连接失败:', error.message);
    
    // 提供解决建议
    console.log('\n💡 可能的解决方案:');
    if (error.message.includes('Tenant or user not found')) {
      console.log('   1. Supabase连接问题 - 检查连接字符串是否正确');
      console.log('   2. 检查Supabase项目是否暂停或删除');
      console.log('   3. 验证数据库凭据是否有效');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('   1. 本地数据库未启动');
      console.log('   2. 检查DATABASE_URL中的端口和主机');
      console.log('   3. 确认PostgreSQL服务正在运行');
    } else {
      console.log('   1. 检查DATABASE_URL环境变量');
      console.log('   2. 验证数据库连接字符串格式');
      console.log('   3. 确认网络连接正常');
    }
  } finally {
    await prisma.$disconnect();
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('🏁 诊断完成');
  
  // 6. 环境建议
  console.log('\n6️⃣ 环境配置建议:');
  console.log('   本地开发环境:');
  console.log('   - 使用本地PostgreSQL数据库');
  console.log('   - DATABASE_URL=postgresql://username:password@localhost:5432/database_name');
  console.log('');
  console.log('   远程生产环境:');
  console.log('   - 确保DATABASE_URL指向正确的生产数据库');
  console.log('   - 检查环境变量是否在部署平台正确设置');
  console.log('   - 验证数据库访问权限和网络连接');
}

diagnoseAuthIssue().catch(console.error);