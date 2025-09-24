// 测试远程NextAuth完整流程
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// 模拟NextAuth的authorize函数
async function simulateAuthorize(credentials, prisma) {
  console.log('\n--- 模拟NextAuth authorize函数 ---');
  console.log('输入凭据:', { email: credentials.email, password: '****' });
  
  try {
    // 1. 查找用户
    console.log('1. 查找用户...');
    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    });
    
    if (!user) {
      console.log('❌ 用户不存在');
      return null;
    }
    
    console.log('✅ 找到用户:', {
      id: user.id,
      email: user.email,
      role: user.role
    });
    
    // 2. 验证密码
    console.log('2. 验证密码...');
    if (!user.password) {
      console.log('❌ 用户没有设置密码');
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    
    if (!isPasswordValid) {
      console.log('❌ 密码错误');
      return null;
    }
    
    console.log('✅ 密码验证成功');
    
    // 3. 返回用户信息（NextAuth格式）
    const authUser = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    console.log('✅ 认证成功，返回用户:', authUser);
    return authUser;
    
  } catch (error) {
    console.log('❌ authorize函数执行失败:', error.message);
    return null;
  }
}

// 模拟JWT回调
function simulateJwtCallback(token, user) {
  console.log('\n--- 模拟NextAuth JWT回调 ---');
  console.log('输入token:', token);
  console.log('输入user:', user);
  
  if (user) {
    token.role = user.role;
    token.id = user.id;
  }
  
  console.log('输出token:', token);
  return token;
}

// 模拟Session回调
function simulateSessionCallback(session, token) {
  console.log('\n--- 模拟NextAuth Session回调 ---');
  console.log('输入session:', session);
  console.log('输入token:', token);
  
  if (token) {
    session.user.role = token.role;
    session.user.id = token.id;
  }
  
  console.log('输出session:', session);
  return session;
}

async function testNextAuthFlow() {
  console.log('=== 远程NextAuth流程测试 ===');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    await prisma.$connect();
    console.log('✅ 数据库连接成功');

    // 获取所有用户进行测试
    console.log('\n1. 获取测试用户...');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        password: true
      }
    });
    
    console.log(`找到 ${users.length} 个用户`);
    
    if (users.length === 0) {
      console.log('❌ 没有用户可供测试');
      return;
    }

    // 测试每个用户的认证流程
    for (const user of users) {
      console.log(`\n\n=== 测试用户: ${user.email} ===`);
      
      if (!user.password) {
        console.log('❌ 用户没有密码，跳过测试');
        continue;
      }
      
      // 尝试常见密码
      const commonPasswords = ['password', '123456', 'test123', 'admin', 'user123'];
      let foundPassword = null;
      
      console.log('\n尝试常见密码...');
      for (const testPassword of commonPasswords) {
        try {
          const isValid = await bcrypt.compare(testPassword, user.password);
          if (isValid) {
            foundPassword = testPassword;
            console.log(`✅ 找到密码: ${testPassword}`);
            break;
          }
        } catch (err) {
          console.log(`❌ 密码测试错误: ${err.message}`);
        }
      }
      
      if (!foundPassword) {
        console.log('❌ 未找到匹配的密码，使用默认密码测试');
        foundPassword = 'password'; // 使用默认密码继续测试流程
      }
      
      // 测试完整的NextAuth流程
      console.log('\n=== 开始NextAuth流程测试 ===');
      
      // 1. 模拟登录请求
      const credentials = {
        email: user.email,
        password: foundPassword
      };
      
      // 2. 执行authorize函数
      const authResult = await simulateAuthorize(credentials, prisma);
      
      if (authResult) {
        // 3. 模拟JWT回调
        const token = simulateJwtCallback(
          { sub: authResult.id, email: authResult.email },
          authResult
        );
        
        // 4. 模拟Session回调
        const session = simulateSessionCallback(
          {
            user: { email: authResult.email },
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          token
        );
        
        console.log('\n🎉 完整流程测试成功！');
        console.log('最终会话:', session);
      } else {
        console.log('\n❌ 认证流程失败');
      }
    }

    // 测试数据库事务
    console.log('\n\n=== 测试数据库事务 ===');
    try {
      await prisma.$transaction(async (tx) => {
        const count = await tx.user.count();
        console.log(`✅ 事务中查询用户数量: ${count}`);
      });
    } catch (error) {
      console.log('❌ 数据库事务测试失败:', error.message);
    }

  } catch (error) {
    console.error('❌ NextAuth流程测试失败:', error.message);
    console.error('错误详情:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testNextAuthFlow().catch(console.error);