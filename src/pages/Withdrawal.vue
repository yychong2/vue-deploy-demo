<template>
<Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
                {{ memberBankList }}
                {{ memberBalance }}
                <form @submit.prevent="submitaddBankAccount">
                    <div class="form-sub-main">

                          <div class="form-group">
                            <el-select class="form-control _ge_de_ol" v-model="bank_selected" placeholder="Please select" aria-required="true">
                                <el-option v-for="(item,index) in memberBankList" :label="item.BankName" :key="item.BankId" :value="item.BankId"></el-option>
                            </el-select>                                              
                          </div> 

                          <div class="form-group">
                              <input class="form-control _ge_de_ol" style="color: black" type="text" v-model="memberBalance" disabled>
                          </div>

                          <div class="form-group">
                              <input class="form-control _ge_de_ol" v-model="amount_withdraw" type="text" placeholder="Enter Withdrawal Amount" required="" aria-required="true">
                          </div>
                      
                          
                      
                          <div class="form-group">
                            <div class="btn_uy">
                              <button type="submit" @click="submitWithdraw">{{$t("common.submit")}}</button>
                            </div>
                          </div>
                      
                    </div>
                </form>

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
            memberBankList : {},
            memberBalance :"",
            bank_selected:"",
            amount_withdraw:""
        }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.withdrawal")
           this.description = t("title.withdrawal_description")
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
            submitWithdraw(){
                axios.post( 'Withdrawal', {
                  BankAccountId: this.bank_selected,
                  WithdrawAmount: this.amount_withdraw,
                }, { headers } ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
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

