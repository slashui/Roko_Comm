import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';

export async function POST(request) {
  try {
    // 获取用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { error: 'Invite code is required' },
        { status: 400 }
      );
    }

    console.log('Redeeming invite code:', code, 'for user:', session.user.email);

    // 查找邀请码
    const inviteCode = await prisma.inviteCode.findUnique({
      where: { code },
      include: {
        courses: true,
        usedBy: true
      }
    });

    if (!inviteCode) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 404 }
      );
    }

    // 检查邀请码是否已使用
    if (inviteCode.isUsed) {
      return NextResponse.json(
        { error: 'This invite code has already been used' },
        { status: 400 }
      );
    }

    // 检查邀请码是否已过期
    if (inviteCode.expiresAt && new Date() > new Date(inviteCode.expiresAt)) {
      return NextResponse.json(
        { error: 'This invite code has expired' },
        { status: 400 }
      );
    }

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        userCourses: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 开始事务处理
    const result = await prisma.$transaction(async (tx) => {
      // 标记邀请码为已使用
      await tx.inviteCode.update({
        where: { id: inviteCode.id },
        data: {
          isUsed: true,
          usedAt: new Date(),
          usedById: user.id
        }
      });

      // 为用户添加课程访问权限
      const userCourseData = [];
      for (const course of inviteCode.courses) {
        // 检查用户是否已有此课程权限
        const existingUserCourse = await tx.userCourse.findFirst({
          where: {
            userId: user.id,
            courseId: course.id
          }
        });

        if (!existingUserCourse) {
          userCourseData.push({
            userId: user.id,
            courseId: course.id,
            grantedAt: new Date(),
            grantedBy: 'INVITE_CODE'
          });
        }
      }

      // 批量创建用户课程关联
      if (userCourseData.length > 0) {
        await tx.userCourse.createMany({
          data: userCourseData
        });
      }

      return {
        grantedCourses: userCourseData.length,
        totalCourses: inviteCode.courses.length
      };
    });

    console.log('Invite code redeemed successfully:', {
      code,
      user: session.user.email,
      grantedCourses: result.grantedCourses,
      totalCourses: result.totalCourses
    });

    return NextResponse.json({
      success: true,
      message: 'Invite code redeemed successfully',
      grantedCourses: result.grantedCourses,
      totalCourses: result.totalCourses,
      courses: inviteCode.courses
    });

  } catch (error) {
    console.error('Error redeeming invite code:', error);
    
    // 根据错误类型返回更具体的错误信息
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'You already have access to one or more of these courses' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to redeem invite code' },
      { status: 500 }
    );
  }
}