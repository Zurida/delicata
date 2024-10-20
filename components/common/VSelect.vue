<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside'
import type { TOption } from '~/types/options';

const props = defineProps<{
    options: TOption[] | null,
}>()

const model = defineModel()

const componentRef = ref()
const excludeRef = ref()
const isActive = ref(false)

const selectedOption = ref()

function handleClick(option: TOption) {
    selectedOption.value = option.text
    isActive.value = false
}

useClickOutside(
    componentRef,
    () => {
        isActive.value = false
    },
    excludeRef
)

</script>

<template>
    <div class="VSelect" :class="{ active: isActive }">
        <button type="button" ref="excludeRef" class="select-button" role="combobox" aria-label="select button"
            aria-haspopup="listbox" :aria-expanded="isActive" aria-controls="select-dropdown"
            @click="isActive = !isActive">
            <span class="selected-value">{{ selectedOption || 'Выбрать' }}</span>
            <i class="arrow right"></i>
        </button>

        <ul class="select-dropdown" role="listbox" id="select-dropdown" ref="componentRef" v-if="options">
            <li role="option" v-for="(option, index) in options" @click="handleClick(option)">
                <input type="radio" :id="`option-${option.value}-${index}`" :value="option.value" v-model="model" />
                <label :for="`option-${option.value}-${index}`">{{ option.text }}</label>
            </li>
        </ul>
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
        min-height: 3.8rem;
        font-size: inherit;
        background-color: #fff;
        padding: 0.675em 1em;
        border-radius: 0.25rem;
    }

    .arrow {
        border: solid var(--black);
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
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

        &:focus-within {
            box-shadow: 0 10px 25px rgba(94, 108, 233, 0.6);
        }

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
}
</style>