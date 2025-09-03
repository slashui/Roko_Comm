const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // 尝试连接数据库
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // 尝试查询用户表
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)
    
    // 尝试查询邀请码表
    const inviteCodeCount = await prisma.inviteCode.count()
    console.log(`✅ Found ${inviteCodeCount} invite codes in database`)
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error('Error:', error.message)
    
    if (error.code === 'P1001') {
      console.log('\n🔧 Possible solutions:')
      console.log('1. Check if your Supabase project is still active')
      console.log('2. Verify your database URL and password')
      console.log('3. Check network connectivity')
      console.log('4. Try using a local PostgreSQL database for testing')
    }
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()