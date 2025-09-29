<script setup lang="ts">
const modelValue = defineModel<string | number | null>()

interface Props {
    id?: string,
    type?: string,
    error?: string,
    label?: string,
    placeholder?: string,
    name?: string,
    isPassword?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
})

const isActive = ref(false)
function handleClick() {
    if (!props.isPassword) return
    isActive.value = !isActive.value
}
</script>

<template>
    <div class="VInput">
        <div class="VInput__body">
            <input class="VInput__native" :class="{ 'is-error': error, 'has-label': label }" v-model="modelValue"
                :type="type" :placeholder="placeholder" :id="id" :name="name" />
            <div class="VInput__icon" v-show="$slots.icon" :class="{ 'is-active': isActive }" @click="handleClick">
                <slot name="icon"></slot>
            </div>

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

    &__icon {
        position: absolute;
        right: var(--gap-sm);
        top: 50%;
        translate: 0 -50%;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        color: var(--main-3);
        transition: color .4s;

        &.is-active {
            color: var(--main-1);
            cursor: pointer;
        }

        @include hover {
            color: var(--main-1);
        }
    }

    &__native {
        width: 100%;
        height: 3.6rem;
        padding: 0.675em 1em;
        border-radius: 5px;
        -moz-appearance: textfield;
        transition: box-shadow .4s;
        color: var(--black);
        border: 1px solid var(--border-color);
        border-radius: 5px;
        font-family: inherit;
        font-size: 1.4rem;

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