<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['save-recipe'])

type Recipe = {
  id?: number
  name: string
  description?: string
  ingredients: string[]
  prepTime?: string
}

// Props for editing existing recipe
const props = withDefaults(defineProps<{ initialRecipe?: Recipe }>(), { initialRecipe: undefined })

// Form state
const name = ref(props.initialRecipe?.name || '')
const description = ref(props.initialRecipe?.description || '')
const prepTime = ref(props.initialRecipe?.prepTime || '')
const ingredients = ref<string[]>(props.initialRecipe?.ingredients || [])
const newIngredient = ref('')

// Add ingredient
const addIngredient = () => {
  if (newIngredient.value.trim()) {
    ingredients.value.push(newIngredient.value.trim())
    newIngredient.value = ''
  }
}

// Remove ingredient
const removeIngredient = (index: number) => {
  ingredients.value.splice(index, 1)
}

// Submit form
const submit = () => {
  if (!name.value.trim()) return

  const recipe: Recipe = {
    id: props.initialRecipe?.id,
    name: name.value.trim(),
    description: description.value.trim(),
    prepTime: prepTime.value.trim(),
    ingredients: ingredients.value
  }

  // Emit to parent
  const emit = defineEmits<{ 'save-recipe': [recipe: Recipe] }>()
  emit('save-recipe', recipe)
}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="recipe-form space-y-4"
  >
    <div>
      <label class="block font-medium">Recipe Name</label>
      <input
        v-model="name"
        type="text"
        class="w-full p-2 border rounded"
        placeholder="e.g. Spaghetti Bolognese"
        required
      />
    </div>

    <div>
      <label class="block font-medium">Description (Optional)</label>
      <textarea
        v-model="description"
        class="w-full p-2 border rounded"
        rows="2"
        placeholder="Add a short description..."
      ></textarea>
    </div>

    <div>
      <label class="block font-medium">Prep Time (Optional)</label>
      <input
        v-model="prepTime"
        type="text"
        class="w-full p-2 border rounded"
        placeholder="e.g. 30 min"
      />
    </div>

    <div>
      <label class="block font-medium">Ingredients</label>
      <div class="flex gap-2 mb-2">
        <input
          v-model="newIngredient"
          type="text"
          class="flex-1 p-2 border rounded"
          placeholder="e.g. Tomato"
        />
        <button
          type="button"
          @click="addIngredient"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul class="space-y-1">
        <li
          v-for="(ing, i) in ingredients"
          :key="i"
          class="flex justify-between items-center p-2 bg-gray-100 rounded"
        >
          <span>{{ ing }}</span>
          <button
            type="button"
            @click="removeIngredient(i)"
            class="text-red-500"
          >✕</button>
        </li>
      </ul>
    </div>

    <div class="flex gap-3">
      <button
        type="submit"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Recipe
      </button>
      <button
        type="button"
        @click="$emit('save-recipe', null)"
        class="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<style scoped>
.recipe-form input,
textarea {
  font-size: 1rem;
}
</style>