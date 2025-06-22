

import { currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
    const user = await currentUser()


    if (!user) {
        throw new Error('User not found')
    }
    // console.log(user)

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })
    console.log("MATCH>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",match)
    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
            },
        })


         redirect('/onboarding')
    }else{

        if (match.role === "is_staff") {
            redirect('/admin')
        }
    }

}

const NewUserPage = async () => {


    await createNewUser()
    return <div>...loading</div>
}

export default NewUserPage
