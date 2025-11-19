import { createRouter, createWebHistory } from "vue-router";
import Workouts from "../pages/Workouts.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { notyf } from "../stores/notyf";

const routes = [
  
  { path: "/", redirect: "/login" },

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
  },

  // Fallback for unknown routes
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
