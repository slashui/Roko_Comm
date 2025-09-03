import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const priceId = searchParams.get('priceId');

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://api.paddle.com/prices/${priceId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`
      }
    });

    // 直接返回 Paddle API 的响应数据
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching price:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Error fetching price' },
      { status: error.response?.status || 500 }
    );
  }
}