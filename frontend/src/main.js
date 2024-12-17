import { createApp } from 'vue'
import App from './App.vue'

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000/api/"

// import router
import router from "./router"

// import store
import store from "./store"

createApp(App)
    .use(router).use(store).mount('#app')