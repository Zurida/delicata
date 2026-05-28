<script setup lang="ts">
import { ref, computed } from 'vue'
import VSelect from '@/components/common/VSelect.vue'
import type { TOption } from '~/types/option';


// Define Recipe type
type Recipe = {
  id: number
  name: string
  description?: string
  ingredients: string[]
  prepTime?: string
}

// Meal entry with time
type MealEntry = {
  recipeId: number
  time: string // Use string format 'HH:mm' for time
}

// Props: receive recipes from parent
const props = defineProps<{
  recipes: Recipe[]
}>()

// Use recipes from props
const recipes = computed(() => props.recipes)

// Transform recipes array to TOption format
const recipeOptions = computed<TOption[]>(() => {
  return recipes.value.map(recipe => ({
    id: recipe.id,
    title: recipe.name
  }))
})

// Days of the week
const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

// Transform days array to TOption format
const daysOptions = computed<TOption[]>(() => {
  return days.map(day => ({
    id: day,
    title: day
  }))
})

// Weekly meal plan: maps day to array of meals with time
const mealPlan = ref<Record<string, MealEntry[]>>({ ...days.reduce((acc, day) => ({ ...acc, [day]: [] }), {} as Record<string, MealEntry[]>) })

// Currently selected day in the picker
const selectedDay = ref<string>('Monday')

// Selected recipe and time for new meal
const selectedRecipeId = ref<number | null>(null)
const mealTime = ref<string>('08:00')

// Computed: get recipe by ID
const getRecipe = (id: number) => {
  return recipes.value.find(r => r.id === id) || null
}

// Add recipe to a day with time
const assignRecipeToDay = () => {
  if (!selectedRecipeId.value) return
  
  // Validate time format (HH:mm)
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!timeRegex.test(mealTime.value)) {
    alert('Please enter a valid time in HH:mm format')
    return
  }
  
  // Check if this recipe is already scheduled at this time on this day
  const alreadyExists = mealPlan.value[selectedDay.value].some(
    meal => meal.recipeId === selectedRecipeId.value && meal.time === mealTime.value
  )
  
  if (alreadyExists) {
    alert('This recipe is already scheduled at this time on this day')
    return
  }
  
  mealPlan.value[selectedDay.value] = [
    ...mealPlan.value[selectedDay.value],
    { recipeId: selectedRecipeId.value, time: mealTime.value }
  ]
  // Sort by time (convert to Date objects for proper sorting)
  mealPlan.value[selectedDay.value].sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a.time}`)
    const timeB = new Date(`2000-01-01T${b.time}`)
    return timeA.getTime() - timeB.getTime()
  })
}

// Remove recipe from day
const removeRecipeFromDay = (day: string, index: number) => {
  mealPlan.value[day] = mealPlan.value[day].filter((_, i) => i !== index)
}

</script>

<template>
  <div class="meal-planner mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-5 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800">🍽️ Weekly Meal Plan</h2>
    </div>

    <!-- Day Picker -->
    <div class="p-6 bg-gray-50 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row sm:items-end gap-4">
        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">📅 Select Day</label>
          <VSelect
            v-model="selectedDay"
            :options="daysOptions"
            selectName="dayPicker"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Recipe Selection -->
    <div class="p-6 space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Add Recipe to <span class="text-rose-600 font-bold">{{ selectedDay
          }}</span></h3>

      <div class="flex flex-col sm:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">🍲 Recipe</label>
          <VSelect
            v-model="selectedRecipeId"
            :options="recipeOptions"
            selectName="recipePicker"
            class="w-full"
          />
        </div>

        <div class="w-full sm:w-auto">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">⏰ Time</label>
          <input
            v-model="mealTime"
            type="time"
            class="w-full sm:w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>

        <button
          @click="assignRecipeToDay"
          :disabled="!selectedRecipeId"
          class="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          ➕ Add to Day
        </button>
      </div>
    </div>

    <!-- Weekly Plan Grid -->
    <div class="p-6">
      <div class="grid grid-cols-1 sm:grid-cols-7 gap-3">
        <div
          v-for="day in days"
          :key="day"
          class="text-center"
        >
          <h3 class="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">{{ day.slice(0, 3) }}</h3>

          <div class="space-y-2 min-h-12">
            <div
              v-for="(meal, index) in mealPlan[day]"
              :key="index"
              class="group relative bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-3 text-xs shadow-sm hover:shadow transition-all cursor-default"
            >
              <div class="font-semibold text-rose-800 truncate">{{ getRecipe(meal.recipeId)?.name }}</div>
              <div class="text-rose-600 font-medium">{{ meal.time }}</div>

              <button
                @click="removeRecipeFromDay(day, index)"
                class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600 shadow-sm"
              >
                ✕
              </button>
            </div>

            <div
              v-if="!mealPlan[day].length"
              class="text-gray-400 text-xs italic py-1.5"
            >
              empty
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meal-planner {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
</style>