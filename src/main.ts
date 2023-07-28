import { createApp } from 'vue'
import './theme/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import '@/router/interceptor'

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
