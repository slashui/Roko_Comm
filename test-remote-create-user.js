// 测试远程环境创建用户和数据验证
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function testCreateUser() {
  console.log('=== 远程用户创建和数据验证测试 ===');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    // 1. 检查现有用户
    console.log('\n1. 检查现有用户...');
    const existingUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    
    console.log(`现有用户数量: ${existingUsers.length}`);
    existingUsers.forEach((user, index) => {
      console.log(`用户 ${index + 1}: ${user.email} (${user.role}) - 创建于 ${user.createdAt}`);
    });

    // 2. 创建测试用户（如果不存在）
    console.log('\n2. 创建测试用户...');
    const testUsers = [
      {
        email: 'remote-test@example.com',
        password: 'test123456',
        role: 'FREE'
      },
      {
        email: 'remote-admin@example.com', 
        password: 'admin123456',
        role: 'ADMIN'
      }
    ];

    for (const testUser of testUsers) {
      try {
        // 检查用户是否已存在
        const existingUser = await prisma.user.findUnique({
          where: { email: testUser.email }
        });
        
        if (existingUser) {
          console.log(`✅ 用户已存在: ${testUser.email}`);
          
          // 测试密码是否正确
          if (existingUser.password) {
            const isPasswordValid = await bcrypt.compare(testUser.password, existingUser.password);
            console.log(`   密码验证: ${isPasswordValid ? '✅ 正确' : '❌ 错误'}`);
          }
        } else {
          // 创建新用户
          console.log(`创建新用户: ${testUser.email}`);
          const hashedPassword = await bcrypt.hash(testUser.password, 12);
          
          const newUser = await prisma.user.create({
            data: {
              email: testUser.email,
              password: hashedPassword,
              role: testUser.role
            }
          });
          
          console.log(`✅ 用户创建成功: ${newUser.email} (ID: ${newUser.id})`);
        }
      } catch (error) {
        console.log(`❌ 处理用户 ${testUser.email} 失败:`, error.message);
      }
    }

    // 3. 验证用户数据完整性
    console.log('\n3. 验证用户数据完整性...');
    const allUsers = await prisma.user.findMany();
    
    for (const user of allUsers) {
      console.log(`\n验证用户: ${user.email}`);
      
      // 检查必需字段
      const checks = {
        'ID存在': !!user.id,
        '邮箱格式': /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email),
        '角色有效': ['FREE', 'PREMIUM', 'ADMIN'].includes(user.role),
        '密码存在': !!user.password,
        '创建时间': !!user.createdAt
      };
      
      Object.entries(checks).forEach(([check, passed]) => {
        console.log(`   ${check}: ${passed ? '✅' : '❌'}`);
      });
      
      // 检查密码强度
      if (user.password) {
        const passwordChecks = {
          '长度>=8': user.password.length >= 8,
          '是否哈希': user.password.startsWith('$2'),
          '哈希长度': user.password.length >= 50
        };
        
        console.log('   密码检查:');
        Object.entries(passwordChecks).forEach(([check, passed]) => {
          console.log(`     ${check}: ${passed ? '✅' : '❌'}`);
        });
      }
    }

    // 4. 测试登录流程
    console.log('\n4. 测试登录流程...');
    for (const testUser of testUsers) {
      console.log(`\n测试登录: ${testUser.email}`);
      
      try {
        const user = await prisma.user.findUnique({
          where: { email: testUser.email }
        });
        
        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(testUser.password, user.password);
          
          if (isPasswordValid) {
            console.log('✅ 登录测试成功');
            console.log(`   用户信息: ID=${user.id}, Role=${user.role}`);
          } else {
            console.log('❌ 密码验证失败');
          }
        } else {
          console.log('❌ 用户不存在或无密码');
        }
      } catch (error) {
        console.log(`❌ 登录测试失败: ${error.message}`);
      }
    }

    // 5. 数据库性能测试
    console.log('\n5. 数据库性能测试...');
    const performanceTests = [
      {
        name: '查询所有用户',
        test: () => prisma.user.findMany()
      },
      {
        name: '按邮箱查询用户',
        test: () => prisma.user.findUnique({ where: { email: 'remote-test@example.com' } })
      },
      {
        name: '统计用户数量',
        test: () => prisma.user.count()
      }
    ];
    
    for (const test of performanceTests) {
      const startTime = Date.now();
      try {
        await test.test();
        const endTime = Date.now();
        console.log(`✅ ${test.name}: ${endTime - startTime}ms`);
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
      }
    }

    // 6. 最终报告
    console.log('\n6. 最终报告...');
    const finalUserCount = await prisma.user.count();
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true
      }
    });
    
    console.log(`总用户数: ${finalUserCount}`);
    console.log('按角色分布:');
    usersByRole.forEach(group => {
      console.log(`   ${group.role}: ${group._count.role} 个用户`);
    });

  } catch (error) {
    console.error('❌ 用户创建和验证测试失败:', error.message);
    console.error('错误详情:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateUser().catch(console.error);