const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('开始创建管理员用户...')
    
    // 检查是否已存在该邮箱的用户
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@cake.com' }
    })
    
    if (existingUser) {
      console.log('❌ 用户 admin@cake.com 已存在')
      console.log(`   当前角色: ${existingUser.role}`)
      
      // 如果不是管理员，更新为管理员
      if (existingUser.role !== 'ADMIN') {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'ADMIN' }
        })
        console.log('✅ 已将现有用户设置为管理员')
      }
      return
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash('admin456', 10)
    
    // 创建管理员用户
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@cake.com',
        hashedPassword: hashedPassword,
        image: '/avtar/a.svg',
        role: 'ADMIN'
      }
    })
    
    console.log('✅ 管理员用户创建成功:')
    console.log(`   邮箱: ${adminUser.email}`)
    console.log(`   密码: admin456`)
    console.log(`   角色: ${adminUser.role}`)
    console.log(`   用户ID: ${adminUser.id}`)
    
  } catch (error) {
    console.error('❌ 创建管理员失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()