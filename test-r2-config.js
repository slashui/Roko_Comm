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

// 测试CloudFlare R2配置
async function testR2Config() {
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'course-materials';
  
  console.log('🔍 检查CloudFlare R2配置...');
  console.log('Account ID:', cfAccountId ? '✅ 已配置' : '❌ 未配置');
  console.log('API Token:', cfApiToken ? '✅ 已配置' : '❌ 未配置');
  console.log('Bucket Name:', bucketName);
  
  if (!cfAccountId || !cfApiToken) {
    console.log('❌ CloudFlare R2配置不完整');
    return;
  }
  
  try {
    // 1. 测试API连接 - 列出所有buckets
    console.log('\n🔗 测试API连接...');
    const listBucketsUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets`;
    const response = await fetch(listBucketsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API连接失败:', response.status, errorText);
      
      // 尝试解析错误信息
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.errors && errorData.errors.length > 0) {
          console.log('错误详情:', errorData.errors[0].message);
          if (errorData.errors[0].code === 10000) {
            console.log('💡 这是认证错误，可能的原因:');
            console.log('   1. API Token无效或已过期');
            console.log('   2. API Token权限不足（需要R2读写权限）');
            console.log('   3. Account ID不正确');
          }
        }
      } catch (e) {
        // 忽略JSON解析错误
      }
      return;
    }
    
    const data = await response.json();
    console.log('✅ API连接成功');
    console.log('📊 现有buckets数量:', data.result?.length || 0);
    
    // 2. 检查目标bucket是否存在
    const buckets = data.result || [];
    const targetBucket = buckets.find(bucket => bucket.name === bucketName);
    
    if (targetBucket) {
      console.log(`✅ Bucket '${bucketName}' 存在`);
      console.log('   创建时间:', targetBucket.creation_date);
    } else {
      console.log(`❌ Bucket '${bucketName}' 不存在`);
      console.log('💡 需要创建bucket，可用的buckets:');
      buckets.forEach(bucket => {
        console.log(`   - ${bucket.name} (创建于: ${bucket.creation_date})`);
      });
      
      // 3. 尝试创建bucket
      console.log(`\n🔨 尝试创建bucket '${bucketName}'...`);
      const createBucketUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets`;
      const createResponse = await fetch(createBucketUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cfApiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: bucketName
        })
      });
      
      if (createResponse.ok) {
        console.log(`✅ 成功创建bucket '${bucketName}'`);
      } else {
        const createErrorText = await createResponse.text();
        console.log(`❌ 创建bucket失败:`, createResponse.status, createErrorText);
      }
    }
    
    // 4. 测试上传权限（创建一个小的测试文件）
    console.log('\n🧪 测试上传权限...');
    const testFileName = 'test-upload.txt';
    const testContent = 'This is a test file for R2 upload verification.';
    const testBuffer = Buffer.from(testContent, 'utf8');
    
    const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets/${bucketName}/objects/${testFileName}`;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${cfApiToken}`,
        'Content-Type': 'text/plain',
        'Content-Length': testBuffer.length.toString()
      },
      body: testBuffer
    });
    
    if (uploadResponse.ok) {
      console.log('✅ 上传权限测试成功');
      
      // 5. 测试删除权限（清理测试文件）
      const deleteUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/r2/buckets/${bucketName}/objects/${testFileName}`;
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cfApiToken}`
        }
      });
      
      if (deleteResponse.ok) {
        console.log('✅ 删除权限测试成功（测试文件已清理）');
      } else {
        console.log('⚠️  删除权限测试失败，但不影响主要功能');
      }
    } else {
      const uploadErrorText = await uploadResponse.text();
      console.log('❌ 上传权限测试失败:', uploadResponse.status, uploadErrorText);
      
      try {
        const uploadErrorData = JSON.parse(uploadErrorText);
        if (uploadErrorData.errors && uploadErrorData.errors.length > 0) {
          console.log('上传错误详情:', uploadErrorData.errors[0].message);
        }
      } catch (e) {
        // 忽略JSON解析错误
      }
    }
    
  } catch (error) {
    console.error('❌ 测试过程中出错:', error.message);
  }
}

// 运行测试
testR2Config();