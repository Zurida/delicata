<script setup>
const { loggedIn, user, clear, fetch } = useUserSession();
</script>

<template>
    <div class="UserInfo">
        <p>Admin</p>
        <p v-if="loggedIn">{{ user?.email }}</p>
    </div>
</template>

<style scoped>
p {
    text-align: right;
    font-size: var(--fs-small);
}
</style>