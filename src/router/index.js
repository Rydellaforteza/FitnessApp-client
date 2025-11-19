import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Workouts from "../pages/Workouts.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/workouts", component: Workouts },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
