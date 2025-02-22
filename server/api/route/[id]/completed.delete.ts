import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const id = +getRouterParam(event, 'id')!

    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    const existedCompleted = await prisma.rating.findFirst({
        where: {
            authorId: user.id,
            routeId: id,
        }
    })
    const isCompletedBefore = existedCompleted !== null

    if (!isCompletedBefore) {
        throw createError({
            status: 404,
            message: "Записи о посещении нет",
        })
    }

    const deletedCompleted = await prisma.rating.delete({
        where: {
            id: existedCompleted.id
        }
    })

    return deletedCompleted
})