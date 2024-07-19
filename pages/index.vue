<script setup>

// const recipes = await useFetch('/api/recipes')
const { data: menuItems } = await useFetch('/api/menu')
const recipes = []

const c = [
  {
    id: 0,
    name: 'Тост без авокадо',
    date: '20.02.2020',
    tags: ['Блюда из яиц', 'Завтраки', 'Блюда из яиц', 'Блюда из яиц', 'Блюда из яиц'],
    img: '/img/tost.jpg'
  },
  {
    id: 1,
    name: 'Яичница',
    date: '21.02.2020',
    tags: ['Блюда из яиц'],
    img: '/img/eggs.jpg'
  },
  {
    id: 2,
    name: 'Говядина, тушеная в сметанном соусе',
    date: '22.02.2020',
    tags: ['Вторые блюда'],
    img: '/img/meat.jpg'
  },
  {
    id: 3,
    name: 'Говядина, тушеная в сметанном соусе',
    date: '22.02.2020',
    tags: ['Вторые блюда'],
    img: '/img/meat.jpg'
  },
  {
    id: 4,
    name: 'Говядина, тушеная в сметанном соусе',
    date: '22.02.2020',
    tags: ['Вторые блюда'],
    img: '/img/meat.jpg'
  }
]


let currentId = ref(0);
const searchVal = ref('')
const cards = ref(c)

watch(searchVal, () => {
  cards.value = c.filter(card => card.name.toLowerCase().includes(searchVal.value.toLowerCase()))
})

function setActiveId(id) {
  currentId.value = id
}



</script>

<template>
  <div class="container">
    <aside class="aside reverse">
      <h2>Категории</h2>
      <div class="aside__container">
        <Collapse v-for="category in menuItems" :category="category" :class="{
          'is-visible': category.id === currentId
        }" @click="setActiveId(category.id)" />
      </div>
    </aside>
    <div class="main">
      <header>
        <h1>Доска рецептов</h1>
      </header>

      <div class="actions">
        <!-- <CommonVLink to="/create" class="actions__link">+ Добавить рецепт</CommonVLink> -->
        <CommonVButton small to="/create" class="actions__link">+ Добавить рецепт</CommonVButton>

        <div class="actions__search search">
          <div class="search__field">
            <CommonVInput v-model="searchVal"></CommonVInput>
          </div>
        </div>
      </div>

      <div class="cards">
        <CommonCard v-for="card in cards" :card="card" :to="`/recipe-${card.id + 1}`" />
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.container {
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