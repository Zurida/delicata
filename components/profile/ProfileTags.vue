<script setup lang="ts">
import type { TTag } from '~/types/tag';

const tagsStore = useTagsStore()
const { tags } = storeToRefs(tagsStore)

const tag = ref<string>('')

async function handleMeasureSubmit() {
    await tagsStore.addTags(tag.value)
    tag.value = ''
}

async function handleRemoveTag(tag: TTag) {
    await tagsStore.deleteTags(tag.id)
}
</script>

<template>
    <ProfileForm v-model="tag" :items="tags" title="Теги" @submit="handleMeasureSubmit" @delete="handleRemoveTag" />
</template>