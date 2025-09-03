
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, priceid, checkout_session_id, githubusername, addtime } = await request.json();

  try {
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

    const newOrder = await prisma.orderlist.create({
      data: {
        email,
        checkout_session_id,
        priceid,
        name,                // 使用 name 而不是 githubusername
        productname,         // 新增产品名称
        amount,             // 新增金额
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
    console.error('Error managing order:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500, 
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}