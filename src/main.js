import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"

import './assets/css/styles.css'
import './assets/css/style-login.css'

const app = createApp(App)

app.config.globalProperties = {
    apiUrl: "https://flut.jcmmweb.com/api/v1/",

};

app.use(router)
app.use(i18n)
app.mount('#app')