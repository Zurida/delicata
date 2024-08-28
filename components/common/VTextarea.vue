<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
defineProps({
    modelValue: {
        type: String
    },
});

const emit = defineEmits(['update:modelValue'])
const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
    <div class="VTextarea">
        <textarea class="VTextarea__native" v-bind="$attrs" :class="{
            'has-label': $slots.label
        }" :value="modelValue" @input="updateValue" />
        <label class="VTextarea__label" v-if="$slots.label">
            <slot name="label" />
        </label>
    </div>
</template>

<style scoped lang="scss">
.VTextarea {
    position: relative;

    &__native {
        width: 100%;
        padding: 0.675em 1em;
        border-radius: 5px;
        border: none;
        outline: none;
        font-family: inherit;


        &:focus~.label,
        &:not(:placeholder-shown)~.label {
            opacity: 0.65;
            transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        }

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


    &__label {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        // padding: 1rem;
        pointer-events: none;
        transform-origin: 0 0;
        transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
    }
}
</style>