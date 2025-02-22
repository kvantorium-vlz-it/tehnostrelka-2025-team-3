import prisma from "~/lib/prisma"

interface Body {
    rating: number
}

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event)
    const id = +getRouterParam(event, 'id')!

    const session = await requireUserSession(event)
    const user = session.user as { id: number }

    if (body.rating < 0 || body.rating > 10) {
        throw createError({
            status: 500,
            message: 'Рейтинг должен быть в диапазоне 0-10'
        })
    }

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

    const editedRating = await prisma.rating.update({
        data: {
            rating: body.rating,
        },
        where: {
            id: existedRating.id,
            AND: {
                authorId: user.id,
                routeId: id,
            },
        },
    })

    return editedRating
})