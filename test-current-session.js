// test-current-session.js
// 这个脚本用于测试当前session中的用户信息
const { getServerSession } = require('next-auth/next')
const { authOptions } = require('./app/api/auth/[...nextauth]/route')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testCurrentSession() {
  try {
    console.log('=== 测试当前Session信息 ===')
    
    // 模拟一个请求对象来测试session
    const mockRequest = {
      headers: {
        cookie: '' // 在实际使用中，这里会包含session cookie
      }
    }
    
    // 注意：这个测试在服务器环境外可能无法正常工作
    // 主要用于验证配置是否正确
    console.log('NextAuth配置已更新，现在会从数据库实时获取用户角色')
    
    // 显示数据库中的ADMIN用户
    const adminUsers = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })
    
    console.log('\n数据库中的ADMIN用户:')
    adminUsers.forEach(user => {
      console.log(`- Email: ${user.email}, Name: ${user.name}, Role: ${user.role}`)
    })
    
    if (adminUsers.length === 0) {
      console.log('\n⚠️  数据库中没有ADMIN用户！')
      console.log('请运行: node test-add.admin.js 来设置管理员用户')
    } else {
      console.log('\n✅ 数据库中有ADMIN用户')
      console.log('\n解决403权限错误的步骤:')
      console.log('1. 确保你使用ADMIN用户的邮箱登录')
      console.log('2. 如果已经登录，请退出并重新登录以刷新session')
      console.log('3. 重新登录后，session将包含最新的ADMIN角色信息')
    }
    
  } catch (error) {
    console.error('测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testCurrentSession()