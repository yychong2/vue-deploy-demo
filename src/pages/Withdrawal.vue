<template>

  <Loading :loading="loading"/>

  <!-- Page content-->
  <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-cash"></i></div>
                    <h1 class="fw-bolder">{{$t("title.withdrawal")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                      <Form @submit="onSubmit" id="withdrawalForm">
                          
                          <div class="form-floating mb-3">
                            <div class="form-group">
                              <el-select class="form-control _ge_de_ol" v-model="bank_selected" placeholder="Please select" aria-required="true">
                                  <el-option v-for="(item,index) in memberBankList" :label="item.BankName" :key="item.BankId" :value="item.BankId"></el-option>
                              </el-select>                                              
                            </div> 
                          </div>

                          <div class="form-floating mb-3">
                            <input class="form-control _ge_de_ol" style="color: black" type="text" v-model="memberBalance" disabled>
                          </div>

                          <div class="form-floating mb-3">
                            <Field class="form-control _ge_de_ol" name="amount_withdraw" type="text" placeholder="Enter Withdrawal Amount" :rules="validateWithdrawalAmount" autocomplete="off" />
                            <label for="name">Withdrawal Amount</label>
                            <ErrorMessage name="amount_withdraw" style="color:red"/>
                          </div>

                          <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("common.submit")}}</button></div>
                        
                      </Form>
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
                memberBankList : {},
                memberBalance :"",
                bank_selected:"",
                loading : false,
            }
        }, 
        created(){
           this.getMemberBankAccount()
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
        },
        methods:{
            getMemberBankAccount : function(params){
                axios.get('GetWithdrawalDetails', {}, {headers} ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        this.memberBankList = response.data.MemberBankAcountDetails
                        this.memberBalance= response.data.TotalBalance
                    }
                })
                .catch(error => {
                  console.error(error);
                });
            },
            onSubmit(values){
               
                if(this.bank_selected == ""){
                    return alert('bank selected is required');
                }

                this.loading = true
                axios.post( 'Withdrawal', {
                  BankAccountId: this.bank_selected,
                  WithdrawAmount: values.amount_withdraw,
                }, { headers } ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
                })
                .catch(error => { console.error(error);})
                .finally( com => {    this.loading = false  });
            },
            validateWithdrawalAmount(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
            }
        },
        components:{
           Loading
        }
    }
</script>

