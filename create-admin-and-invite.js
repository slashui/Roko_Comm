// 创建管理员用户并生成邀请码的脚本
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

// 生成随机邀请码
function generateInviteCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function createAdminAndInviteCode() {
  try {
    console.log('开始创建管理员用户和邀请码...')
    
    // 检查是否已有用户
    const existingUsers = await prisma.user.findMany()
    console.log(`当前数据库中有 ${existingUsers.length} 个用户`)
    
    let adminUser
    
    if (existingUsers.length === 0) {
      // 如果没有用户，创建一个管理员用户
      const hashedPassword = await bcrypt.hash('admin123', 10)
      
      adminUser = await prisma.user.create({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          hashedPassword: hashedPassword,
          image: '/avtar/a.svg',
          role: 'ADMIN'
        }
      })
      
      console.log('✅ 创建管理员用户成功:')
      console.log(`   邮箱: ${adminUser.email}`)
      console.log(`   密码: admin123`)
      console.log(`   角色: ${adminUser.role}`)
    } else {
      // 如果有用户，将第一个用户设为管理员
      adminUser = await prisma.user.update({
        where: { id: existingUsers[0].id },
        data: { role: 'ADMIN' }
      })
      
      console.log('✅ 将现有用户设为管理员:')
      console.log(`   邮箱: ${adminUser.email}`)
      console.log(`   角色: ${adminUser.role}`)
    }
    
    // 检查是否有课程
    const courses = await prisma.course.findMany()
    console.log(`\n当前数据库中有 ${courses.length} 个课程`)
    
    if (courses.length === 0) {
      // 如果没有课程，创建一个示例课程
      const course = await prisma.course.create({
        data: {
          title: '示例课程',
          description: '这是一个示例课程，用于测试邀请码功能',
          courseId: 'DEMO001',
          price: 99.0,
          status: 'PUBLISHED',
          category: '编程'
        }
      })
      
      console.log('✅ 创建示例课程成功:')
      console.log(`   课程名: ${course.title}`)
      console.log(`   课程ID: ${course.courseId}`)
      
      courses.push(course)
    }
    
    // 生成邀请码
    const inviteCode = generateInviteCode()
    
    // 设置过期时间为30天后
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)
    
    const createdInviteCode = await prisma.inviteCode.create({
      data: {
        code: inviteCode,
        createdBy: adminUser.id,
        expiresAt: expiresAt,
        courses: {
          create: courses.map(course => ({
            courseId: course.id
          }))
        }
      },
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                courseId: true
              }
            }
          }
        }
      }
    })
    
    console.log('\n✅ 邀请码生成成功:')
    console.log(`   邀请码: ${createdInviteCode.code}`)
    console.log(`   过期时间: ${createdInviteCode.expiresAt.toLocaleString('zh-CN')}`)
    console.log(`   关联课程: ${createdInviteCode.courses.map(ic => ic.course.title).join(', ')}`)
    
    console.log('\n🎉 设置完成！你现在可以:')
    console.log('1. 使用管理员账户登录系统')
    console.log(`2. 使用邀请码 ${createdInviteCode.code} 注册新用户`)
    console.log('3. 新用户注册后将自动获得课程访问权限')
    
  } catch (error) {
    console.error('❌ 操作失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminAndInviteCode()