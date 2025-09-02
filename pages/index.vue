<script setup lang="ts">
import type { TRecipe } from '~/types/recipe';
import type { TTag } from '~/types/tag';

const categoryStore = useCategoryStore()

definePageMeta({
  middleware: ['auth'],
});


const { data: recipes } = await useFetch<TRecipe[]>('/api/recipes')
const { data: tags } = await useFetch<TTag[]>('/api/tags')


const currentId = ref(0);
const cards = ref<TRecipe[] | null>(recipes.value)
const isLoading = ref(false)
const filterData = reactive<TFilter>({
  title: '',
  tags: []
})


type TFilter = {
  title: string;
  tags: string[];
}

async function fetchRecipes(categoryId: number) {
  try {
    if (!categoryId && filterData.tags.length === 0) {
      cards.value = recipes.value
    }
    isLoading.value = true

    const response = await $fetch<TRecipe[]>(`/api/recipes`, {
      query: {
        category_id: categoryId ? categoryId : '',
        'tag_ids[]': filterData.tags,
        title: filterData.title,
      }
    })

    cards.value = response
    isLoading.value = false

  } catch (error) {
    console.log(error)
  }
}

async function setActiveId(categoryId: number) {
  if (currentId.value === categoryId) { return }
  currentId.value = categoryId
  await fetchRecipes(currentId.value)
}

async function handleRecipesReset() {
  if (currentId.value !== 0) {
    currentId.value = 0
    await fetchRecipes(currentId.value)
  }
}

async function handleTagsReset() {
  if (!filterData.tags.length) { return }
  filterData.tags = []
  await fetchRecipes(currentId.value)
}

async function handleTitleReset() {
  if (!filterData.title.length) { return }
  filterData.title = ''
  await fetchRecipes(currentId.value)
}

async function handleTagsChange() {
  await fetchRecipes(currentId.value)
}

async function handleTitleSubmit() {
  if (filterData.title === '') { return }
  await fetchRecipes(currentId.value)
}
</script>

<template>
  <div class="home">
    <div class="home__content">
      <aside class="aside reverse">
        <h4>Категории</h4>
        <div class="aside__container">
          <Collapse :category="{ id: 0, title: 'Все рецепты' }" @click="handleRecipesReset" :class="{
            'is-visible': currentId === 0
          }"></Collapse>
          <Collapse v-for="category in categoryStore.categories" :category="category" :class="{
            'is-visible': category.id === currentId
          }" @click="setActiveId(category.id)" />
        </div>
        <div class="aside__actions">
          <CommonVButton to="/create" class="aside__btn">
            <IconsIconAdd />
            <span>Добавить рецепт</span>
          </CommonVButton>
        </div>
      </aside>
      <div class="main">
        <CommonVOverlay :is-visible="isLoading">
          <CommonVLoader />
        </CommonVOverlay>

        <!-- <ul class="main__nav">
          <li>Мои рецепты</li>
          <li>Все рецепты</li>
        </ul> -->
        <div class="filter">
          <form class="search" @submit.prevent="handleTitleSubmit">
            <div class="search__field">
              <CommonVInput v-model="filterData.title" placeholder="Найти рецепт"></CommonVInput>

              <div class="search__btns">
                <button type="submit" class="search__btn" :disabled="!filterData.title.length">
                  <span>Найти</span>
                  <IconsIconSearch class="search__icon" />
                </button>

                <button class="search__btn" @click="handleTitleReset" :disabled="!filterData.title.length">
                  <span>Очистить</span>
                  <IconsIconClose class="search__icon" />
                </button>
              </div>
            </div>
          </form>

          <div class="tags">
            <div class="tags__list">
              <CommonVTag tag="Завтрак" :is-active="false" :label="tag.title" v-for="tag in tags"
                v-model="filterData.tags" :val="tag.id" @change="handleTagsChange" />
            </div>

            <CommonVButton @click="handleTagsReset" small :disabled="!filterData.tags.length">Сбросить теги
            </CommonVButton>
          </div>

        </div>

        <div class="cards">
          <div class="cards__list" v-if="cards && cards.length">
            <CommonCard v-for="card in cards" :card="card" :to="`/recipe/${card.id}`" :key="`card-${card.id}`" />
          </div>
          <p v-else>Таких шедевров еще не готовили, но все впереди!</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.home {
  position: relative;

  &__content {
    display: flex;
    min-height: calc(100vh - var(--header-height));
  }
}

h4 {
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: var(--gap);
}

.aside {
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 19rem;
  height: calc(100vh - var(--header-height));
  padding-top: var(--gap);
  background-color: var(--black);

  h4 {
    padding-left: var(--gap);
    padding-right: var(--gap);
    padding-bottom: var(--gap-sm);
    text-transform: uppercase;
    color: var(--white);
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: var(--gap);
  }

  &__btn {
    display: inline-flex;
    font-size: var(--fs-small);
    margin-left: auto;
    margin-right: auto;
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
  }

  span {
    font-weight: 500;
  }
}

.main {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: var(--gap) var(--gap) var(--gap) calc(19rem + var(--gap));
  background-color: #EFF2F4;

  // &__nav {
  //   display: flex;
  //   margin-bottom: var(--gap-sm);

  //   li {
  //     margin-right: 1rem;
  //     font-size: var(--fs-base);
  //     cursor: pointer;
  //     transition: color .4s;

  //     &:hover {
  //       color: var(--main-1);
  //     }
  //   }
  // }
}

.filter {
  margin-bottom: var(--gap);
}

.search {
  position: relative;
  margin-bottom: var(--gap);

  &__btns {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
  }

  &__btn {
    display: grid;
    grid-template-columns: 40% 10%;
    align-items: center;
    min-width: 6.6rem;
    height: 100%;
    cursor: pointer;
    background-color: var(--main-2);
    color: var(--white);
    padding-left: var(--gap-sm);
    padding-right: var(--gap-sm);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: grid-template-columns 0.25s;

    &:disabled {
      background-color: var(--main-3);
      cursor: default
    }

    &:not(:disabled):hover {
      grid-template-columns: 80% auto;

      span {
        opacity: 1;
      }
    }


    &:first-child {
      border-right: 1px solid white;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-right: 1px solid white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    span {
      opacity: 0;
      transition: all .2s;
      margin-right: .4rem;
    }
  }

  &__icon {
    width: 1.2rem;
  }
}

.tags {

  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .VButton {
    margin-top: var(--gap-sm);

    &:not(:disabled) {
      background-color: var(--main-2);
    }
  }
}

.cards {
  &__list {
    display: grid;
    flex: 1;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
  }

  p {
    font-size: 4rem;
    color: var(--main-3);
  }
}
</style>