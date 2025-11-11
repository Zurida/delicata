<script setup lang="ts">
import { useMeasureStore } from '~/stores/measure';
import type { TMeasure } from '~/types/measure';

const measuresStore = useMeasureStore()
const { measures } = storeToRefs(measuresStore)

const measure = ref<string>('')

async function handleMeasureSubmit() {
    try {
        await $fetch(`/api/measures`, {
            method: 'POST',
            body: {
                title: measure.value
            },
        })

    } catch (error) {
        console.log(error)
    }
}

async function handleRemoveMeasure(measure: TMeasure) {
    await $fetch(`/api/measures/${measure.id}`, {
        method: 'DELETE'
    })
}
</script>

<template>
    <ProfileForm v-model="measure" :items="measures" title="Единицы измерения" @submit="handleMeasureSubmit"
        @delete="handleRemoveMeasure" />
</template>