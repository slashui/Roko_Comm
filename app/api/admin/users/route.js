import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismadb.jsx';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (email) {
      // 查询特定用户
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          userCourses: {
            include: {
              course: {
                select: {
                  id: true,
                  courseId: true,
                  title: true,
                  description: true,
                  price: true,
                  status: true,
                  createdAt: true
                }
              }
            }
          }
        }
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        ...user,
        hashedPassword: undefined, // 不返回密码
        courses: user.userCourses.map(uc => uc.course)
      });
    } else {
      // 获取所有用户列表
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              userCourses: true
            }
          }
        }
      });
      
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}