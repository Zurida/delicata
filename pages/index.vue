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
    <div class="home__header">
      <p class="logo">DELICATA</p>

    </div>
    <div class="home__content">
      <aside class="aside reverse">
        <h2>Категории</h2>
        <div class="aside__container">
          <Collapse v-for="category in menu.categories" :category="category" :class="{
            'is-visible': category.id === currentId
          }" @click="setActiveId(category)" />
        </div>
        <div class="btn">
          <CommonVButton small to="/create" class="actions__link">+ Добавить рецепт</CommonVButton>
        </div>
      </aside>
      <div class="main">
        <header>
          <h1>Доска рецептов</h1>
          <div class="actions__search search">
            <div class="search__field">
              <CommonVInput v-model="searchVal" type="text"></CommonVInput>
            </div>
          </div>
        </header>

        <div class="actions">
          <p>Моя доска</p>
          <p>Меню на неделю</p>
          <p>Все рецепты</p>

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
  &__header {
    display: flex;
    align-items: center;
    padding: var(--gap);
    height: var(--header-height);
    background-color: var(--white);
    box-shadow: 0 0 5px 5px rgb(37, 37, 37);
  }

  &__content {
    display: flex;
    min-height: calc(100vh - var(--header-height));
  }
}

header {
  margin-bottom: calc(var(--gap) / 2);
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2rem;
  text-transform: uppercase;
}

.actions {
  display: flex;
  align-items: center;
  margin-bottom: var(--gap);

  &__link {
    display: inline-flex;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
  }

  &__search {
    margin-left: auto;
  }
}

.main {
  flex: 1;
  padding: var(--gap);
  background-color: #EFF2F4;
}

.cards {
  display: grid;
  flex: 1;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
}


.aside {
  display: flex;
  flex-direction: column;
  width: 22rem;
  background-color: var(--black);

  h2 {
    padding: var(--gap);
    font-size: 2rem;
    text-transform: uppercase;
    color: var(--white);
  }
}
</style>