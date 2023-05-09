import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'


import './assets/css/styles.css'
import './assets/css/style-login.css'

const app = createApp(App)
app.config.globalProperties = {
    apiUrl: "https://flut.jcmmweb.com/api/v1/",

};

app.use(router)
app.mount('#app')