<template>
  <footer class="footer mt-auto py-3 bg-dark text-white text-center">
    <div class="container">
      <small>© {{ year }} FitnessTracker • All rights reserved. BY: RYDEL ANN LAFORTEZA</small>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  width: 100%;
  margin-top: auto;
}
</style>
