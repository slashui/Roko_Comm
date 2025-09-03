import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { model, systemPrompt, userPrompt } = await request.json();
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        system: systemPrompt, 
        messages: [
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();
    return NextResponse.json({ 
      success: true, 
      response: result.content[0].text 
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}