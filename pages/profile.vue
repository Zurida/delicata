<script setup lang="ts">

import type { TMeasure } from '~/types/measure';
import type { TTag } from '~/types/tag';

const { data: tags } = await useFetch<TTag[]>('/api/tags')
const { data: measures } = await useFetch<TMeasure[]>('/api/measures')

</script>

<template>
    <div class="profile container">
        <ProfileCategories />
    </div>
</template>

<style scoped lang="scss">
.profile {
    padding-left: var(--gap);
    padding-right: var(--gap);


}
</style>