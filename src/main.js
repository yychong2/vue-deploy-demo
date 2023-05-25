import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/styles.css'
import './assets/css/style-login.css'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { Field, Form, ErrorMessage } from 'vee-validate';

import axios from 'axios';
const app = createApp(App)

app.config.globalProperties = {
    apiUrl: "https://flut.jcmmweb.com/api/v1/",
    aesKey: "6699"
};

axios.defaults.baseURL = 'https://flut.jcmmweb.com/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = "application/json";
axios.defaults.headers.common['Language'] = "en-US";
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("tokenLogin");

app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(VuePlyr, {
    plyr: {}
})
app.component('EasyDataTable', Vue3EasyDataTable)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Form', Form)

app.mount('#app')