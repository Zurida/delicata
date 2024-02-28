<script setup lang="ts">
type Card = {
  name: string;
  date: string;
  tags: string[];
  img: string;
}

const card: Card = {
  name: 'Тост без авокадо',
  date: '20.02.2020',
  tags: ['Блюда из яиц', 'Завтраки', 'Блюда из яиц', 'Блюда из яиц', 'Блюда из яиц'],
  img: '/img/media.png'
}
</script>

<template>
  <NuxtLink to="/" class="card">
    <div class="card__image" :style="{ backgroundImage: `url(${card.img})` }"></div>
    <div class="card__description">
      <div class="date">Дата добавления: {{ card.date }}</div>
      <h3 class="card__title">{{ card.name }}</h3>
      <div class="card__tags">
        <span class="tag" v-for="tag in card.tags">{{ tag }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card {
  display: inline-block;
  background-color: var(--white);
  border-radius: var(--border-radius);
  /* color: var(--black-soft); */

  &__image {
    width: 100%;
    aspect-ratio: 1;
    background-size: cover;
    background-position: center;
  }

  &__description {
    padding: var(--gap);
  }

  &__title {
    font-size: 2.4rem;
    font-weight: bold;
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
}

.tag {
  display: inline-flex;
  flex-shrink: 0;
  margin-bottom: .6rem;
  padding: 0.6rem;
  border-radius: var(--border-radius);
  background-color: var(--main-3);
  font-size: .8rem;
  line-height: 1;
  color: var(--black-soft);

  &:not(:last-child) {
    margin-right: 0.6rem;
  }
}
</style>