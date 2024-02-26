import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import './styles/app.css'

createApp(App).use(VueAxios, axios).mount('#app')
