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
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">🍽️ Weekly Meal Planner</h1>

    <!-- Button to Add New Recipe -->
    <button
      @click="addNewRecipe"
      class="mb-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
    >
      + Add New Recipe
    </button>

    <!-- Recipe List (Editable) -->
    <div
      v-if="recipes.length"
      class="mb-8"
    >
      <h2 class="text-xl font-semibold mb-3">Your Recipes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="border rounded-lg p-4 bg-white shadow-sm"
        >
          <h3 class="font-bold text-lg">{{ recipe.name }}</h3>
          <p
            class="text-sm text-gray-600"
            v-if="recipe.description"
          >{{ recipe.description }}</p>
          <p class="text-sm text-gray-500"><strong>Time:</strong> {{ recipe.prepTime }}</p>
          <p class="text-sm text-gray-500"><strong>Ingredients:</strong> {{ recipe.ingredients.join(', ') }}</p>
          <button
            @click="editRecipe(recipe)"
            class="text-xs mt-2 text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Weekly Meal Planner -->
    <WeeklyMealPlanner
      :recipes="recipes"
      class="mt-6"
    />

    <!-- Modal for Recipe Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
        @click="e => e.stopPropagation()"
      >
        <h2 class="text-2xl font-bold mb-4">
          {{ editingRecipe ? 'Edit Recipe' : 'Create New Recipe' }}
        </h2>
        <RecipeForm
          :initial-recipe="editingRecipe"
          @save-recipe="saveRecipe"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
}
</style>