import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { 
      email, 
      checkout_session_id, 
      priceid, 
      name,  // 添加 name 参数
      productname, 
      amount, 
      addtime 
    } = await request.json();

    // 检查必要参数
    if (!email || !checkout_session_id) {
      return new Response(JSON.stringify({ message: '缺少必要参数' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // 检查是否已存在相同订单
    const existingOrder = await prisma.orderlist.findUnique({
      where: {
        checkout_session_id: checkout_session_id,
      },
    });

    if (existingOrder) {
      return new Response(JSON.stringify({ message: 'This order has already been processed.' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // 创建新订单
    const newOrder = await prisma.orderlist.create({
      data: {
        email,
        checkout_session_id,
        priceid,
        name,
        productname,  // This should now work
        amount,       // This should now work
        addtime,
      },
    });

    return new Response(JSON.stringify(newOrder), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('创建订单错误:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}