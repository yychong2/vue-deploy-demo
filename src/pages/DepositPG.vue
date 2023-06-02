<template>
    <Loading :loading="loading"/>
    <!-- Page content-->
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-cash"></i></div>
                    <h1 class="fw-bolder">{{$t("title.deposit")}} PG</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                        <Form @submit="onSubmit">

                            <div class="form-floating mb-3">
                                <div class="form-group">
                                    <span style="color:black;">Bank Name</span>
                                    <el-select class="form-control2 _ge_de_ol" v-model="bank_selected" @change="GetBankCodeDetails" placeholder="Please select" aria-required="true">
                                        <el-option v-for="(item,index) in operatorBankAccountList" :label="item.BankName" :key="item.BankId" :value="item.BankId "></el-option>
                                    </el-select>                                  
                                </div>
                            </div>

                            <div class="form-floating mb-3" v-if="bankCodeResult">
                                <div class="form-group">
                                    <span style="color:black;">Bank Options</span>
                                    <el-select class="form-control2 _ge_de_ol" v-model="bank_code_selected" placeholder="Please select" aria-required="true">
                                        <el-option v-for="(item,index) in bankCodeList" :label="item.Name" :key="item.Code" :value="item.Code "></el-option>
                                    </el-select>                                               
                                </div> 
                            </div>

                            <div class="form-floating mb-3" >
                                <div class="form-group">
                                    <span style="color:black;">Promotion</span>
                                    <el-select class="form-control2 _ge_de_ol" v-model="promotion_selected" placeholder="Please select" aria-required="true">
                                        <el-option v-for="(item,index) in promotionList" :label="item.Title" :key="item.Id" :value="item.Id"></el-option>
                                    </el-select>                                              
                                </div>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control2 _ge_de_ol" name="amount_deposit" type="text" inputmode="numeric" pattern="/d+" placeholder="Enter Deposit Amount" :rules="validateDepositAmount" autocomplete="off" />
                                <ErrorMessage name="amount_deposit" style="color:red"/>
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
                    operatorBankAccountList : {},
                    bankCodeList:[],
                    promotionList:[],
                    bank_selected:"",
                    promotion_selected : "",
                    bank_code_selected : "",
                    bankCodeResult: false,
                    loading : false,
                }
            }, 
            created(){
               axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
               //axios.defaults.headers.common['X-Member-Details'] = '{"Username": "davis7231","UserId": "11345", "UserGroup": "43","UserGroupName": "VIP43","Email": "b@a.com","IpAddress": "2001:e68:5410:52e4:8d92:85b1:2673:6c85","IsPauseBet": false,"PlayerType": "0","AgentId": "1","AgentCode": "ag1","Name": "testLai","DateCreated": "2021-03-08T07:35:26","MinWithdrawal": 0,"MaxWithdrawal": 0,"DailyWithdrawalLimit": 0,"DailyWithdrawalLimitAmt": 0,"Currency": "CNY"}';
               this.GetDepositDetails()
            },
            methods:{
                //GET /api/v1/GetDepositDetails
                GetDepositDetails : function(params){
                    axios.get('GetPGDepositDetails', {}, {headers} ).then(response => {
                        if(response.data.ResponseCode == "0"){
                           // console.log(response.data);
                           this.operatorBankAccountList = response.data.OperatorBankAccountList
                          
                           if(response.data.PromotionList.length > 0){
                                this.promotionList.push({ Title : "Please select", Id : ""})
                                response.data.PromotionList.forEach( value =>{
                                    this.promotionList.push({ Title : value.Title , Id : value.Id })
                                })
                            }
    
                        }
                    })
                    .catch(error => {
                      console.error(error);
                    });
                },
                GetBankCodeDetails(bank_id){


                    const bank_selected2 = []
                    this.operatorBankAccountList.forEach(value =>{
                        if(value.BankId === bank_id){
                            bank_selected2.push(value)
                        }
                    })
                    //console.log(bank_selected2)
                    //console.log(bank_selected2[0].BankCode)

                    axios.post('GetPgBankDetails', {
                        DepositBankId     : bank_id,
                        DepositBankCode   : bank_selected2[0].BankCode,
                        DepositAmount     : "",
                        ProductId         : "",
                        ProductCode       : "",
                        ProductPromotionId: "",
                        PromotionId       : "",
                        PromotionCode     : "",
                        SwiftCode : bank_selected2[0].SwiftCode
                    }, {headers})
                    .then(response => {
                        this.bankCodeList = []
                        if(response.data.ResponseCode == "0"){
                            if(response.data.PgDetail.BankList != null){
                                if(response.data.PgDetail.BankList.length > 0 ){
                                    console.log(response.data)
                                    this.bankCodeList = response.data.PgDetail.BankList
                                    console.log( this.bankCodeList)
                                    this.bankCodeResult = true
                                }else{
                                    this.bankCodeList = ""
                                    this.bankCodeResult = false
                                }
                            }else{
                                    this.bankCodeList = ""
                                    this.bankCodeResult = false
                            }
                        }
                    }).catch(error => {
                          console.error(error);
                    })


                },
                onSubmit(values){
                    const prodCode = this.product_selected 
    
                    //console.log("Bank - " + this.bank_selected)
                    //console.log("Promotion - " +this.promotion_selected)
                    //console.log("Amount - " +values.amount_deposit)
                    this.loading = true
                    axios.post( 'PgDeposit', {
                        DepositBankId     : this.bank_selected,
                        DepositBankCode   : "",
                        DepositAmount     : values.amount_deposit,
                        ProductId         : "",
                        ProductCode       : "",
                        ProductPromotionId: "",
                        PromotionId       : this.promotion_selected,
                        PromotionCode     : ""
                    }, { headers } ).then(response => {
                        console.log(response.data)
                        if(response.data.ResponseCode == "0"){
                            alert(response.data.ResponseMessage)
                            window.open(response.data.ResponseData);
                        }
                    })
                    .catch(error => { console.error(error);})
                    .finally( com => {    this.loading = false  });
    
                },
                validateDepositAmount(value){
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
    
    .form-group{
        text-align: left;
        color: white;
    }
    </style>