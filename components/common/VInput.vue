<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
defineProps({
    modelValue: {
        type: String
    },
    pill: {
        type: Boolean,
    },
});

const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
    <div class="VInput">
        <input type="text" class="input" v-bind="$attrs" :class="{
            'has-label': $slots.label,
            pill,
        }" :value="modelValue" @input="updateValue" />
        <label class="label">
            <slot name="label" />
        </label>
    </div>
</template>

<style scoped lang="scss">
.VInput {
    position: relative;
}

.input {
    box-sizing: border-box;
    width: 100%;
    background: beige;
    padding: .5rem 1rem;
    outline: 0;
    border-radius: 5px;

    &.pill {
        border-radius: 10px;
    }

    &.has-label {
        padding-top: 2rem;

        &::placeholder {
            color: transparent;
        }
    }
}

.label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    // padding: 1rem;
    pointer-events: none;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.input:focus~.label,
.input:not(:placeholder-shown)~.label {
    opacity: 0.65;
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
</style>