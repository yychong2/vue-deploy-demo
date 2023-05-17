<template>
    <Header :title="title" :description="description"/>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                <div class="col mb-5" v-for="(item,index) of balanceList" :key="index">
                        <div class="card h-100">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h3 class="fw-bolder">{{ item.ProductName    }}</h3>
                                    <h5 class="fw-bolder">{{ item.ProductWalletBalance    }}</h5>
                                </div>
                            </div>
                        </div>
                </div>

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

export default {
    data(){
        return{
            title : "",
            description : "",
            balanceList:{},
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.balance")
       this.description = t("title.balance_description")
       this.GetProductWalletDetails()
    },
    methods:{
            GetProductWalletDetails(){
                axios.defaults.headers.common['Content-Type'] = "application/json";
                axios.defaults.headers.common['Language'] = "en-US";
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");

                const headers = { 
                    "Content-Type": "application/json",
                    "Language":"en-US",
                    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                    "Authorization" : axios.defaults.headers.common['Authorization']
                };

                axios.get(this.apiUrl+ 'GetProductWalletDetails', {}, {headers}
                ).then(response => {
                    this.balanceList = response.data.ProductList

                    for( let i = 0 ; i < this.balanceList.length ; i++){
                       // console.log(this.balanceList[i].Id)
                       // this.balanceList[i].push()

                        const balance = this.getProductBalance(this.balanceList[i].ProductCode , this.balanceList[i].IsSeamless , this.balanceList[i].IsMaintenance)
                        balance.then(result =>{ 
                                //console.log("top - " + result)
                                this.balanceList[i].ProductWalletBalance = result
                        })
                    }
                })
                .catch(error => {
                  console.error(error);
                });
            },
            async getProductBalance(productCode , isSeamless , isMaintenance){
                axios.defaults.headers.common['Content-Type'] = "application/json";
                axios.defaults.headers.common['Language'] = "en-US";
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");

                const headers = { 
                        "Content-Type": "application/json",
                        "Language":"en-US",
                        "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                        "Authorization" : axios.defaults.headers.common['Authorization']
                };

                const response = await axios.post( this.apiUrl +'GetBalance?productCode='+productCode+'&isSeamless='+isSeamless+'&isMaintenance='+isMaintenance, {  },{ headers })
                //console.log(response.data)
                if(response.data == '9999' || response.data == 'null' ){
                    return "Maintanence"
                }
                else{
                    return response.data
                }
            }
    },  
    components:{
        Header
    }
}
</script>