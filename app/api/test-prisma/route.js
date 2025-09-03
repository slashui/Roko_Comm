import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 测试导入 prisma
    const prisma = await import('../../../libs/prismadb.jsx');
    const client = prisma.default;
    
    console.log('Prisma client:', typeof client);
    console.log('Has course property:', 'course' in client);
    console.log('Has findUnique:', typeof client?.course?.findUnique);
    
    // 尝试调用 findUnique
    const result = await client.course.findMany({ take: 1 });
    
    return NextResponse.json({ 
      success: true, 
      clientType: typeof client,
      hasCourse: 'course' in client,
      hasFindUnique: typeof client?.course?.findUnique,
      testQuery: result.length
    });
  } catch (error) {
    console.error('Test prisma error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
}