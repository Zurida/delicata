<script setup>
const props = defineProps({
    modelValue: { type: [Array] },
    value: { type: [String] },
    label: { type: String },
    isDisabled: { type: Boolean },
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
    <div class="VTag" :class="{ 'VTag--disabled': isDisabled }">
        <input type="checkbox" :id="`tag-${label}`" v-model="model" :value="value">
        <label :for="`tag-${label}`" class="VTag__label">{{ label }}</label>
    </div>
</template>

<style lang="scss" scoped>
.VTag {
    position: relative;
    display: inline-flex;
    align-items: center;

    &--disabled {
        pointer-events: none;
    }

    input {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;

        &:checked+label {
            background-color: var(--main-2);
            color: var(--white);
        }

    }

    label {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.8rem;
        height: 2.2rem;
        border: .5px solid var(--main-2);
        background-color: transparent;
        color: var(--main-2);
        transition: background-color .4s;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
            background-color: var(--white);
        }
    }
}
</style>