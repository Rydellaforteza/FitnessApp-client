<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Login</h2>

    <div class="col-md-6 mx-auto">
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="text-center mt-3">
        Don't have an account?
        <RouterLink to="/register">Register here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
import { notyf } from "../stores/notyf";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = () => {
  // validation
  if (!email.value || !password.value) {
    notyf.error("Email and password are required");
    return;
  }

  loading.value = true;

  api.post("/users/login", {
      email: email.value,
      password: password.value
    })
    .then((res) => {
      const token = res.data.access;

      if (!token) {
        notyf.error("Invalid email or password");
        return;
      }

      localStorage.setItem("token", token);
      notyf.success("Login successful!");

      setTimeout(() => {
        router.push("/workouts");
      }, 500);
    })
    .catch((err) => {
      const message = err.response?.data?.message || "Login failed.";
      notyf.error(message);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
