import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb.jsx';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const search = searchParams.get('search');
    
    if (email) {
      // 根据邮箱精确查找用户
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          userCourses: {
            include: {
              course: true
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
      
      return NextResponse.json(user);
    } else if (search) {
      // 模糊搜索用户（通过邮箱或姓名）
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { name: { contains: search, mode: 'insensitive' } }
          ]
        },
        include: {
          userCourses: {
            include: {
              course: true
            }
          }
        },
        take: 10 // 限制返回结果数量
      });
      
      return NextResponse.json(users);
    } else {
      // 返回所有用户（分页）
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;
      
      const users = await prisma.user.findMany({
        skip,
        take: limit,
        include: {
          userCourses: {
            include: {
              course: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      const total = await prisma.user.count();
      
      return NextResponse.json({
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}