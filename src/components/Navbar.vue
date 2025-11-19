<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand" href="#">FitnessTracker</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">

        <li v-if="isLoggedIn" class="nav-item">
          <RouterLink class="nav-link" to="/workouts">Workouts</RouterLink>
        </li>

        <li v-if="!isLoggedIn" class="nav-item">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>

        <li v-if="isLoggedIn" class="nav-item">
          <a class="nav-link logout-link" @click="handleLogout">Logout</a>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useGlobalStore } from "../stores/global";
import { notyf } from "../stores/notyf";
import { useRouter } from "vue-router";

const router = useRouter();
const global = useGlobalStore();


global.init();


const isLoggedIn = computed(() => global.token !== null);


watchEffect(() => {
  console.log("Navbar token:", global.token);
});

const handleLogout = () => {
  global.logout();
  notyf.success("Logged out!");
  router.push("/login");
};
</script>

