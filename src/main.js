import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './mock/index.js'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

createApp(App).use(router).use(VueLoaders).mount('#app')
