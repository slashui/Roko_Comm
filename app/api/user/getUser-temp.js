import bcrypt from 'bcrypt'
import prisma from '../../../libs/prismadb'

export default async function getUser(id) {
    
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if(!user) {
      throw new Error('Email already exists')
    }
    // console.log('user:', user)

    return user
  }



export async function POST(request) {
  const {id} = await request.json()
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  if(!user) {
    throw new Error('user already exists')
  }
  // console.log('user:', user)

  return user
}


  export async function UpdateName(id, updateData) {
    const result = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: updateData
      }
    });
    console.log('result:', result)
  }