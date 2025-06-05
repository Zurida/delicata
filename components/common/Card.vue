<script setup lang="ts">
import { formatDate } from '~/assets/js/utils';
import type { TRecipe } from '~/types/recipe';

defineProps<{
  card: TRecipe,
  to: string,
}>()
</script>

<template>
  <div class="card">
    <div class="card__actions">

      <button type="button" class="card__btn" @click="$router.push(`/recipe/${card.id}/edit`)">
        <IconsIconEdit />
      </button>
    </div>
    <NuxtLink :to="to" class="card__link">

      <div class="card__image"></div>
      <div class="card__description">
        <div class="card__date">Добавлено: {{ formatDate(card.created_at) }}</div>
        <h3 class="card__title" :title="card.title">{{ card.title }}</h3>
        <div class="card__tags">
          <CommonVTag v-for="tag in card.tags" :key="tag.title" :label="tag.title" :tag="tag" is-disabled />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  background-color: var(--white);
  border-radius: var(--border-radius);

  &__link {
    display: inline-block;
    width: 100%;
    transition: box-shadow 0.4s;

    &:hover {
      box-shadow: 0 0 20px 0 rgba(150, 150, 150, 0.623);
    }
  }



  &__actions {
    display: flex;
    position: absolute;
    top: .4rem;
    right: .4rem;
    z-index: 1;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    padding: 0.4rem;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 10%;
    cursor: pointer;
    transition: color .4s;

    &:hover {
      color: var(--main-1);
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 1.5;
    background-color: #9ea4a7;
    background-size: cover;
    background-position: center;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  &__date {
    margin-bottom: 1rem;
    font-size: var(--fs-micro);
    color: #797979;
  }

  &__description {
    padding: var(--gap);
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    line-height: 1.2;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__tags {
    display: flex;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0.1rem;
      height: 5px;
      /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(150, 150, 150, 0.623);
      border-radius: 20px;
      border: 3px solid transparent;
    }
  }


  .VTag {
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
  }
}
</style>