const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // 测试数据库连接
    const userCount = await prisma.user.count()
    console.log('✅ 数据库连接成功！')
    console.log(`📊 当前用户数量: ${userCount}`)
    
    // 测试创建一个测试用户（可选）
    // const testUser = await prisma.user.create({
    //   data: {
    //     email: 'test@example.com',
    //     name: 'Test User'
    //   }
    // })
    // console.log('✅ 测试用户创建成功:', testUser)
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()