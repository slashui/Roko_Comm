import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    const { email, role } = await request.json();

    if (!email || !role) {
      return new Response(JSON.stringify({ message: '邮箱和角色是必需的' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 检查订单表中是否有对应的订单
    const order = await prisma.orderlist.findFirst({
      where: { email },
      orderBy: { addtime: 'desc' },
    });

    // 如果有订单，验证角色是否匹配订单金额
    if (order) {
      const orderAmount = Number(order.amount);
      let validRole = 'FREE';
      
      if (orderAmount === 79) {
        validRole = 'PRIME';
      } else if (orderAmount === 99) {
        validRole = 'VIP';
      }

      // 如果请求的角色与订单金额匹配，或者是管理员操作，则允许更新
      if (role === validRole || session?.user?.role === 'ADMIN') {
        const updatedUser = await prisma.user.update({
          where: { email },
          data: { role },
        });

        return new Response(JSON.stringify({ 
          message: '用户角色已更新',
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 如果没有订单，只允许管理员更新角色
    if (session?.user?.role === 'ADMIN') {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { role },
      });

      return new Response(JSON.stringify({ 
        message: '用户角色已更新',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          role: updatedUser.role
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 如果以上条件都不满足，返回无权限错误
    return new Response(JSON.stringify({ message: '无权执行此操作' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('更新用户角色错误:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}