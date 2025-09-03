import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(request){
    const body = await request.json();
    const { name, email, aiDescription, twitterID } = body;
    try {
        const waitlistEntry = await prisma.waitlist.create({
            data: {
            name,
            email,
            aiDescription,
            twitterID,
            },
        });
    return NextResponse.json(waitlistEntry);
    }catch (error) {
        console.error('Error adding to waitlist:', error);
        throw error;
      }
    
}
