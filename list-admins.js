const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listAdmins() {
  try {
    console.log('查询所有管理员用户...')
    
    const adminUsers = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    
    if (adminUsers.length === 0) {
      console.log('❌ 没有找到管理员用户')
    } else {
      console.log(`✅ 找到 ${adminUsers.length} 个管理员用户:`)
      adminUsers.forEach((user, index) => {
        console.log(`\n${index + 1}. 管理员信息:`)
        console.log(`   邮箱: ${user.email}`)
        console.log(`   姓名: ${user.name}`)
        console.log(`   角色: ${user.role}`)
        console.log(`   创建时间: ${user.createdAt.toLocaleString('zh-CN')}`)
      })
    }
    
  } catch (error) {
    console.error('查询失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listAdmins()