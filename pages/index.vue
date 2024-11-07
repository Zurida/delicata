<script setup>


const menu = useCategoryStore()
const { data: recipesGet } = await useFetch('/api/recipe')

let currentId = ref(0);
const searchVal = ref('')
const cards = ref(recipesGet)

// watch(searchVal, () => {
//   cards.value = recipesGet.value.filter(card => card.title.toLowerCase().includes(searchVal.value.toLowerCase()))
// })

async function setActiveId(category) {
  currentId.value = category.id

  try {
    const response = await $fetch(`/api/filterRecipes?category=${category.value}`)

    cards.value = response
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="home">
    <aside class="aside reverse">
      <h2>Категории</h2>
      <div class="aside__container">
        <Collapse v-for="category in menu.categories" :category="category" :class="{
          'is-visible': category.id === currentId
        }" @click="setActiveId(category)" />
      </div>
    </aside>
    <div class="main">
      <header>
        <h1>Доска рецептов</h1>
      </header>

      <div class="actions">
        <CommonVButton small to="/create" class="actions__link">+ Добавить рецепт</CommonVButton>

        <div class="actions__search search">
          <!-- <div class="search__field">
            <CommonVInput v-model="searchVal" type="text"></CommonVInput>
          </div> -->
        </div>
      </div>

      <div class="cards">
        <CommonCard v-for="card in cards" :card="card" :to="`/recipe/${card.id}`" />
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.home {
  display: flex;
  min-height: 100vh;
}

header {
  margin-bottom: calc(var(--gap) / 2);
}

h1 {
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: uppercase;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap);

  &__link {
    font-size: 1.2rem;
  }
}

.main {
  flex: 1;
  padding: var(--gap);
  background-color: var(--white-soft);
}

.cards {
  display: grid;
  flex: 1;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
}


.aside {
  width: 22rem;

  h2 {
    padding: var(--gap);
    border-bottom: 1px solid gray;
    font-size: 2.4rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--white-soft);
  }
}
</style>