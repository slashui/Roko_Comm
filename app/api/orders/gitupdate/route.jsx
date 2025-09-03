import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    const { checkout_session_id, githubusername } = await request.json();
    console.log(checkout_session_id);
    console.log(githubusername);


    try {
        const findorder = await prisma.orderlist.findUnique({
          where: {
            checkout_session_id,
          },
        });

        if (findorder) {
            const updatedOrder = await prisma.orderlist.update({
              where: {
                id: findorder.id,
              },
              data: {
                githubusername: githubusername,
              },
            });
            return new Response(JSON.stringify(updatedOrder), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        }
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