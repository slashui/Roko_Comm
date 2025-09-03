const fs = require('fs');

// 手动加载.env文件
function loadEnv() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } catch (error) {
    console.log('无法读取.env文件:', error.message);
  }
}

loadEnv();

// 测试Cloudflare Stream配置
async function testCloudflareStream() {
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;
  
  console.log('🔍 检查Cloudflare Stream配置...');
  console.log('Account ID:', cfAccountId ? '✅ 已配置' : '❌ 未配置');
  console.log('API Token:', cfApiToken ? '✅ 已配置' : '❌ 未配置');
  
  if (!cfAccountId || !cfApiToken) {
    console.log('❌ Cloudflare Stream配置不完整');
    return;
  }
  
  try {
    // 测试API连接 - 获取视频列表
    console.log('\n🔗 测试API连接...');
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API连接失败:', response.status, errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ API连接成功');
    console.log('📊 视频总数:', data.result?.length || 0);
    
    // 检查特定的StreamID
    const problemStreamId = '459ea2ebd9c84c2d9027b5c48097829a';
    console.log(`\n🔍 检查问题StreamID: ${problemStreamId}`);
    
    const streamResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/stream/${problemStreamId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (streamResponse.ok) {
      const streamData = await streamResponse.json();
      console.log('✅ StreamID存在:', streamData.result?.meta?.name || 'Unknown');
      console.log('📹 状态:', streamData.result?.status?.state || 'Unknown');
    } else {
      console.log('❌ StreamID不存在或已删除');
      console.log('状态码:', streamResponse.status);
    }
    
    // 列出所有现有视频
    if (data.result && data.result.length > 0) {
      console.log('\n📋 现有视频列表:');
      data.result.forEach((video, index) => {
        console.log(`${index + 1}. ${video.meta?.name || 'Unnamed'} (${video.uid})`);
        console.log(`   状态: ${video.status?.state || 'Unknown'}`);
        console.log(`   创建时间: ${video.created}`);
        console.log(`   播放URL: https://customer-${cfAccountId}.cloudflarestream.com/${video.uid}/manifest/video.m3u8`);
        console.log('');
      });
    } else {
      console.log('\n📋 没有找到任何视频');
    }
    
  } catch (error) {
    console.error('❌ 测试过程中出错:', error.message);
  }
}

// 运行测试
testCloudflareStream();