import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      this.token = localStorage.getItem("token") || null;
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
    }
  }
});
