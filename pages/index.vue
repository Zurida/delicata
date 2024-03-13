<script setup>

const categories = [
  {
    id: 0,
    title: 'Все рецепты',
  },
  {
    id: 1,
    title: 'Завтраки',
    subcategories: [{ id: 0, name: 'Из яиц' }, { id: 1, name: 'Из творога' }, { id: 2, name: 'Из муки' }, { id: 3, name: 'Из овощей' }]
  },
  {
    id: 2,
    title: 'Первые блюда',
    subcategories: null
  },
  {
    id: 3,
    title: 'Мясные блюда',
    subcategories: [{ id: 0, name: 'Из говядины' }, { id: 1, name: 'Из птицы' }, { id: 2, name: 'Из баранины' }]
  },
  {
    id: 4,
    title: 'Салаты',
    subcategories: null,
  },
]

const cards = [
  {
    name: 'Тост без авокадо',
    date: '20.02.2020',
    tags: ['Блюда из яиц', 'Завтраки', 'Блюда из яиц', 'Блюда из яиц', 'Блюда из яиц'],
    img: '/img/tost.jpg'
  },
  {
    name: 'Яичница',
    date: '21.02.2020',
    tags: ['Блюда из яиц'],
    img: '/img/eggs.jpg'
  },
  {
    name: 'Говядина, тушеная в сметанном соусе',
    date: '22.02.2020',
    tags: ['Вторые блюда'],
    img: '/img/meat.jpg'
  }
]


let currentId = ref(0);

function setActiveId(id) {
  currentId.value = id
}
</script>

<template>
  <div class="container">
    <aside class="aside reverse">
      <h2>Категории</h2>

      <div>
        <Collapse v-for="category in categories" :category="category" :class="{
          'is-visible': category.id === currentId
        }" @click="setActiveId(category.id)" />
      </div>
    </aside>
    <div class="main">
      <header class="header">
        <h1 class="heading">Доска рецептов</h1>
        <div class="search">
          <div class="search__field">
            <input type="text" placeholder="Поиск">
          </div>
          <div class="search__icon">

          </div>
        </div>
      </header>

      <div class="cards">
        <CommonCard v-for="card in cards" :card="card" />
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap);
}

.heading {
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: uppercase;
}

.main {
  flex: 1;
  padding: var(--gap);
  background-color: var(--white-soft);
}

.cards {
  display: grid;
  flex: 1;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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