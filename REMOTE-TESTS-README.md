# 远程环境测试套件

这个测试套件专门用于诊断远程环境中的数据库连接和NextAuth认证问题。

## 测试文件说明

### 1. `test-remote-db-connection.js`
**用途**: 测试基本数据库连接和表结构
- 验证数据库连接是否正常
- 检查数据库版本和基本信息
- 查看环境变量配置
- 统计User表中的用户数量
- 列出数据库中的所有表

### 2. `test-remote-env-config.js`
**用途**: 检查环境变量和配置文件
- 检查所有相关的环境变量
- 查找并分析.env文件
- 解析DATABASE_URL连接字符串
- 测试Prisma配置
- 显示系统信息

### 3. `test-remote-auth-logic.js`
**用途**: 测试用户查找和密码验证逻辑
- 模拟NextAuth的用户查找过程
- 测试常见邮箱的用户查询
- 尝试验证常见密码
- 显示所有用户的详细信息
- 测试查询性能

### 4. `test-remote-nextauth-flow.js`
**用途**: 模拟完整的NextAuth认证流程
- 完整模拟NextAuth的authorize函数
- 测试JWT和Session回调函数
- 验证完整的认证流程
- 测试数据库事务

### 5. `test-remote-create-user.js`
**用途**: 创建测试用户和验证数据完整性
- 创建标准测试用户
- 验证用户数据的完整性
- 测试登录流程
- 进行性能测试
- 生成用户统计报告

### 6. `run-remote-tests.js`
**用途**: 一次性运行所有测试
- 按顺序执行所有测试文件
- 生成详细的测试报告
- 统计成功率和执行时间

## 使用方法

### 方法一：运行单个测试
```bash
# 测试数据库连接
node test-remote-db-connection.js

# 测试环境配置
node test-remote-env-config.js

# 测试认证逻辑
node test-remote-auth-logic.js

# 测试NextAuth流程
node test-remote-nextauth-flow.js

# 测试用户创建
node test-remote-create-user.js
```

### 方法二：运行完整测试套件
```bash
# 运行所有测试
node run-remote-tests.js
```

## 上传到远程环境

1. 将以下文件上传到远程服务器的web目录：
   - `test-remote-db-connection.js`
   - `test-remote-env-config.js`
   - `test-remote-auth-logic.js`
   - `test-remote-nextauth-flow.js`
   - `test-remote-create-user.js`
   - `run-remote-tests.js`

2. 确保远程环境已安装必要的依赖：
   ```bash
   npm install @prisma/client bcryptjs
   ```

3. 运行测试：
   ```bash
   # 运行完整测试套件
   node run-remote-tests.js
   
   # 或者运行单个测试
   node test-remote-db-connection.js
   ```

## 预期输出

### 成功的情况
- ✅ 数据库连接成功
- ✅ 找到用户数据
- ✅ 密码验证通过
- ✅ NextAuth流程完整

### 可能的问题
- ❌ 数据库连接失败 → 检查DATABASE_URL
- ❌ 找不到用户 → 检查数据同步
- ❌ 密码验证失败 → 检查密码哈希
- ❌ 环境变量缺失 → 检查.env文件

## 故障排除

### 数据库连接问题
1. 检查DATABASE_URL格式是否正确
2. 确认数据库服务是否运行
3. 验证网络连接和防火墙设置

### 认证问题
1. 确认用户数据是否存在
2. 检查密码哈希是否正确
3. 验证NextAuth配置

### 环境变量问题
1. 检查.env文件是否存在
2. 确认环境变量是否正确加载
3. 验证生产环境配置

## 注意事项

1. **安全性**: 这些测试文件包含敏感操作，仅用于调试，不要在生产环境长期保留
2. **数据备份**: 运行测试前建议备份数据库
3. **权限**: 确保有足够的数据库权限执行查询和创建操作
4. **清理**: 测试完成后可以删除创建的测试用户

## 测试结果分析

根据测试结果，可以判断问题所在：

- **数据库连接测试失败** → 网络或配置问题
- **环境配置测试失败** → 环境变量问题
- **认证逻辑测试失败** → 数据或逻辑问题
- **NextAuth流程测试失败** → NextAuth配置问题
- **用户创建测试失败** → 数据库权限或约束问题

请将测试结果完整复制并发送，以便进一步分析问题。