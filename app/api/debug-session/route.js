import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.jsx';
import prisma from '../../../libs/prismadb.jsx';

export async function GET(request) {
    try {
        console.log('=== Debug Session API ===');
        
        const session = await getServerSession(authOptions);
        console.log('Full session object:', JSON.stringify(session, null, 2));
        
        if (!session) {
            return NextResponse.json({
                error: 'No session found',
                session: null
            });
        }
        
        // Check if user exists in database
        let userExists = false;
        if (session.user?.id) {
            const dbUser = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            });
            userExists = !!dbUser;
            console.log('User exists in DB:', userExists);
            console.log('DB User:', dbUser);
        }
        
        return NextResponse.json({
            session: session,
            userExists: userExists,
            userId: session.user?.id || null
        });
        
    } catch (error) {
        console.error('Debug session error:', error);
        return NextResponse.json(
            { error: 'Debug session failed: ' + error.message },
            { status: 500 }
        );
    }
}