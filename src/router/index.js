import { createRouter, createWebHistory } from "vue-router";
import Workouts from "../pages/Workouts.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { notyf } from "../stores/notyf";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/workouts",
    component: Workouts,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (!token) {
        notyf.error("You must be logged in to access workouts");
        return next("/login");
      }

      next();
    },
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
