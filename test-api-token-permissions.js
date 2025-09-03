require('dotenv').config();

// CloudFlare R2 API Token权限测试脚本
async function testAPITokenPermissions() {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'course-materials';

    console.log('=== CloudFlare R2 API Token权限测试 ===\n');
    
    // 检查环境变量
    console.log('1. 环境变量检查:');
    console.log(`   CLOUDFLARE_ACCOUNT_ID: ${accountId ? '✓ 已配置' : '✗ 未配置'}`);
    console.log(`   CLOUDFLARE_API_TOKEN: ${apiToken ? '✓ 已配置' : '✗ 未配置'}`);
    console.log(`   CLOUDFLARE_R2_BUCKET_NAME: ${bucketName}\n`);

    if (!accountId || !apiToken) {
        console.log('❌ 缺少必要的环境变量配置');
        return;
    }

    // 测试API Token基本权限
    console.log('2. 测试API Token基本权限:');
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
            console.log('   ✓ API Token有效，可以访问账户信息');
            console.log(`   账户名称: ${data.result.name}`);
        } else {
            console.log('   ✗ API Token无效或权限不足');
            console.log('   错误信息:', data.errors || data.message);
            return;
        }
    } catch (error) {
        console.log('   ✗ 网络连接失败:', error.message);
        return;
    }

    // 测试R2存储权限
    console.log('\n3. 测试R2存储权限:');
    try {
        // 列出R2存储桶
        const listResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        });

        const listData = await listResponse.json();
        
        if (listResponse.ok && listData.success) {
            console.log('   ✓ 可以列出R2存储桶');
            const buckets = listData.result.buckets || [];
            console.log(`   找到 ${buckets.length} 个存储桶:`);
            buckets.forEach(bucket => {
                console.log(`     - ${bucket.name} (创建时间: ${bucket.creation_date})`);
            });
            
            // 检查目标桶是否存在
            const targetBucket = buckets.find(b => b.name === bucketName);
            if (targetBucket) {
                console.log(`   ✓ 目标存储桶 '${bucketName}' 存在`);
            } else {
                console.log(`   ⚠️  目标存储桶 '${bucketName}' 不存在`);
            }
        } else {
            console.log('   ✗ 无法列出R2存储桶');
            console.log('   错误信息:', listData.errors || listData.message);
        }
    } catch (error) {
        console.log('   ✗ R2 API请求失败:', error.message);
    }

    // 测试文件上传权限
    console.log('\n4. 测试文件上传权限:');
    try {
        const testFileName = 'test-permission-check.txt';
        const testContent = 'This is a test file for permission check.';
        
        const uploadResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${testFileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'text/plain'
            },
            body: testContent
        });

        if (uploadResponse.ok) {
            console.log('   ✓ 可以上传文件到R2存储桶');
            
            // 测试删除权限
            const deleteResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${testFileName}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                }
            });
            
            if (deleteResponse.ok) {
                console.log('   ✓ 可以删除文件');
            } else {
                console.log('   ⚠️  无法删除测试文件，请手动清理');
            }
        } else {
            const errorData = await uploadResponse.json().catch(() => ({}));
            console.log('   ✗ 无法上传文件到R2存储桶');
            console.log('   HTTP状态:', uploadResponse.status);
            console.log('   错误信息:', errorData.errors || errorData.message || '未知错误');
        }
    } catch (error) {
        console.log('   ✗ 文件上传测试失败:', error.message);
    }

    console.log('\n=== 权限检查完成 ===');
    console.log('\n📋 API Token所需权限清单:');
    console.log('   • Account:Read - 读取账户信息');
    console.log('   • Cloudflare R2:Edit - 管理R2存储桶和对象');
    console.log('\n如果测试失败，请在CloudFlare Dashboard中:');
    console.log('   1. 进入 "My Profile" > "API Tokens"');
    console.log('   2. 编辑或重新创建API Token');
    console.log('   3. 确保包含上述权限');
    console.log('   4. 更新.env文件中的CLOUDFLARE_API_TOKEN');
}

testAPITokenPermissions().catch(console.error);