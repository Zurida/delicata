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
    <div class="home__content">
      <aside class="aside reverse">
        <h4>Категории</h4>
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
          <h4>Доска рецептов</h4>
          <!-- <div class="actions__search search">
            <div class="search__field">
              <CommonVInput v-model="searchVal" type="text"></CommonVInput>
            </div>
          </div> -->
        </header>

        <ul class="main__nav">
          <li>Моя доска</li>
          <li>Меню на неделю</li>
          <li>Все рецепты</li>

        </ul>

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

header {
  margin-bottom: var(--gap);
  display: flex;
  align-items: center;
}

h4 {
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

.aside {
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 22rem;
  height: 100vh;
  padding-top: calc(var(--header-height) + var(--gap-sm));
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
  padding: var(--gap);
  padding: calc(var(--header-height) + var(--gap-sm)) var(--gap) var(--gap);
  background-color: #EFF2F4;

  &__nav {
    display: flex;
    margin-bottom: var(--gap);

    li {
      margin-right: 1rem;
      font-size: 1.6rem;
      cursor: pointer;
      transition: color .4s;

      &:hover {
        color: var(--main-1);
      }
    }
  }
}

.cards {
  display: grid;
  flex: 1;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
}
</style>