<script setup lang="ts">
import type { TRecipe } from '~/types/recipe';
import type { TTag } from '~/types/tag';

const categoryStore = useCategoryStore()


const { data: recipes } = await useFetch<TRecipe[]>('/api/recipes')
const { data: tags } = await useFetch<TTag[]>('/api/tags')


let currentId = ref(0);
const cards = ref<TRecipe[] | null>(recipes.value)

definePageMeta({
  middleware: ['auth'],
});

type TFilter = {
  title: string;
  tags: string[];
}

const filterData = reactive<TFilter>({
  title: '',
  tags: []
})


const isLoading = ref(false)

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

async function handleResetRecipes() {
  if (currentId.value !== 0) {
    currentId.value = 0
    await fetchRecipes(currentId.value)
  }
}


async function handleResetFilter() {
  filterData.tags = []
  await fetchRecipes(currentId.value)
}

async function handleTagChange() {
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
          <Collapse :category="{ id: 0, title: 'Все рецепты' }" @click="handleResetRecipes" :class="{
            'is-visible': currentId === 0
          }"></Collapse>
          <Collapse v-for="category in categoryStore.categories" :category="category" :class="{
            'is-visible': category.id === currentId
          }" @click="setActiveId(category.id)" />
        </div>
        <div class="btn">
          <CommonVButton to="/create" class="actions__link">
            <IconsIconAdd />
            <p>Добавить рецепт</p>
          </CommonVButton>
        </div>
      </aside>
      <div class="main">
        <CommonVOverlay :is-visible="isLoading">
          <CommonVLoader />
        </CommonVOverlay>
        <!-- <div>
          <h4>Доска рецептов</h4>

        </div> -->

        <!-- <ul class="main__nav">
          <li>Мои рецепты</li>
          <li>Все рецепты</li>
        </ul> -->
        <div class="filter">
          <form class="search" @submit.prevent="handleTitleSubmit">
            <div class="search__field">
              <CommonVInput v-model="filterData.title" placeholder="Найти рецепт"></CommonVInput>
              <button class="search__btn">
                <IconsIconSearch class="search__icon" />
              </button>
            </div>
          </form>

          <div class="filter__tags">
            <CommonVTag tag="Завтрак" :is-active="false" :label="tag.title" v-for="tag in tags"
              v-model="filterData.tags" :value="tag.id" @change="handleTagChange" />
          </div>
          <CommonVButton @click="handleResetFilter" small>Сбросить теги</CommonVButton>
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
.btn {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: var(--gap);
}


.VOverlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 2rem;
}

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

.actions {
  display: flex;
  align-items: center;
  margin-bottom: var(--gap);

  &__link {
    display: inline-flex;
    font-size: var(--fs-small);
    margin-left: auto;
    margin-right: auto;

    svg {
      width: 2rem;
      height: 2rem;
      margin-right: .4rem;
      fill: currentColor;
    }

    p {
      font-weight: 600;

    }
  }
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
}

.main {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: var(--gap) var(--gap) var(--gap) calc(19rem + var(--gap));
  background-color: #EFF2F4;

  &__nav {
    display: flex;
    // margin-top: var(--gap-sm);
    margin-bottom: var(--gap-sm);

    li {
      margin-right: 1rem;
      font-size: var(--fs-base);
      cursor: pointer;
      transition: color .4s;

      &:hover {
        color: var(--main-1);
      }
    }
  }
}

.search {
  position: relative;
  margin-bottom: var(--gap);
  // width: 40rem;
  // margin-left  : auto;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    background-color: var(--main-1);
    border-radius: var(--border-radius);
    color: var(--white);

    span {
      font-size: 2rem;
    }

  }

  &__icon {
    width: 2rem;
  }
}

.filter {
  margin-bottom: var(--gap);

  &__tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .VButton {
    margin-top: var(--gap-sm);
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