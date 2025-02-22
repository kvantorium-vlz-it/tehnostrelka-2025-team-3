import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    const myRatings = await prisma.rating.findMany({
        where: {
            authorId: user.id
        }
    })

    return myRatings
})
