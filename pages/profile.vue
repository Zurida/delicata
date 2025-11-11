<script setup lang="ts">

import ProfileMeasures from '~/components/profile/ProfileMeasures.vue';

</script>

<template>
    <div class="profile container">
        <ProfileCategories />
        <ProfileMeasures />
    </div>
</template>

<style scoped lang="scss">
.profile {
    padding-left: var(--gap);
    padding-right: var(--gap);


}
</style>