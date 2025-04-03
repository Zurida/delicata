<script setup lang="ts">
const modelValue = defineModel<string | number>()

interface Props {
    id?: string,
    type?: string,
    error?: string,
    label?: string,
    placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
})
</script>

<template>
    <div class="VInput">
        <div class="VInput__body">
            <input class="VInput__native" :class="{ 'is-error': error, 'has-label': label }" v-model="modelValue"
                :type="type" :placeholder="placeholder" />
            <label :for="id" class="VInput__label" v-if="label"
                :class="{ 'is-lifted': typeof modelValue === 'string' ? modelValue.length : false }">
                {{ props.label }}
            </label>
        </div>
        <p v-if="props.error" class="VInput__error">{{ props.error }}</p>
    </div>
</template>

<style scoped lang="scss">
.VInput {

    &__body {
        position: relative;
        min-height: 3.8rem;
    }

    &__native {
        width: 100%;

        padding: 0.675em 1em;
        border-radius: 5px;
        font-family: inherit;
        -moz-appearance: textfield;
        transition: box-shadow .4s;
        color: var(--black);
        border: 1px solid #ccc;
        border-radius: 5px;

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

        &.is-error {
            border-color: red;
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