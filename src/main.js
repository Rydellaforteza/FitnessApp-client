import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App);


const pinia = createPinia();
app.use(pinia);


import { useGlobalStore } from "./stores/global";
const global = useGlobalStore();
global.init();


app.use(router);


app.mount("#app");
