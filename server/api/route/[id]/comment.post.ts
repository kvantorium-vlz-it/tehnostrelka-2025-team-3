import prisma from "~/lib/prisma"

interface Body {
    content: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event)
    const id = +getRouterParam(event, 'id')!

    const session = await requireUserSession(event)

    const user = session.user as { id: number }

    const createdComment = await prisma.comment.create({
        data: {
            content: body.content,
            authorId: user.id,
            routeId: id,
        }
    })

    return createdComment
})
