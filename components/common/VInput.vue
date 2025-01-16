<script setup lang="ts">
import { AuthFormSchema } from '~/types/schemas';

const model = defineModel<string | number>('model')

const props = defineProps<{
    id?: string,
    type: string,
    hasBorder?: boolean,
    error?: string,
    label?: string,
    placeholder?: string,
    validator?: (value: typeof model['value']) => boolean
}>()

const isError = ref(false)
function validate() {
    if (props.validator) {
        const parseResult = props.validator(model.value);
    }
    // if (typeof model.value === 'string') {
    //     isError.value = model.value.length < 3
    // }

    // if (typeof model.value === 'number') {
    //     isError.value = model.value < 1
    // }
}
</script>

<template>
    <div class="VInput">
        <input class="VInput__native" :class="{ 'is-error': error, 'has-border': hasBorder, 'has-label': label }"
            v-model="model" :type="type" @input="validate" :placeholder="placeholder" />

        <label :for="id" class="VInput__label" v-if="label"
            :class="{ 'is-lifted': typeof model === 'string' ? model.length : false }">
            {{ props.label }}
        </label>
        <p v-if="isError" class="VInput__error">{{ error }}</p>
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
        font-family: inherit;
        -moz-appearance: textfield;
        transition: box-shadow .4s;
        color: var(--black);

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &::placeholder {
            opacity: .5;
        }

        &:focus~.VInput__label {
            color: var(--black);
            top: 0;
        }

        &.has-label {
            &::placeholder {
                opacity: 0;
                color: transparent;
            }
        }

        &.has-border {
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        &.is-error {
            box-shadow: 0 0 0 1px red;
        }
    }


    &__label {
        position: absolute;
        top: 50%;
        left: 1%;
        padding: 0 .5rem;
        border-radius: 5px;
        background-color: #fff;
        font-size: var(--fs-small);
        font-family: inherit;
        color: rgb(153, 153, 153);
        pointer-events: none;
        transform: translateY(-50%);
        transition: color 0.2s, top 0.3s ease-in-out;

        &.is-lifted {
            opacity: 1;
            top: 0;
        }
    }

}
</style>