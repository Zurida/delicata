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
  tags: ['Блюда из яиц', 'Завтраки'],
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

<style scoped>
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
}

.tag {
  display: inline-flex;
  padding: 0.6rem;
  border-radius: var(--border-radius);
  background-color: var(--main-3);
  font-size: .8rem;
  line-height: 1;
  color: var(--black-soft);

  &:first-child {
    margin-right: 0.6rem;
  }
}
</style>