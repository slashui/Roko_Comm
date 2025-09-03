// update-admin.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function setAdmin() {
  try {
    // 首先查找所有用户
    const users = await prisma.user.findMany()
    console.log('数据库中的用户:')
    users.forEach(user => {
      console.log(`ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`)
    })
    
    if (users.length === 0) {
      console.log('数据库中没有用户，请先注册一个用户')
      return
    }
    
    // 更新第一个用户为管理员
    const firstUser = users[0]
    await prisma.user.update({
      where: { id: firstUser.id },
      data: { role: 'ADMIN' }
    })
    console.log(`已将用户 ${firstUser.email} 设置为管理员`)
  } catch (error) {
    console.error('设置管理员失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setAdmin()