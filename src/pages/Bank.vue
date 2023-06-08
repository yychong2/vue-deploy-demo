<template>
    <Header :title="title" :description="description"/>

    <Loading :loading="loading"/>

    <Transition>
    <div v-if="afterResult">
        <div class="form-group">
            <div class="btn_uy" style="margin-left: 11%; width: 21%; margin-top: 1%;">
              <button type="button" class="btn btn-dark btn-lg " @click="backBankList">{{$t("common.add_bank")}}</button>
            </div>
        </div>
        
        <div class="container px-5 my-5" v-show="show">
            <EasyDataTable :headers="headers" :items="memberBankList"   />
        </div>
       
    </div>
    <div v-else>

         <!-- Page content-->
         <section class="py-5">
             <div class="container px-5">
                 <!-- Contact form-->
                 <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">

                    <div class="btn_uy" style="margin-left: 27%; width: 21%;">
                      <button type="button" class="btn btn-dark btn-lg " @click="backBankList">{{$t("common.back")}}</button>
                    </div>

                     <div class="text-center mb-5">
                         <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-bank"></i></div>
                         <h1 class="fw-bolder">{{$t("title.bank")}} PG</h1>
                     </div>
                     <div class="row gx-5 justify-content-center">
                         <div class="col-lg-8 col-xl-6">
                             <Form @submit="addBankAccount">

                                 <div class="form-floating mb-3">
                                     <div class="form-group">
                                         <span style="color:black;">Bank Selected</span>
                                         <el-select class="form-control2 _ge_de_ol" v-model="add_bank_selected" placeholder="Please select" aria-required="true">
                                             <el-option v-for="(item,index) in allBankList" :label="item.BankName" :key="item.BankId" :value="item.BankId "></el-option>
                                         </el-select>                                  
                                     </div>
                                 </div>
                             
                                 <div class="form-floating mb-3">
                                    <Field  class="form-control _ge_de_ol" name="add_bank_account_name" type="text" placeholder="Enter Bank Account Name" :rules="validateBankAccountName" autocomplete="off" />
                                    <label>Bank Account Name</label>
                                    <ErrorMessage name="add_bank_account_name" style="color:red"/>
                                 </div>
                             
                                 <div class="form-floating mb-3">
                                    <Field class="form-control _ge_de_ol" name="add_bank_account_number" type="text" placeholder="Enter Bank Account Number" :rules="validateBankAccountNumber" autocomplete="off" />
                                    <label>Bank Account Number</label>
                                    <ErrorMessage name="add_bank_account_number" style="color:red"/>
                                 </div>

                                 <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("common.submit")}}</button></div>
                             
                             </Form>
                         </div>
                     </div>
                 </div>
             
             </div>
         </section>

    </div>
    </Transition>
</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import Header from '../components/header.vue'
import CryptoJS from 'crypto-js'
import Loading from '../components/Loading.vue'

export default {
    data(){
        return{
            title : "",
            description : "",
            memberBankList:[],
            allBankList:{},
            afterResult: true,
            add_bank_account_number:"",
            add_bank_account_name:"",
            add_bank_selected:[],
            headers: [
                          { text: "Bank Name", value: "BankName" },
                          { text: "Bank Account Name", value: "BankAccountName" },
                          { text: "Bank Account Number", value: "BankAccountNo"}
                    ],
            show:false,
            loading : false,
            headers2 : { 
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
            }
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.bank")
       this.description = t("title.bank_description")
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
       this.getMemberBank()
       this.getAllBankList()
      
    },
    methods:{
            getMemberBank : function(params){
                this.memberBankList = []
                axios.get('GetMemberBankAccountList', {}, this.headers2 ).then(response => {
                    this.memberBankList = response.data.MemberBankDetails
                    this.show = true
                })
                .catch(error => {
                  console.error(error);
                });
            },
            getAllBankList(){
                axios.get( 'GetAllBankList', {}, this.headers2 ).then(response => {
                    this.allBankList = response.data.AllBankList
                })
                .catch(error => {
                  console.error(error);
                });
            },
            addBankAccount(value){

                if(this.add_bank_selected == ""){
                    return alert('bank selected is required');
                }
                this.loading = true
                axios.post( 'AddBankAccount', {
                  BankAccountId: this.add_bank_selected,
                  BankAccountName: value.add_bank_account_name,
                  BankAccountNo: value.add_bank_account_number,
                  //BankBranch: "123",
                  //IsVerified: true,
                  //allowDuplicate: true
                }, this.headers2 ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        this.afterResult = true
                        this.getMemberBank()
                    }
                })
                .catch(error => { console.error(error) })
                .finally( com => {    this.loading = false  });
            },
            backBankList(){
                this.afterResult = this.afterResult ? false : true;
               // this.afterResult = !this.enable;
            },
            validateBankAccountName(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
            },
            validateBankAccountNumber(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
            }
        },
    components:{
        Header,Loading
    }
}
</script>

<style>
.form-control2{
        min-height: 50px;
        -webkit-box-shadow: none;
        box-shadow: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 10px 15px;
        background-color: transparent;
        color: #fff;
        margin: 0px 0px 20px 0px;
    }

    .form-control2 {
        min-height: 50px;
        border: 1px solid rgba(15, 14, 14, 0.3);
        padding: 10px 15px;
        background-color: transparent;
        color: black;
        width: 100%;
        margin: 0px 0px 30px 0px;
    }
    
    .card{
        width:20%;
    }
</style>