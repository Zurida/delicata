<script setup>
</script>

<template>
  <div class="cards">
    <CommonCard v-for="card in 10" />
  </div>
</template>



<style scoped>
.cards {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  /* margin-right: 2rem; */
}
</style>