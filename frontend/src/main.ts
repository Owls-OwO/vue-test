import "./css/reset.css"
import "./css/main.css"

import router from "./routes/router"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'


const app = createApp(App)
app.use(router)
app.use(createPinia())


app.mount('#app')
