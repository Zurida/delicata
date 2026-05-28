<script setup lang="ts">
import { ref } from 'vue'

// Use the same Recipe type
interface Recipe {
  id: number
  name: string
  description?: string
  ingredients: string[]
  prepTime?: string
}

// Reactive list of recipes
const recipes = ref<Recipe[]>([
  { id: 1, name: 'Pasta Carbonara', ingredients: ['Pasta', 'Eggs', 'Bacon'], prepTime: '20 min' },
  { id: 2, name: 'Grilled Chicken Salad', ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Olive Oil'], prepTime: '25 min' },
])

// Next ID generator
const nextId = ref(3)

// Show form modal
const showForm = ref(false)
const editingRecipe = ref<Recipe | undefined>(undefined)

// Add or update recipe
const saveRecipe = (recipe: Recipe) => {
  if (editingRecipe.value) {
    // Update existing
    const index = recipes.value.findIndex(r => r.id === recipe.id)
    if (index !== -1) recipes.value[index] = recipe
  } else {
    // Add new
    recipe.id = nextId.value++
    recipes.value.push(recipe)
  }
  closeModal()
}

// Open form to add new recipe
const addNewRecipe = () => {
  editingRecipe.value = undefined
  showForm.value = true
}

// Open form to edit existing recipe
const editRecipe = (recipe: Recipe) => {
  editingRecipe.value = recipe
  showForm.value = true
}

// Close modal
const closeModal = () => {
  showForm.value = false
  editingRecipe.value = undefined
}
</script>

<template>
  <div class="meal-planner ">
    <!-- <div class="meal-planner__header">
      <h2>🍽️ План</h2>
    </div> -->

    <WeeklyMealPlanner :recipes="recipes" />
  </div>
</template>

<style lang="scss">
.meal-planner {
  padding: var(--gap);
}
</style>