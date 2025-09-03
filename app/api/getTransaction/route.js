// // /app/api/getTransaction/route.js

// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const transactionId = searchParams.get('transactionId');

//   if (!transactionId) {
//     return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 });
//   }

//   try {
//     const response = await fetch(`https://api.paddle.com/transactions/${transactionId}`, {
//       headers: {
//         'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch transaction data');
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error fetching transaction:', error);
//     return NextResponse.json({ error: 'Failed to fetch transaction data' }, { status: 500 });
//   }
// }

