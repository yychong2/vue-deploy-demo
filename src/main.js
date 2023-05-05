import { createApp, VueElement } from 'vue'
import App from './App.vue'
// import './assets/main.css'

import './assets/css/style.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/glightbox/css/glightbox.min.css'
import './assets/vendor/swiper/swiper-bundle.min.css'



const app = createApp(App)
app.config.globalProperties = {
    apiUrl: "https://flut.jcmmweb.com/api/v1/",

};

app.mount('#app')
