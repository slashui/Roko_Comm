import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// ... existing imports ...

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const productIds = JSON.parse(process.env.STRIPE_PRODUCT_IDS);
    
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    });

    // 过滤并排序价格
    const filteredPrices = prices.data
      .filter(price => productIds.includes(price.product.id))
      .sort((a, b) => a.unit_amount - b.unit_amount); // 按价格从低到高排序

    return NextResponse.json(filteredPrices);
  } catch (error) {
  

    console.error('获取产品价格失败:', error);
    return NextResponse.json(
      { error: '获取产品价格失败' },
      { status: 500 }
    );
  }
}