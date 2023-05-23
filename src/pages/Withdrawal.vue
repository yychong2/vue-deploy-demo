<template>
<Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container"></div></div></section>
</template>

<script>
    import axios from 'axios';
    import { useI18n } from 'vue-i18n'
    import Header from '../components/header.vue'
    import CryptoJS from 'crypto-js'
    
    axios.defaults.withCredentials = true;
    let headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                "Authorization" : axios.defaults.headers.common['Authorization']
            };

    export default {
        data(){
        return{
            title : "",
            description : "",
        }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.withdrawal")
           this.description = t("title.withdrawal_description")
        },
        components:{
            Header
        }
    }
</script>

