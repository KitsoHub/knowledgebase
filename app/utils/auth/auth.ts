// import { auth } from '@clerk/nextjs'
// import { prisma } from '@/lib/prisma'

// export const getUserByClerkID = async () => {
//   const { userId } = await auth()

//   const user = await prisma.user.findUniqueOrThrow({
//     where: {
//       clerkId: userId,
//     },
//   })

//   return user
// }

// import type { User } from '@clerk/nextjs/api'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export const getUserByClerkID = async (select = { id: true }) => {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    select,
  })

  // console.log('>>>>>>Get user by ID>>>>>>>>>>>', user)

  return user
}
