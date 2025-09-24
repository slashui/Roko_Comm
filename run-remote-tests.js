// 运行所有远程测试的脚本
const { spawn } = require('child_process');
const path = require('path');

const tests = [
  {
    name: '数据库连接测试',
    file: 'test-remote-db-connection.js',
    description: '测试基本数据库连接和表结构'
  },
  {
    name: '环境配置测试', 
    file: 'test-remote-env-config.js',
    description: '检查环境变量和配置文件'
  },
  {
    name: '认证逻辑测试',
    file: 'test-remote-auth-logic.js', 
    description: '测试用户查找和密码验证逻辑'
  },
  {
    name: 'NextAuth流程测试',
    file: 'test-remote-nextauth-flow.js',
    description: '模拟完整的NextAuth认证流程'
  },
  {
    name: '用户创建测试',
    file: 'test-remote-create-user.js',
    description: '创建测试用户和验证数据完整性'
  }
];

function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 开始执行: ${test.name}`);
    console.log(`📝 描述: ${test.description}`);
    console.log(`📁 文件: ${test.file}`);
    console.log(`${'='.repeat(60)}\n`);
    
    const child = spawn('node', [test.file], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    child.on('close', (code) => {
      console.log(`\n📊 ${test.name} 执行完成，退出码: ${code}`);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${test.name} 执行失败，退出码: ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.error(`❌ ${test.name} 执行错误:`, error.message);
      reject(error);
    });
  });
}

async function runAllTests() {
  console.log('🚀 开始执行远程环境测试套件');
  console.log(`📅 测试时间: ${new Date().toISOString()}`);
  console.log(`📍 工作目录: ${process.cwd()}`);
  console.log(`🔢 总测试数: ${tests.length}`);
  
  const results = [];
  
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const startTime = Date.now();
    
    try {
      await runTest(test);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      results.push({
        name: test.name,
        status: '✅ 成功',
        duration: `${duration}ms`
      });
      
      console.log(`\n✅ ${test.name} 执行成功 (耗时: ${duration}ms)`);
      
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      results.push({
        name: test.name,
        status: '❌ 失败',
        duration: `${duration}ms`,
        error: error.message
      });
      
      console.log(`\n❌ ${test.name} 执行失败 (耗时: ${duration}ms)`);
      console.log(`错误信息: ${error.message}`);
    }
    
    // 在测试之间添加短暂延迟
    if (i < tests.length - 1) {
      console.log('\n⏳ 等待 2 秒后继续下一个测试...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // 输出最终报告
  console.log('\n\n' + '='.repeat(80));
  console.log('📋 测试执行报告');
  console.log('='.repeat(80));
  
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}`);
    console.log(`   状态: ${result.status}`);
    console.log(`   耗时: ${result.duration}`);
    if (result.error) {
      console.log(`   错误: ${result.error}`);
    }
    console.log('');
  });
  
  const successCount = results.filter(r => r.status.includes('成功')).length;
  const failCount = results.filter(r => r.status.includes('失败')).length;
  
  console.log(`📊 测试统计:`);
  console.log(`   ✅ 成功: ${successCount}`);
  console.log(`   ❌ 失败: ${failCount}`);
  console.log(`   📈 成功率: ${((successCount / results.length) * 100).toFixed(1)}%`);
  
  if (failCount === 0) {
    console.log('\n🎉 所有测试都执行成功！');
  } else {
    console.log('\n⚠️  部分测试执行失败，请检查错误信息');
  }
  
  console.log('='.repeat(80));
}

// 检查是否直接运行此脚本
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ 测试套件执行失败:', error.message);
    process.exit(1);
  });
}

module.exports = { runAllTests, runTest, tests };