<script setup lang="ts">
const model = defineModel()
</script>

<template>
    <div class="VInput">
        <input type="text" class="VInput__native" v-model="model" />
        <label class="VInput__label" v-if="$slots.label">
            <slot name="label" />
        </label>
    </div>
</template>

<style scoped lang="scss">
.VInput {
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