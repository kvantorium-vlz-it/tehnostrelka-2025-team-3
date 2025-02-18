import { useRouter } from "vue-router"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (id === undefined) {
        return 'error'
    }

    const route = await prisma.route.findFirst({
        where: {
            id: +id,
        },
        include: {
            routeImages: {
                include: {
                    image: true,
                }
            }
        }
    })

    return route
})