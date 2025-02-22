<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const ratings = await $fetch('/api/route/1/rating', {
  method: 'get'
})
</script>

<template>
  <div>
    {{ ratings.length <= 0 }}
    {{ ratings.length > 0 }}
    {{ ratings }}

    loggedIn: {{ loggedIn }}<br>
    user: {{ user }}<br>
    session: {{ session.user }}<br>

    <button @click="fetch">
      reload
    </button>

    <NuxtLink to="/api/auth/yandex" external>
      login
    </NuxtLink>

    <button @click="openInPopup('/api/auth/yandex')">
      Popup login
    </button>

    <button @click="clear()">
      logout
    </button>

    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
