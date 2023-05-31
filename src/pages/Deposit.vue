<template>
              

<Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
                <Form @submit="onSubmit">
                    <div class="form-sub-main">
                        <div class="form-group">
                          <span>Bank Name</span>
                          <el-select class="form-control2 _ge_de_ol" v-model="bank_selected" placeholder="Please select" aria-required="true">
                              <el-option v-for="(item,index) in operatorBankAccountList" :label="item.BankName" :key="item.BankId" :value="item.BankId "></el-option>
                          </el-select>                                              
                        </div> 

                        <div class="form-group">
                            <span>Product Name</span>
                          <el-select class="form-control2 _ge_de_ol" v-model="product_selected" @change="onChange" placeholder="Please select" aria-required="true">
                              <el-option v-for="(item,index) in productList" :label="item.ProductName" :key="item.ProductCode" :value="item.ProductCode"></el-option>
                          </el-select>                                              
                        </div> 

                        <div v-if="promotionResult">
                            <div class="form-group">
                                <span>Product Promotion</span>
                                <el-select class="form-control2 _ge_de_ol" v-model="product_promotion_selected" placeholder="Please select" aria-required="true">
                                    <el-option v-for="(item,index) in productPromotionList" :label="item.Title" :key="item.Id" :value="item.Id"></el-option>
                                </el-select>                                              
                            </div> 
                        </div>
                        <div v-else>
                            <div class="form-group">
                                <span>Promotion</span>
                                <el-select class="form-control2 _ge_de_ol" v-model="promotion_selected" placeholder="Please select" aria-required="true">
                                    <el-option v-for="(item,index) in promotionList" :label="item.Title" :key="item.Id" :value="item.Id"></el-option>
                                </el-select>                                              
                            </div>
                        </div>

                        <div class="form-group">
                            <span>Deposit Amount</span>
                            <Field class="form-control2 _ge_de_ol" name="amount_deposit" type="text" inputmode="numeric" pattern="/d+" placeholder="Enter Deposit Amount" :rules="validateDepositAmount" autocomplete="off" />
                            <ErrorMessage name="amount_deposit" style="color:red"/>
                        </div>


                        <div class="form-group">
                          <div class="btn_uy">
                            <button>{{ $t("common.submit")  }}</button>
                          </div>
                        </div>

                    </div>
                </Form>
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
                promotionResult : false,
                operatorBankAccountList : {},
                productList:[],
                promotionList:[],
                productPromotionList:[],
                bank_selected:"",
                product_selected :"",
                promotion_selected :"",
                product_promotion_selected : ""
            }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.deposit")
           this.description = t("title.deposit_description")
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
           this.GetDepositDetails()
        },
        methods:{
            //GET /api/v1/GetDepositDetails
            GetDepositDetails : function(params){
                axios.get('GetDepositDetails', {}, {headers} ).then(response => {
                    if(response.data.ResponseCode == "0"){
                       // console.log(response.data);
                       this.operatorBankAccountList = response.data.OperatorBankAccountList
                        //this.productList = response.data.ProductList

                        if(response.data.ProductList.length > 0){
                            this.productList.push({ ProductName : "Please select", Id : "" , ProductCode : ""})
                            response.data.ProductList.forEach( value =>{
                                this.productList.push({ ProductName : value.ProductName , ProductCode : value.Id , Id : value.Id  })
                            })
                        }

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
            onSubmit(values){
                const prodCode = this.product_selected 
                axios.post( 'Deposit', {
                    DepositBankId     : this.bank_selected,
                    DepositBankCode   : "",
                    DepositAmount     : values.amount_deposit,
                    ProductId         : this.product_selected,
                    ProductCode       : prodCode,
                    ProductPromotionId: this.product_promotion_selected,
                    PromotionId       : this.promotion_selected,
                    PromotionCode     : ""
                }, { headers } ).then(response => {
                    //console.log(response.data)
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
                }).catch(error => { console.error(error); });
            },
            onChange(prod_code){
                
                const product_selected2 = []
                this.productList.forEach(value =>{
                    if(value.ProductCode === prod_code){
                        product_selected2.push(value)
                    }
                })

                axios.post('GetProductPromoList', {
                    "ProductId": product_selected2[0].Id,
                    "ProductCode": product_selected2[0].ProductCode,
                    "IsLaunchGame": true
                }, {headers})
                .then(response => {
                    if(response.data.ResponseCode == "0"){
                        this.productPromotionList = []
                        if(response.data.ProductPromotionList.length > 0){
                            this.productPromotionList.push({ Title : "Please select", Id : ""})
                            response.data.ProductPromotionList.forEach( value =>{
                                this.productPromotionList.push({ Title : value.Title , Id : value.Id })
                            })
                            this.promotion_selected =""
                            this.promotionResult = true
                        } else {
                            this.product_promotion_selected =""
                            this.promotionResult = false
                        }
                    }
                }).catch(error => { console.error(error); })
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
            Header 
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