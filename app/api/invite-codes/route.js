import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

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

// GET - 获取邀请码列表
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '无权限访问' },
        { status: 403 }
      )
    }

    const inviteCodes = await prisma.inviteCode.findMany({
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
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ inviteCodes })
  } catch (error) {
    console.error('获取邀请码列表失败:', error)
    return NextResponse.json(
      { error: '获取邀请码列表失败' },
      { status: 500 }
    )
  }
}

// POST - 创建新的邀请码
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '无权限访问' },
        { status: 403 }
      )
    }

    const { courseIds, expiresAt } = await request.json()

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return NextResponse.json(
        { error: '请选择至少一个课程' },
        { status: 400 }
      )
    }

    // 验证课程是否存在
    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: courseIds
        }
      }
    })

    if (courses.length !== courseIds.length) {
      return NextResponse.json(
        { error: '部分课程不存在' },
        { status: 400 }
      )
    }

    // 生成唯一的邀请码
    let code
    let isUnique = false
    let attempts = 0
    const maxAttempts = 10

    while (!isUnique && attempts < maxAttempts) {
      code = generateInviteCode().toUpperCase()
      const existingCode = await prisma.inviteCode.findUnique({
        where: { code }
      })
      if (!existingCode) {
        isUnique = true
      }
      attempts++
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: '生成邀请码失败，请重试' },
        { status: 500 }
      )
    }

    // 创建邀请码
    const inviteCode = await prisma.inviteCode.create({
      data: {
        code,
        createdBy: session.user.id,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        courses: {
          create: courseIds.map(courseId => ({
            courseId
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
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ inviteCode })
  } catch (error) {
    console.error('创建邀请码失败:', error)
    return NextResponse.json(
      { error: '创建邀请码失败' },
      { status: 500 }
    )
  }
}

// DELETE - 删除邀请码
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '无权限访问' },
        { status: 403 }
      )
    }

    // 支持两种删除方式：URL参数和请求体
    let inviteCodeId
    
    const { searchParams } = new URL(request.url)
    const idFromUrl = searchParams.get('id')
    
    if (idFromUrl) {
      inviteCodeId = idFromUrl
    } else {
      try {
        const body = await request.json()
        inviteCodeId = body.id
      } catch (error) {
        // 如果解析JSON失败，继续使用URL参数的方式
      }
    }

    if (!inviteCodeId) {
      return NextResponse.json(
        { error: '邀请码ID不能为空' },
        { status: 400 }
      )
    }

    // 验证邀请码是否存在
    const existingCode = await prisma.inviteCode.findUnique({
      where: { id: inviteCodeId }
    })

    if (!existingCode) {
      return NextResponse.json(
        { error: '邀请码不存在' },
        { status: 404 }
      )
    }

    await prisma.inviteCode.delete({
      where: {
        id: inviteCodeId
      }
    })

    return NextResponse.json({ message: '邀请码删除成功' })
  } catch (error) {
    console.error('删除邀请码失败:', error)
    return NextResponse.json(
      { error: '删除邀请码失败: ' + error.message },
      { status: 500 }
    )
  }
}