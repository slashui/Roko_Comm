import { NextResponse } from "next/server";
import prisma from "../../../../libs/prismadb"

export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true, // Added extra fields to select
            email: true,
            image: true,
            role: true,
            aboutyou: true,
            homepage: true,
            githubname: true,
            twittername: true
        }
    });

    if(!user) {
        return NextResponse.json(
            {message: "User not found", err},
            {status: 404}
        )
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};

export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {name, email,emailVerified,image,homepage,aboutyou,githubname,twittername,role} = body;

        const {id} = params;

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                emailVerified,
                image,
                homepage,
                aboutyou,
                githubname,
                twittername
            }
        })

        if(!updateUser) {
            return NextResponse.json(
                {message: "User not found", err},
                {status: 404}
            )
        }

        return NextResponse.json(updateUser);

    } catch(err) {
        return NextResponse.json({message: "update Error", err}, {status: 500})
    }
}
