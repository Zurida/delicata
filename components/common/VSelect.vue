<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside'

const props = defineProps<{
    options: TOption[],
    modelValue: string
}>()

type TOption = {
    id: number | string,
    name: string,
    value: string,
    text: string
}

const isActive = ref(false)

const selectedOption = ref()

function handleClick(option: TOption) {
    selectedOption.value = option.text
    isActive.value = false
}

onMounted(() => {
    // document.addEventListener('click', ($event: Event) => {
    //     console.log($event.target as HTMLInputElement)
    // })
})


const componentRef = ref()
const excludeRef = ref()
const isOpen = ref(true)

useClickOutside(
    componentRef,
    () => {
        isOpen.value = false
    },
    excludeRef
)

</script>

<template>
    <div class="custom-select" ref="custom-select" :class="{ active: isActive }">
        <button ref="excludeRef" class="select-button" role="combobox" aria-label="select button"
            aria-haspopup="listbox" :aria-expanded="isActive" aria-controls="select-dropdown"
            @click="isActive = !isActive">
            <span class="selected-value">{{ selectedOption || 'Выбрать категорию' }}</span>
            <span class="arrow"></span>
        </button>

        <ul class="select-dropdown" role="listbox" id="select-dropdown" ref="componentRef">
            <li role="option" v-for="option in options" @click="handleClick(option)">
                <input type="radio" :value="modelValue" :id="`option-${option.id}`" :name="option.name"
                    @input="$emit('update:modelValue', option.value)" />
                <label :for="`option-${option.id}`">{{ option.text }}</label>
            </li>
        </ul>
    </div>
</template>

<style>
.custom-select {
    position: relative;
    width: 400px;
    max-width: 100%;
    font-size: 1.15rem;
    color: #000;
    margin-top: 3rem;
}

.custom-select .select-button {
    width: 100%;
    font-size: 1.15rem;
    background-color: #fff;
    padding: 0.675em 1em;
    border: 1px solid #caced1;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-select .selected-value {
    text-align: left;
}

.custom-select .arrow {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #000;
    transition: transform ease-in-out 0.3s;
}

.custom-select.active .arrow {
    transform: rotate(180deg);
}

.custom-select.active .select-dropdown {
    opacity: 1;
    visibility: visible;
    transform: scaleY(1);
}

.select-dropdown {
    position: absolute;
    list-style: none;
    width: 100%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    max-height: 200px;
    overflow-y: auto;
    transition: 0.5s ease;
    transform: scaleY(0);
    opacity: 0;
    visibility: hidden;
}

.select-dropdown:focus-within {
    box-shadow: 0 10px 25px rgba(94, 108, 233, 0.6);
}

.select-dropdown li {
    position: relative;
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.select-dropdown li label {
    width: 100%;
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.select-dropdown::-webkit-scrollbar {
    width: 7px;
}

.select-dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 25px;
}

.select-dropdown::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
}

.select-dropdown li:hover,
.select-dropdown input:checked~label {
    background-color: #f2f2f2;
}

.select-dropdown input:focus~label {
    background-color: #dfdfdf;
}

.select-dropdown input[type="radio"] {
    position: absolute;
    left: 0;
    opacity: 0;
}
</style>