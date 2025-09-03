<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside'
import type { TOption } from '~/types/option';

const props = defineProps<{
    options: TOption[] | null,
    selectName: string,
    checked?: boolean
    error?: string
}>()
const model = defineModel()

const componentRef = ref()
const buttonRef = ref()
const isActive = ref(false)

const selectedOption = ref({ title: '', id: 0 })

function handleClick(option: TOption) {
    selectedOption.value.title = option.title
    isActive.value = false
}

useClickOutside(
    componentRef,
    () => {
        isActive.value = false
    },
    buttonRef
)

const title = computed(() => {
    return props.options?.find(option => {
        return option.id === model.value
    })?.title || 'Выбрать'
})

</script>

<template>
    <div class="VSelect" :class="{ active: isActive }">
        <button type="button" ref="buttonRef" class="select-button" role="combobox" aria-label="select button"
            aria-haspopup="listbox" :aria-expanded="isActive" aria-controls="select-dropdown"
            @click="isActive = !isActive" :class="{ 'is-error': error }">
            <span class="selected-value">{{ title }}</span>
            <i class="arrow right"></i>
        </button>

        <ul class="select-dropdown" role="listbox" id="select-dropdown" ref="componentRef">
            <li role="option" v-for="option in options">
                <input type="radio" :id="`${selectName}-${option.id}`" :value="option.id" v-model="model" />
                <label :for="`${selectName}-${option.id}`" @click="handleClick(option)">{{ option.title }}</label>
            </li>
        </ul>


        <Transition>
            <p class="VSelect__error" v-if="error">{{ error }}</p>
        </Transition>
    </div>
</template>

<style lang="scss">
.VSelect {
    position: relative;
    max-width: 100%;
    font-size: 1.15rem;
    color: #000;

    .select-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 3.6rem;
        font-size: inherit;
        background-color: #fff;
        padding: 0.675em 1em;
        border-radius: 0.4rem;
        border: 1px solid var(--border-color);

        &.is-error {
            border-color: var(--error);
        }
    }

    .arrow {
        border: solid #2f4f4fc4;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 2px;
        transform: rotate(45deg);
        transition: transform .4s;
    }

    &.active {
        .select-dropdown {
            opacity: 1;
            visibility: visible;
            transform: scaleY(1);
        }

        .arrow {
            transform: rotate(-135deg);
        }
    }

    .select-dropdown {
        position: absolute;
        z-index: 100;
        list-style: none;
        width: 100%;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        max-height: 200px;
        overflow-y: auto;
        transition: 0.5s ease;
        transform: scaleY(0);
        opacity: 0;
        visibility: hidden;

        label {
            display: flex;
            gap: 1rem;
            align-items: center;
            width: 100%;
            padding: 8px 10px;
            cursor: pointer;
            transition: background-color .4s;

            &:hover {
                background-color: #f2f2f2;
            }
        }

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 25px;
        }

        &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 25px;
        }

        input:checked~label {
            background-color: #f2f2f2;
        }

        input:focus~label {
            background-color: #dfdfdf;
        }

        input[type="radio"] {
            position: absolute;
            left: 0;
            opacity: 0;
        }
    }

    &__error {
        font-size: var(--fs-micro);
        color: var(--error);
    }
}
</style>