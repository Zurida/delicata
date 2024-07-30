<script setup lang="ts">
const props = defineProps<{
    options: [],
    name: string,
    modelValue: string
}>()
</script>

<template>
    <div>
        <select :name="name" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option v-for="option in options" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>


<style lang="scss" scoped></style>