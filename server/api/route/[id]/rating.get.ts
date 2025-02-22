import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const id = +getRouterParam(event, 'id')!

    const existedRatings = await prisma.rating.findMany({
        where: {
            routeId: id,
        }
    })

    return existedRatings
})