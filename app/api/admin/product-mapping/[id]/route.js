import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../../libs/prismadb.jsx';

// 更新映射关系
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: '需要管理员权限' },
                { status: 403 }
            );
        }

        const { id } = params;
        const { courseId, isActive } = await request.json();

        const mapping = await prisma.productCourseMapping.update({
            where: { id },
            data: {
                ...(courseId && { courseId }),
                ...(typeof isActive === 'boolean' && { isActive })
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        courseId: true,
                        status: true
                    }
                }
            }
        });

        return NextResponse.json(mapping);
    } catch (error) {
        console.error('Error updating product mapping:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: '映射关系不存在' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: '更新映射关系失败' },
            { status: 500 }
        );
    }
}

// 删除映射关系
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: '需要管理员权限' },
                { status: 403 }
            );
        }

        const { id } = params;

        await prisma.productCourseMapping.delete({
            where: { id }
        });

        return NextResponse.json({ message: '映射关系已删除' });
    } catch (error) {
        console.error('Error deleting product mapping:', error);
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: '映射关系不存在' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: '删除映射关系失败' },
            { status: 500 }
        );
    }
}