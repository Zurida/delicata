<script setup lang="ts">
const modelValue = defineModel<string | number | null>()

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
        <Transition>
            <p v-if="props.error" class="VInput__error">{{ props.error }}</p>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.VInput {

    &__body {
        position: relative;
    }

    &__native {
        width: 100%;
        height: 3.6rem;
        padding: 0.675em 1em;
        border-radius: 5px;
        font-family: inherit;
        -moz-appearance: textfield;
        transition: box-shadow .4s;
        color: var(--black);
        border: 1px solid var(--border-color);
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
            border-color: var(--error);
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

    &__error {
        font-size: var(--fs-micro);
        color: var(--error);
    }

}
</style>