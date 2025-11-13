<script lang="ts" setup>
import type { TExistingCategory } from '~/types/category'
import type { TMeasure } from '~/types/measure'
import type { TTag } from '~/types/tag'

defineProps<{
    items: TExistingCategory[] | TMeasure[] | TTag[] | null,
    title: string,
}>()

const emit = defineEmits(['delete', 'submit'])

const modelValue = defineModel<string>()
</script>

<template>
    <div class="wrapper">
        <h4>
            {{ title }}
        </h4>
        <ul class="form__list" v-if="items?.length">
            <li v-for="item in items" class="form__item">

                <p>{{ item.title }}</p>
                <button @click="$emit('delete', item)" class="form__delete">
                    <IconsIconDelete />
                </button>

            </li>
        </ul>
        <p v-else class="empty">Пока ничего не добавлено </p>
        <form class="form" @submit.prevent="$emit('submit')">

            <div class="form__actions">
                <CommonVInput placeholder="Введите категорию" v-model="modelValue"></CommonVInput>
                <CommonVButton type="submit" class="form__submit">Добавить</CommonVButton>
            </div>

        </form>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    margin-top: var(--gap);
    margin-bottom: var(--gap);
    padding: var(--gap);
    background-color: var(--white);
    border-radius: var(--border-radius);
}

h4 {
    margin-bottom: var(--gap);
    line-height: 1;
}

.empty {
    color: var(--main-3);
    font-size: 1.4rem;
    margin-bottom: var(--gap-sm);
}

.form__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.form {
    .VInput {
        width: 100%;
        margin-right: var(--gap-sm);
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: calc(var(--fs-lg) * 1.2);
        margin-bottom: var(--gap);
    }

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        width: max-content;
        // gap: var(--gap-sm);
        margin-right: var(--gap-sm);
        padding: .2rem;
        border-radius: var(--border-radius);
    }

    &__delete {
        @include center;

        width: 2.4rem;
        height: 100%;
        margin-left: var(--gap-sm);
        transition: color 0.2s, background-color 0.2s;
        border-radius: var(--border-radius);

        &:hover {
            background-color: var(--main-1);
            color: var(--white);
        }
    }

    &__submit {
        margin-top: var(--gap);
    }
}
</style>