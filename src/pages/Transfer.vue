<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
                
            </div>
        </div>
    </section>
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
            voucher : "",
            afterResult: false,
            detail:""
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.transfer")
       this.description = t("title.transfer_description")
       this.GetProductWalletDetails()
    },
    methods:{
        GetProductWalletDetails(){
                //GET /api/v1/GetAllBankList
                axios.defaults.headers.common['Content-Type'] = "application/json";
                axios.defaults.headers.common['Language'] = "en-US";
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");

                axios.get(this.apiUrl+ 'GetProductWalletDetails', {}, {headers}
                ).then(response => {
                    console.log(response.data)
                   
                })
                .catch(error => {
                  console.error(error);
                });
        }
    },
    components:{
        Header
    }

}


</script>