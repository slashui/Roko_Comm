import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { provider, model, systemPrompt, messages } = await request.json();
    const userPrompt = messages[messages.length - 1].content;

    
    const response = await fetch(`${request.nextUrl.origin}/api/ai/${provider.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, systemPrompt, userPrompt })
    });

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}