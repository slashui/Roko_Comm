import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { model, systemPrompt, userPrompt } = await request.json();
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: userPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API Error: ${error.error?.message || JSON.stringify(error)}`);
    }

    const result = await response.json();
    return NextResponse.json({ 
      success: true, 
      response: result.candidates[0].content.parts[0].text 
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}