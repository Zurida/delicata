<script setup lang="ts">
const model = defineModel<string | number>('model')

const props = defineProps<{
    type: string
}>()


const isError = ref(false)
function validate() {
    if (typeof model.value === 'string') {
        isError.value = model.value.length < 3
    }

    if (typeof model.value === 'number') {
        isError.value = model.value < 1
    }
}
</script>

<template>
    <div class="VInput">
        <input class="VInput__native" :class="{ 'is-error': isError }" v-model="model" v-bind="$attrs" :type="type"
            @input="validate" />
        <label class="VInput__label" v-if="$slots.label">
            <slot name="label" />
        </label>
        <p v-if="isError" class="VInput__error">Введите {{ type === 'number' ? 'число' : 'не менее 3 символов' }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.VInput {
    position: relative;

    &__native {
        width: 100%;
        min-height: 3.8rem;
        padding: 0.675em 1em;
        border-radius: 5px;
        border: none;
        outline: none;
        font-family: inherit;
        -moz-appearance: textfield;
        transition: box-shadow .4s;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }


        &:focus~.label,
        &:not(:placeholder-shown)~.label {
            opacity: 0.65;
            transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        }

        &.has-label {
            padding-top: 2rem;

            &::placeholder {
                color: transparent;
            }
        }

        &.is-error {
            box-shadow: 0 0 0 1px red;
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