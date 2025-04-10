import { createApp } from 'vue';
import router from "./router";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "owlcarousel/owl-carousel/owl.carousel.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'chart.js/auto'
import App from './App.vue';

const pinia = createPinia();
pinia.use(createPersistedState({}));

createApp(App).use(router).use(pinia).use(ToastPlugin).mount('#app');
