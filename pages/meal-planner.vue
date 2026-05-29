<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData } from '#app'
import type { TRecipe } from '~/types/recipe'

// Fetch recipes from API
const { data: recipes, pending, error } = useAsyncData<TRecipe[]>('recipes', () =>
  $fetch('/api/recipes')
)
</script>

<template>
  <div class="meal-planner">
    <div v-if="pending">
      Загрузка рецептов...
    </div>

    <div v-else-if="error">
      Ошибка загрузки рецептов: {{ error }}
    </div>

    <div v-else-if="!recipes || recipes.length === 0">
      Нет доступных рецептов
    </div>

    <div v-else>
      <WeeklyMealPlanner :recipes="recipes || []" />
    </div>
  </div>
</template>

<style lang="scss">
.meal-planner {
  padding: var(--gap);
  font-size: var(--fs-base);
}
</style>