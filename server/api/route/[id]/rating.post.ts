import prisma from "~/lib/prisma"

interface Body {
    rating: number
}

// const A = body.rating >= 0
// const B = body.rating <= 10
// A && B
// !A || !B

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

    const isRateBefore = await prisma.rating.findFirst({
        where: {
            authorId: user.id,
            routeId: id,
        }
    }) !== null

    if (isRateBefore) {
        throw createError({
            status: 500,
            message: 'Создать ещё одну оценку нельзя'
        })
    }

    const createdRating = await prisma.rating.create({
        data: {
            rating: body.rating,
            authorId: user.id,
            routeId: id,
        }
    })

    return createdRating
})