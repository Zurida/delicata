<script setup lang="ts">

type TListItem = {
    id: number,
    name: string
}

type TCategory = {
    id: number,
    title: string,
    subcategories?: TListItem[]
}

let currentId = ref(0);

const props = defineProps<{
    category: TCategory,
}>()

const emit = defineEmits<{
    (e: 'click'): void
}>()

function setActiveId(id: number) {
    currentId.value = id
}
</script>

<template>
    <div class="collapse">
        <div class="collapse__item" @click="emit('click')">
            <div class="collapse__title">{{ category.title }}</div>
            <!-- <span class="collapse__icon"></span> -->
        </div>

        <div class="collapse__dropdown">
            <ul class="collapse__list">
                <CollapseItem v-for="item in category.subcategories" :item=item
                    :class="{ 'is-active': item.id === currentId }" @click="setActiveId(item.id)" />
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collapse {
    width: 100%;

    &.is-visible {
        .collapse__dropdown {
            grid-template-rows: 1fr;
        }

        .collapse__item {
            &:after {
                transform: scaleY(1) translateY(0);
            }
        }
    }

    &__item {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--gap) / 1.4) var(--gap);
        font-size: 1.8rem;
        font-weight: 700;
        transition: color 0.4s;
        overflow: hidden;

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-color: #2f4f4f;
            transform: scaleY(0) translateX(-102%);
            transition: all 0.4s;
            z-index: 1;
            border-radius: 0;
        }

        &:hover {
            cursor: pointer;
            color: var(--main-3);
        }
    }

    &__title {
        position: relative;
        z-index: 2;
    }

    &__icon {
        display: grid;
        place-items: center;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 1;
        text-align: center;
        border-radius: 0.3rem;
        background-color: var(--main-2);
        transition: rotate 0.3s;
    }

    &__dropdown {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.4s;
    }

    &__list {
        font-size: var(--fs-base);
        overflow: hidden;
    }
}
</style>