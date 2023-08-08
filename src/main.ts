import { createApp } from 'vue'

// style
import './theme/index.css'
import 'u/vantStyle'

import App from './App.vue'

// router
import router from './router'

// pinia
import { pinia } from './store'

// 路由守卫
import '@/router/interceptor'

// indexedDB
import '@/db'

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
