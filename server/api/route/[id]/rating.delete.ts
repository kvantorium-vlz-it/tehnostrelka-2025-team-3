import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const id = +getRouterParam(event, 'id')!

    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    const existedRating = await prisma.rating.findFirst({
        where: {
            authorId: user.id,
            routeId: id,
        }
    })
    const isRateBefore = existedRating !== null

    if (!isRateBefore) {
        throw createError({
            status: 404,
            message: "Записи об оценке нет",
        })
    }

    const deletedRating = await prisma.rating.delete({
        where: {
            id: existedRating.id
        }
    })

    return deletedRating
})