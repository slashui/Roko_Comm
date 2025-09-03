import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id') || searchParams.get('sessionId');

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Session ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    console.log('Attempting to retrieve session:', sessionId);
    console.log('Using Stripe key:', process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...');
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'line_items', 'payment_intent']
    });
    
    console.log('Session retrieved successfully');
    console.log('Stripe Session 详细信息:', JSON.stringify(session, null, 2));
    
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      type: error.type,
      code: error.code 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}