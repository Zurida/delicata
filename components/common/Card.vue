<script setup lang="ts">
type Card = {
  id: number,
  name: string;
  date: string;
  tags: string[];
  img: string;
}

defineProps<{
  card: Card,
  to: string,
}>()



</script>

<template>
  <NuxtLink :to="to" class="card">
    <div class="card__image" :style="{ backgroundImage: `url(${card.img})` }"></div>
    <div class="card__description">
      <div class="card__date">Дата добавления: {{ card.date }}</div>
      <h3 class="card__title" :title="card.name">{{ card.name }}</h3>
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
  transition: box-shadow 0.4s;

  /* color: var(--black-soft); */
  &:hover {
    box-shadow: 0 0 20px 0 rgba(150, 150, 150, 0.623);
  }

  &__image {
    width: 100%;
    aspect-ratio: 1.5;
    background-size: cover;
    background-position: center;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  &__date {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #797979;
  }

  &__description {
    padding: var(--gap);
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 1.8rem;
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
  letter-spacing: 0.05rem;
  color: var(--black-soft);

  &:not(:last-child) {
    margin-right: 0.6rem;
  }
}
</style>