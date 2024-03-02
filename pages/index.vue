<script setup>
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
</script>

<template>
  <div class="container">
    <aside class="aside">
      <h2>Категории</h2>

      <nav>

      </nav>
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
  /* display: flex; */
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
  width: 32rem;
}
</style>