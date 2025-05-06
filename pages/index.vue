<script setup>
const categoryStore = useCategoryStore()

const { data: recipes } = await useFetch('/api/recipes')


let currentId = ref(0);
const searchVal = ref('')
const cards = ref(recipes)

// const { session, loggedIn, user } = useUserSession()

definePageMeta({
  middleware: ['auth'],
});


async function setActiveId(category) {
  currentId.value = category.id

  try {
    const response = await $fetch(`/api/recipes?category_id=${category.id}`)

    cards.value = response
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="home">
    <div class="home__content">
      <aside class="aside reverse">
        <h4>Категории</h4>
        <div class="aside__container">
          <Collapse :category="{ id: 0, text: 'Все категории' }"></Collapse>
          <Collapse v-for="category in categoryStore.categories" :category="category" :class="{
            'is-visible': category.id === currentId
          }" @click="setActiveId(category)" />
        </div>
        <div class="btn">
          <CommonVButton to="/create" class="actions__link">+ Добавить рецепт</CommonVButton>
        </div>
      </aside>
      <div class="main">

        <!-- <div>
          <h4>Доска рецептов</h4>

        </div> -->

        <ul class="main__nav">
          <li>Мои рецепты</li>
          <li>Все рецепты</li>
        </ul>

        <div class="actions__search search">
          <div class="search__field">
            <CommonVInput v-model="searchVal" placeholder="Найти рецепт"></CommonVInput>
          </div>
        </div>


        <div class="filters">
          <!-- <CommonTag tag="Завтрак" :is-active="false"></CommonTag>
          <CommonTag tag="Завтрак" :is-active="false"></CommonTag> -->
        </div>


        <div class="cards">
          <CommonCard v-for="card in cards" :card="card" :to="`/recipe/${card.id}`" />
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
  }

  &__search {
    margin-left: auto;
    margin-bottom: var(--gap);
  }
}

.aside {
  position: fixed;
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

.filters {
  margin-bottom: var(--gap);
}

.cards {
  display: grid;
  flex: 1;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
}
</style>