import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  // console.log("DATABASE_URL:", process.env.DATABASE_URL);

  console.log('>>>>>>>>>>> API/Onboarding >>>>>>>>>>>>>>>>>>>')
  const user_clerk = await currentUser()
  if (!user_clerk) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()

    const entry = await prisma.onboarding.create({
      data: {
        researchPurpose: data.researchPurpose,
        organization: data.organization,
        interests: data.interests,
        termsAccepted: true,
        //user: { connect: { id: user_clerk.id } },
        userId: user_clerk.id,
      },
    })
    // return Response.json({ data });
    return NextResponse.json({ data: entry })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
