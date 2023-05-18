<template>
    <Header :title="title" :description="description"/>
    <Transition>
    <div v-if="afterResult">
        <div class="form-group">
            <div class="btn_uy" style="margin-left: 27%; width: 21%;">
              <button type="button" @click="backBankList">{{$t("common.add_bank")}}</button>
            </div>
        </div>
        
        <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                <div class="col mb-5" v-for="(item,index) of memberBankList" :key="index">
                        <div class="card h-100">
                            <div class="card-body p-4">
                                <div class="text-center">
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
    </div>
    <div v-else>
        <div class="form-group">
            <div class="btn_uy" style="margin-left: 27%; width: 21%;">
              <button type="button" @click="backBankList">{{$t("common.back")}}</button>
            </div>
        </div>

        <form @submit.prevent="submitaddBankAccount">
            <div class="form-sub-main">
             
              <div class="form-group">
                <el-select class="form-control _ge_de_ol" v-model="add_bank_selected" placeholder="Please select" >
                    <el-option v-for="(item,index) in allBankList" :label="item.BankName" :key="item.BankId" :value="item.BankId"></el-option>
                </el-select>                                              
              </div> 
              
              <div class="form-group">
                  <input class="form-control _ge_de_ol" v-model="add_bank_account_name" type="text" placeholder="Enter Bank Account Name" required="" aria-required="true">
              </div>

              <div class="form-group">
                  <input class="form-control _ge_de_ol" v-model="add_bank_account_number" type="text" placeholder="Enter Bank Account Number" required="" aria-required="true">
              </div>
             
              <div class="form-group">
                <div class="btn_uy">
                  <button type="submit" @click="addBankAccount">{{$t("common.submit")}}</button>
                </div>
              </div>

            </div>
        </form>
        
    </div>
    </Transition>
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
            allBankList:{},
            afterResult: true,
            add_bank_account_number:"",
            add_bank_account_name:"",
            add_bank_selected:[],
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.bank")
       this.description = t("title.bank_description")
       this.getMemberBank()
       this.getAllBankList()
    },
    methods:{
            getMemberBank : function(params){
                this.memberBankList = {}

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
            },
            getAllBankList(){
                //GET /api/v1/GetAllBankList
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

                axios.get(this.apiUrl+ 'GetAllBankList', {}, {headers}
                ).then(response => {
                    this.allBankList = response.data.AllBankList
                   
                })
                .catch(error => {
                  console.error(error);
                });
            },
            addBankAccount(){
                //POST /api/v1/AddBankAccount

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

                axios.post( this.apiUrl +'AddBankAccount', {
                  BankAccountId: this.add_bank_selected,
                  BankAccountName: this.add_bank_account_name,
                  BankAccountNo: this.add_bank_account_number,
                  //BankBranch: "123",
                  //IsVerified: true,
                  //allowDuplicate: true
                }, { headers }
                ).then(response => {
                    this.afterResult = true
                    this.getMemberBank()
                    //console.log(response.data);
               
               }).catch(error => {
                  console.error(error);
               });

            },
            backBankList(){
                this.afterResult = this.afterResult ? false : true;
               // this.afterResult = !this.enable;
            }
        },
    components:{
        Header
    }
}
</script>

<style>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>