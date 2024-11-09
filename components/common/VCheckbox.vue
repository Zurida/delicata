<script setup>
const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    label: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

</script>

<template>
    <div class="VCheckbox">
        <input type="checkbox" :id="`checkbox-${label}`" v-model="model" :value="value">
        <label :for="`checkbox-${label}`" class="VCheckbox__label">{{ label }}</label>
    </div>
</template>

<style lang="scss" scoped>
.VCheckbox {
    display: flex;
    align-items: center;

    label {
        margin-left: .4rem;
    }
}
</style>