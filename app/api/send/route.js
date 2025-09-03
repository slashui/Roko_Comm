import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 移除在构建时就执行的代码
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    if (!request.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const body = await request.json();   
    const { email, subject, DataOTP } = body;

    // 验证必要的字段
    if (!email || !subject || !DataOTP) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 动态导入 EmailTemplate
    const { EmailTemplate } = await import('@/components/EmailTemplate');

    const data = await resend.emails.send({
      from: 'Acme <hello@oneday.build>',
      to: email,
      subject: subject,
      react: EmailTemplate({ DataOTP }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}