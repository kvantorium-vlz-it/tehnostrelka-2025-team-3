import prisma from "~/lib/prisma"

export default defineOAuthYandexEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event, { user, tokens }) {
        const existedUser = await prisma.user.findFirst({
            where: {
                yandexId: user.id,
            }
        })

        if (existedUser === null) {
            await prisma.user.create({
                data: {
                    yandexId: user.id,
                }
            })
        }

        await setUserSession(event, {
            user: {
                yandexId: user.id,
                yandexEmail: user.default_email,
                loggedInAt: new Date(),
            },
        })

        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('Yandex OAuth error:', error)
        return sendRedirect(event, '/')
    },
})