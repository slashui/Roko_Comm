// 测试远程环境变量和配置
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function testEnvConfig() {
  console.log('=== 远程环境配置测试 ===');
  
  try {
    console.log('1. 检查环境变量...');
    const envVars = {
      'DATABASE_URL': process.env.DATABASE_URL,
      'NEXTAUTH_SECRET': process.env.NEXTAUTH_SECRET,
      'NEXTAUTH_URL': process.env.NEXTAUTH_URL,
      'NODE_ENV': process.env.NODE_ENV,
      'GITHUB_CLIENT_ID': process.env.GITHUB_CLIENT_ID,
      'GITHUB_CLIENT_SECRET': process.env.GITHUB_CLIENT_SECRET,
      'GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID,
      'GOOGLE_CLIENT_SECRET': process.env.GOOGLE_CLIENT_SECRET,
      'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY,
      'CLOUDFLARE_R2_ACCESS_KEY_ID': process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
    };

    Object.entries(envVars).forEach(([key, value]) => {
      if (value) {
        if (key.includes('SECRET') || key.includes('KEY')) {
          console.log(`${key}: ****${value.slice(-4)} (长度: ${value.length})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      } else {
        console.log(`${key}: ❌ 未设置`);
      }
    });

    console.log('\n2. 检查.env文件...');
    const envFiles = ['.env', '.env.local', '.env.production', '.env.production.local'];
    
    for (const envFile of envFiles) {
      const envPath = path.join(process.cwd(), envFile);
      if (fs.existsSync(envPath)) {
        console.log(`✅ 找到文件: ${envFile}`);
        try {
          const content = fs.readFileSync(envPath, 'utf8');
          const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
          console.log(`   包含 ${lines.length} 个配置项`);
          
          // 显示非敏感配置
          lines.forEach(line => {
            const [key] = line.split('=');
            if (key && !key.includes('SECRET') && !key.includes('KEY') && !key.includes('PASSWORD')) {
              console.log(`   ${line}`);
            } else if (key) {
              console.log(`   ${key}=****`);
            }
          });
        } catch (err) {
          console.log(`   ❌ 读取失败: ${err.message}`);
        }
      } else {
        console.log(`❌ 未找到文件: ${envFile}`);
      }
    }

    console.log('\n3. 测试数据库连接字符串解析...');
    if (process.env.DATABASE_URL) {
      try {
        const url = new URL(process.env.DATABASE_URL);
        console.log('数据库类型:', url.protocol.replace(':', ''));
        console.log('主机:', url.hostname);
        console.log('端口:', url.port || '默认端口');
        console.log('数据库名:', url.pathname.slice(1));
        console.log('用户名:', url.username);
        console.log('是否有密码:', !!url.password);
      } catch (err) {
        console.log('❌ DATABASE_URL格式错误:', err.message);
      }
    }

    console.log('\n4. 测试Prisma配置...');
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    try {
      await prisma.$connect();
      console.log('✅ Prisma连接成功');
      
      // 测试简单查询
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ 查询测试成功:', result);
      
    } catch (error) {
      console.log('❌ Prisma连接失败:', error.message);
      
      // 分析常见错误
      if (error.message.includes('ENOTFOUND')) {
        console.log('💡 可能是DNS解析问题或主机名错误');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 可能是端口错误或数据库服务未启动');
      } else if (error.message.includes('authentication failed')) {
        console.log('💡 可能是用户名或密码错误');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.log('💡 可能是数据库名称错误');
      }
    } finally {
      await prisma.$disconnect();
    }

    console.log('\n5. 检查系统信息...');
    console.log('Node.js版本:', process.version);
    console.log('平台:', process.platform);
    console.log('架构:', process.arch);
    console.log('工作目录:', process.cwd());
    console.log('当前时间:', new Date().toISOString());

  } catch (error) {
    console.error('❌ 环境配置测试失败:', error.message);
    console.error('错误详情:', error);
  }
}

testEnvConfig().catch(console.error);