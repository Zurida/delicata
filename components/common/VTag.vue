<script setup>
const props = defineProps({
    modelValue: { type: [Array] },
    val: { type: [String] } | { type: [Number] },
    label: { type: String },
    inactive: { type: Boolean },
    filled: { type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

</script>

<template>
    <div class="VTag">
        <div :class="{ 'VTag--inactive': inactive, 'VTag--filled': filled }">
            <input type="checkbox" :id="`tag-${label}`" v-model="model" :value="val">
            <label :for="`tag-${label}`" class="VTag__label">{{ label }}</label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.VTag {
    position: relative;
    display: inline-flex;
    align-items: center;

    input {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;

        &:checked+label {
            background-color: var(--main-2);
            color: var(--white);
        }

    }

    label {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        height: 2.2rem;
        padding-left: var(--gap-sm);
        padding-right: var(--gap-sm);
        border: .5px solid var(--main-2);
        background-color: transparent;
        color: var(--main-2);
        transition: background-color .4s;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
            background-color: var(--white);
        }
    }

    &--inactive {
        pointer-events: none;
    }

    &--filled {
        label {
            // background-color: #296f6f;
            // background-color: #f9573826;
            background-color: #e9e9e9;
            border-color: #e9e9e9;
            height: 1.8rem;
            color: var(--black);
            padding-left: .4rem;
            padding-right: .4rem;
            // font-size: 10px;
        }
    }
}
</style>