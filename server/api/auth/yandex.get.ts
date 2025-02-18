export default defineOAuthYandexEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event, { user, tokens }) {
        console.log(user)

        await setUserSession(event, {
            user: {
                yandexId: user.id,
                yandexEmail: user.default_email,
            }
        })

        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('Yandex OAuth error:', error)
        return sendRedirect(event, '/')
    },
})