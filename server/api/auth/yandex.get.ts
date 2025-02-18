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

        let userFromDatabase

        if (existedUser === null) {
            userFromDatabase = await prisma.user.create({
                data: {
                    yandexId: user.id,
                }
            })
        } else {
            userFromDatabase = existedUser
        }

        await setUserSession(event, {
            user: {
                id: userFromDatabase.id, 
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