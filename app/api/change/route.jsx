import bcrypt from 'bcrypt'
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(request){
    const body = await request.json();
    const { email, password } = body;

    if(!email ||  !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }



    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            hashedPassword
        }
    });

    return NextResponse.json(user)
}