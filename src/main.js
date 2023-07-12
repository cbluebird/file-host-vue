import {createApp} from 'vue'
import {createPinia} from 'pinia'

import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./tools/Router";


axios.defaults.baseURL = "http://127.0.0.1:4523/m1/2931284-0-default"
//axios.defaults.withCredentials=false

const app = createApp(App)

app.use(createPinia())
app.use(ElementUI)
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')