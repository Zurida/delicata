<script setup lang="ts">
type ListItem = {
    id: number,
    name: string
}

type Category = {
    id: number,
    title: string,
    subcategories: ListItem[]
}

let currentId = ref(0);
let isVisible = ref(true);

const props = defineProps<{
    category: Category,
}>()

const emit = defineEmits<{
    (e: 'click'): void
}>()

function showDropdown() {

}

function setActiveId(id: number) {
    currentId.value = id
    isVisible.value = !isVisible.value;
}
</script>

<template>
    <div class="collapse">
        <div class="collapse__heading" @click="emit('click')">
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

        .collapse__heading {
            color: var(--main-3);
        }
    }

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--gap) var(--gap) var(--gap-small) var(--gap);
        font-size: 1.8rem;
        font-weight: 700;
        transition: color 0.4s;

        &:hover {
            cursor: pointer;
            color: var(--main-3);
        }
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
        font-size: 1.6rem;
        overflow: hidden;
    }
}
</style>