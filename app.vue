<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>

<template>
  <div>
    loggedIn: {{ loggedIn }}<br>
    user: {{ user }}<br>
    session: {{ session.user }}<br>

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
