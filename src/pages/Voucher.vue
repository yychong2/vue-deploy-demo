<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
                <div v-if="afterResult" style="margin-top: 80px;color:white;">
                    <div v-html="detail" style="width: 50%; margin: auto;"></div>
                    <form @submit.prevent="submitConfirmVoucher">
                        <div class="form-sub-main">
                            <div class="form-group">
                              <div class="btn_uy">
                                <button type="submit" @click="submitVoucher">{{$t("common.submit")}}</button>
                              </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <form @submit.prevent="submitvoucher">
                        <div class="form-sub-main">
                        
                            <div class="form-group">
                                <input class="form-control _ge_de_ol" v-model="voucher" type="text" placeholder="Enter Voucher Code" required="" aria-required="true">
                            </div>
                        
                            <div class="form-group">
                              <div class="btn_uy">
                                <button type="submit" @click="getVoucherDetail">{{$t("common.submit")}}</button>
                              </div>
                            </div>

                        </div>
                    </form>
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

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
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
       this.title = t("title.voucher")
       this.description = t("title.voucher_description")
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);     
    },
    methods:{
        getVoucherDetail(){
            axios.post('GetVoucherDetailByVoucherCode', {
                VoucherCode : this.voucher
            }, { headers }
            ).then(response => {
                this.detail= response.data.VoucherDetail.Content;
                this.afterResult = true
            }).catch(error => {
                console.error(error);
            });

        },
        submitVoucher(){
            axios.post('ClaimVoucher', {
                VoucherCode : this.voucher
            }, { headers }
            ).then(response => {
                alert(response.data.ResponseMessage);
                this.afterResult = false
                //console.log(response.data.ResponseMessage)
            }).catch(error => {
                console.error(error);
            });

        }
    },
    components:{
        Header
    }

}


</script>