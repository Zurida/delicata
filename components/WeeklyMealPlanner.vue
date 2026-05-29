<script setup lang="ts">
import { ref, computed } from 'vue'
import VSelect from '@/components/common/VSelect.vue'
import type { TOption } from '~/types/option';
import type { TRecipe } from '~/types/recipe'

// Generate time options in 15-minute intervals starting from 05:00
const generateTimeOptions = (): TOption[] => {
  const options: TOption[] = []
  for (let hour = 5; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      options.push({
        id: timeString,
        title: timeString
      })
    }
  }
  return options
}


// Meal entry with time
type MealEntry = {
  recipeId: number
  time: string // Use string format 'HH:mm' for time
}

// Props: receive recipes from parent
const props = defineProps<{
  recipes: TRecipe[]
}>()

// Transform recipes array to TOption format
const recipeOptions = computed<TOption[]>(() => {
  return props.recipes.map(recipe => ({
    id: recipe?.id ?? '',
    title: recipe?.title
  }))
})

// Days of the week
const days = [
  'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
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
const selectedDay = ref<string>('Понедельник')

// Selected recipe and time for new meal
const selectedRecipeId = ref<number | null>(null)
const mealTime = ref<string>('08:00')

// Generate time options in 15-minute intervals
const timeOptions = computed<TOption[]>(() => {
  return generateTimeOptions()
})

// Computed: get recipe by ID
const getRecipe = (id: number) => {
  return props.recipes.find(r => r.id === id) || null
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
    alert('Данный рецепт уже добавлен на выбранное время')
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
  <div class="meal-planner">

    <div class="row">
      <div class="meal-planner__row">
        <label>⏰ Выбрать время</label>
        <VSelect
          v-model="mealTime"
          :options="timeOptions"
          selectName="timePicker"
        />
      </div>
      <!-- Day Picker -->
      <div class="meal-planner__row">
        <label>📅 Выбрать день</label>
        <VSelect
          v-model="selectedDay"
          :options="daysOptions"
          selectName="dayPicker"
        />
      </div>

      <!-- Recipe Selection -->
      <div class="meal-planner__row">
        <label>🍲 Выбрать рецепт</label>
        <VSelect
          v-model="selectedRecipeId"
          :options="recipeOptions"
          selectName="recipePicker"
        />
      </div>


    </div>
    <button
      @click="assignRecipeToDay"
      :disabled="!selectedRecipeId"
      class="btn-add"
    >
      <IconsIconPlus></IconsIconPlus>Добавить
    </button>
    <!-- Weekly Plan Grid -->
    <div class="meal-planner__grid">
      <div class="week-grid">
        <div
          v-for="day in days"
          :key="day"
          class="week-grid__day"
        >

          <h3>{{ day }}</h3>

          <div class="week-grid__meals">
            <div
              v-for="(meal, index) in mealPlan[day]"
              :key="index"
              class="meal-item"
            >
              <nuxt-link
                :to="`recipe/${meal.recipeId}`"
                class="meal-item__link"
              >
                <div class="meal-item__time">{{ meal.time }}</div>

                <div class="meal-item__name">{{ getRecipe(meal.recipeId)?.title }}</div>

                <button
                  @click="removeRecipeFromDay(day, index)"
                  class="meal-item__remove"
                >
                  ✕
                </button>
              </nuxt-link>
            </div>

            <div
              v-if="!mealPlan[day].length"
              class="meal-item__empty"
            >
              Пусто
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.meal-planner {
  min-height: calc(100vh - var(--header-height) - var(--gap) * 4);
  margin-top: var(--gap);
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Advent Pro',
    sans-serif;

  .row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
    width: 100%;
    margin-bottom: var(--gap);
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.time {
      align-items: flex-start;
    }

    input[type="time" i]::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }

    input[type="time" i]::-webkit-calendar-picker-indicator:hover {
      background-color: #f0f0f0;
    }
  }

  label {
    font-size: var(--fs-base);
  }

  .btn-add {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(90deg, var(--main-1), #d87a6a);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background: linear-gradient(90deg, #d15a4a, #c05a4a);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: .4rem;
    }
  }

  &__grid {
    padding: 1.5rem;
  }

  .week-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;

    &__day {
      text-align: center;

      h3 {
        font-weight: 600;
        color: var(--black);
        text-transform: uppercase;
        font-size: 1.4rem;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }
    }
  }

  .meal-item {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
    padding: 0.75rem;
    font-size: 1.4rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: calc(var(--gap) / 2);
    }

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    &__link {
      display: flex;
      align-items: center;
    }

    &__name {
      font-weight: 500;
      color: var(--main-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__time {
      min-width: 4rem;
      font-weight: 500;
      color: var(--main-1);
    }

    &__remove {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 20px;
      height: 20px;
      background: var(--main-1);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: #d15a4a;
      }
    }

    &:hover &__remove {
      opacity: 1;
    }
  }

  .meal-item__empty {
    font-size: 1.2rem;
    color: #aaa;
    font-style: italic;
    padding: 0.5rem 0;
  }
}
</style>