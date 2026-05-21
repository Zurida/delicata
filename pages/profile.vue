<script setup lang="ts">
definePageMeta({
    middleware: 'admin'
})

</script>
<template>
    <div class="profile container">
        <ProfileCategories />
        <ProfileMeasures />
        <ProfileTags />
    </div>
</template>

<style scoped lang="scss">
.profile {
    padding-left: var(--gap);
    padding-right: var(--gap);
    padding-bottom: var(--gap);
}
</style>