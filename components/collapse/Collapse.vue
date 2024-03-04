<script setup>
let isVisible = ref(true);
let isActive = ref(true);

function showDropdown() {
    isVisible.value = !isVisible.value;
}

function setActiveItem() {
    isActive.value = !isActive.value;
}

const list = ['Из яиц', 'Из творога', 'Из муки', 'Из овощей']

</script>

<template>
    <div class="collapse" :class="{ 'is-visible': isVisible }">
        <div class="collapse__heading" @click="showDropdown">
            <div class="collapse__title">Завтраки</div>
            <!-- <span class="collapse__icon"></span> -->
        </div>

        <div class="collapse__dropdown">
            <ul class="collapse__list">
                <li v-for="item in list" @click="setActiveItem" :class="{ 'is-active': isActive }">{{ item }}</li>
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

        li {
            padding: calc(var(--gap-small) / 3) 0;
            transition: color 0.4s;

            &.is-active {
                color: var(--main-3)
            }

            &:hover {
                cursor: pointer;
                opacity: 0.8;
            }
        }
    }
}
</style>