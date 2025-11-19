<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Register</h2>
    <div class="col-md-6 mx-auto">
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input v-model="firstName" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input v-model="lastName" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Mobile Number</label>
          <input v-model="mobileNo" type="text" class="form-control" minlength="11" maxlength="11" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <p class="text-center mt-3">
        Already have an account?
        <RouterLink to="/login">Click here</RouterLink>
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
const loading = ref(false);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const mobileNo = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    notyf.error("Passwords do not match!");
    return;
  }

  loading.value = true;

  api.post("/users/register", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    mobileNo: mobileNo.value,
    password: password.value
  })
    .then(() => {
      notyf.success("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 600);
    })
    .catch((error) => {
      notyf.error(error.response?.data?.message || "Registration failed.");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
