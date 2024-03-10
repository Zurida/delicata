<script setup lang="ts">
type ListItem = {
    id: number,
    name: string
}
type list = ListItem[];


let isVisible = ref(true);
let currentId = ref(0)

function showDropdown() {
    isVisible.value = !isVisible.value;
}

function setActiveId(id: number) {
    console.log(id)
    currentId.value = id
}

const list: list = [{ id: 0, name: 'Из яиц' }, { id: 1, name: 'Из творога' }, { id: 2, name: 'Из муки' }, { id: 3, name: 'Из овощей' }]


</script>

<template>
    <div class="collapse" :class="{ 'is-visible': isVisible }">
        <div class="collapse__heading" @click="showDropdown">
            <div class="collapse__title">Завтраки</div>
            <!-- <span class="collapse__icon"></span> -->
        </div>

        <div class="collapse__dropdown">
            <ul class="collapse__list">
                <CollapseItem v-for="(item, i) in list" :item=item :class="{ 'is-active': item.id === currentId }"
                    @click="setActiveId(item.id)" />
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