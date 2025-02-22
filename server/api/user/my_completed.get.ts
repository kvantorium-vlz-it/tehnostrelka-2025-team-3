import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    const myCompleted = await prisma.completed.findMany({
        where: {
            authorId: user.id
        }
    })

    return myCompleted
})
