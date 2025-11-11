<script setup lang="ts">
import { useMeasureStore } from '~/stores/measure';
import type { TMeasure } from '~/types/measure';

const measuresStore = useMeasureStore()
const { measures } = storeToRefs(measuresStore)

const measure = ref<string>('')

async function handleMeasureSubmit() {
    await measuresStore.addMeasures(measure.value)
    measure.value = ''
}

async function handleRemoveMeasure(measure: TMeasure) {
    await measuresStore.deleteMeasures(measure.id)
}
</script>

<template>
    <ProfileForm v-model="measure" :items="measures" title="Единицы измерения" @submit="handleMeasureSubmit"
        @delete="handleRemoveMeasure" />
</template>