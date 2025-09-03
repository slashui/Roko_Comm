import prisma from '../../../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')

        if (!email) {
            return new NextResponse('Email parameter is required', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Search user error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}