import prisma from '../../../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function PUT(request) {
    try {
        const body = await request.json()
        const { email, role } = body

        if (!email || !role) {
            return new NextResponse('Email and role are required', { status: 400 })
        }

        // 验证role是否为有效值
        const validRoles = ['FREE', 'VIP', 'PRIME']
        if (!validRoles.includes(role)) {
            return new NextResponse('Invalid role. Must be FREE, VIP, or PRIME', { status: 400 })
        }

        // 查找用户是否存在
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!existingUser) {
            return new NextResponse('User not found', { status: 404 })
        }

        // 更新用户角色
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                role: role
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                updatedAt: true
            }
        })

        return NextResponse.json({
            message: 'User role updated successfully',
            user: updatedUser
        })
    } catch (error) {
        console.error('Update user role error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}