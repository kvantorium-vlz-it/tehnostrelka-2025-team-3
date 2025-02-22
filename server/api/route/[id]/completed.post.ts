import prisma from "~/lib/prisma"



export default defineEventHandler(async (event) => {
    const id = +getRouterParam(event, 'id')!

    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    const isCompletedBefore = await prisma.completed.findFirst({
        where: {
            authorId: user.id,
            routeId: id,
        }
    }) !== null

    if (isCompletedBefore) {
        throw createError({
            status: 500,
            message: 'Создать ещё одну отметку об посещении нельзя'
        })
    }

    const completed = await prisma.completed.create({
        data: {
            visited: true,
            authorId: user.id,
            routeId: id,
        }
    })

    return completed
})
