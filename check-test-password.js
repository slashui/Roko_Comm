const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function checkTestPassword() {
  try {
    console.log('查询test@example.com用户信息...')
    
    const user = await prisma.user.findUnique({
      where: {
        email: 'test@example.com'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        hashedPassword: true,
        createdAt: true
      }
    })
    
    if (!user) {
      console.log('❌ 没有找到test@example.com用户')
      return
    }
    
    console.log('✅ 用户信息:')
    console.log(`   邮箱: ${user.email}`)
    console.log(`   姓名: ${user.name}`)
    console.log(`   角色: ${user.role}`)
    console.log(`   创建时间: ${user.createdAt.toLocaleString('zh-CN')}`)
    
    // 测试常见密码
    const commonPasswords = ['testpassword123', 'test123', 'password', 'admin123']
    
    console.log('\n🔍 测试常见密码...')
    for (const password of commonPasswords) {
      const isMatch = await bcrypt.compare(password, user.hashedPassword)
      if (isMatch) {
        console.log(`✅ 密码匹配: ${password}`)
        break
      } else {
        console.log(`❌ 密码不匹配: ${password}`)
      }
    }
    
  } catch (error) {
    console.error('查询失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTestPassword()