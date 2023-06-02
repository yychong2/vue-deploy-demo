<template>
    <Loading :loading="loading"/>

    <!-- Page content-->
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-credit-card"></i></div>
                    <h1 class="fw-bolder">{{$t("title.voucher")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">

                        <div v-if="afterResult" style="margin-top: 80px;color:white;">
                            <div v-html="detail" style="width: 50%; margin: auto;"></div>
                            <form @submit.prevent="submitConfirmVoucher">
                                <div class="form-sub-main">
                                    <div class="form-group">
                                      <div class="d-grid">
                                        <button class="btn btn-dark btn-lg"  @click="submitVoucher">{{$t("common.submit")}}</button>
                                      </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <Form @submit="getVoucherDetail" id="voucherForm">
                                <div class="form-floating mb-3">
                                    <Field class="form-control _ge_de_ol" name="voucher" type="text" placeholder="Enter Voucher" :rules="validateVoucher" autocomplete="off" />
                                    <label for="name">Voucher</label>
                                    <ErrorMessage name="voucher" style="color:red"/>
                                </div>

                                <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("common.submit")}}</button></div>
                              
                            </Form>
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
import CryptoJS from 'crypto-js'
import Loading from '../components/Loading.vue'

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
};


export default {
    data(){
        return{
            voucher : "",
            afterResult: false,
            detail:"",
            loading : false,
        }
    }, 
    created(){
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);     
    },
    methods:{
        submitVoucher(){
            this.loading = true

            axios.post('ClaimVoucher', { VoucherCode : this.voucher
            }, { headers } ).then(response => {
                if(response.data.ResponseCode == "0"){
                    alert(response.data.ResponseMessage);
                    this.afterResult = false
                }
            })
            .catch(error => {console.error(error); }) 
            .finally( com => {    this.loading = false  });
        },
        getVoucherDetail(values){
            axios.post('GetVoucherDetailByVoucherCode', { VoucherCode : values.voucher
            }, { headers } ).then(response => {
                if(response.data.ResponseCode == "0"){
                    this.detail= response.data.VoucherDetail.Content;
                    this.voucher = values.voucher
                    this.afterResult = true
                }
            }).catch(error => {
                console.error(error);
            });
            
        },
        validateVoucher(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
        }
    },
    components:{  Loading }

}


</script>