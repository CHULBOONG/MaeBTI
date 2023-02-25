import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

Kakao.init('c8c5cff519fa6008535d98e7ea7d11eb')