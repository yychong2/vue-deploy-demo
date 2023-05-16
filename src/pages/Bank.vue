<template>
    <Header :title="title" :description="description"/>
    <!-- Section-->
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                <div class="col mb-5" v-for="(item,index) of memberBankList" :key="index">
                        <div class="card h-100">
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h3 class="fw-bolder">{{ item.BankName    }}</h3>
                                    <h5 class="fw-bolder">{{ item.BankAccountName    }}</h5>
                                    <h5 class="fw-bolder">{{ item.BankAccountNo    }}</h5>
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
            memberBankList:{},
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.bank")
       this.description = t("title.bank_description")
       this.getMemberBank()
    },
    methods:{
            getMemberBank : function(params){
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

                axios.get(this.apiUrl+ 'GetMemberBankAccountList', {}, {headers}
                ).then(response => {
                    //console.log(response.data)
                    this.memberBankList = response.data.MemberBankDetails
                   
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