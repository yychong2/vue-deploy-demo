<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">

                <Form @submit="submitTransfer">
                    <div class="form-sub-main">
                      <div class="form-group">
                        <span>Transfer From</span>
                        <el-select class="form-control2 _ge_de_ol" v-model="productFrom" @change="onChange" clearable placeholder="Please select" >
                            <el-option v-for="(item,index) in productList" :label="item.name" :key="item.code" :value="item.code"></el-option>
                        </el-select>                                              
                      </div> 
                  
                      <div class="form-group">
                        <span>Transfer To</span>
                        <el-select class="form-control2 _ge_de_ol" clearable filterable v-model="productTo" @change="checkPromotion"  placeholder="Please select" >
                            <el-option v-for="(item,index) in productListTo" :label="item.name" :key="item.code" :value="item.code"></el-option>
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
                  
                      <div class="form-group">
                            <span>Transfer Amount</span>
                           <Field class="form-control2 _ge_de_ol" name="transferAmount" type="text" placeholder="Enter Transfer Amount" :rules="validateTransferAmount" autocomplete="off" />
                           <ErrorMessage name="transferAmount" style="color:red"/>
                      </div>

                      <div class="form-group">
                        <div class="btn_uy">
                          <button>{{$t("common.submit")}}</button>
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
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};


export default {
    data(){
        return{
            title : "",
            description : "",
            productFrom:"",
            productTo:"",
            productList:[],
            productListTo:[],
            transferAmount:"",
            productPromotionList:[],
            product_promotion_selected:"",
            promotionResult : false,
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.transfer")
       this.description = t("title.transfer_description")
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
       this.GetProductWalletFrom()
    },
    methods:{
        GetProductWalletFrom(){
            axios.get('GetProductWalletDetails', {}, {headers} ).then(response => {
                if(response.data.ResponseCode == "0"){
                    for( let i = 0 ; i < response.data.ProductList.length ; i++){
                        if( response.data.ProductList[i].IsMaintenance == false || response.data.ProductList[i].IsDrop == false ){
                            const balance = this.getProductBalance( response.data.ProductList[i].ProductCode , response.data.ProductList[i].IsSeamless , response.data.ProductList[i].IsMaintenance)
                            balance.then(result =>{ 
                                this.productList.push({ name: response.data.ProductList[i].ProductName + " - " + result , 
                                code: response.data.ProductList[i].ProductCode , 
                                id: response.data.ProductList[i].Id })           
                            })
                        }
                    }
                }
            })
            .catch(error => {
              console.error(error);
            });
        },
        onChange(code) {
            this.productListTo = []
            for(let j = 0 ; j < this.productList.length ; j++ ){
                if(code != this.productList[j].code){
                    this.productListTo.push({ name: this.productList[j].name , code: this.productList[j].code , id: this.productList[j].id })           
                }
            }
            this.productTo = ""
        },
        submitTransfer(value){

            if(this.productFrom == "" || this.productTo == ""){
                    return alert('bank selected is required');
            }

            axios.post('Transfer', {
                TransferFrom : this.productFrom ,
                TransferTo : this.productTo ,
                TransferAmount : value.transferAmount,
                ProductPromotionId : this.product_promotion_selected
                //ProductPromotionId : ""
            }, {headers})
            .then(response => {
                if(response.data.ResponseCode == "0"){
                    alert(response.data.ResponseMessage);
                }
            }).catch(error => {
                  console.error(error);
            })

        },
        async getProductBalance(productCode , isSeamless , isMaintenance){

                const response = await axios.post( 'GetBalance?productCode='+productCode+'&isSeamless='+isSeamless+'&isMaintenance='+isMaintenance, {  },{ headers })
                if(response.data == '9999' || response.data == 'null' ){
                    return "Maintanence"
                }
                else{
                    return response.data
                }
        },
        checkPromotion(prod_code){
            //this.productTo = prod.code

            const product_selected2 = []
            this.productListTo.forEach(value =>{
                if(value.code === prod_code){
                    product_selected2.push(value)
                }
            })
        
            axios.post('GetProductPromoList', {
                    "ProductId": product_selected2[0].id,
                    "ProductCode": product_selected2[0].code,
                    "IsLaunchGame": true
                }, {headers})
                .then(response => {
                    if(response.data.ResponseCode == "0"){
                        //console.log(response.data);
                        this.productPromotionList = []

                        if(response.data.ProductPromotionList.length > 0){
                            this.productPromotionList.push({ Title : "Please select", Id : ""})
                            response.data.ProductPromotionList.forEach( value =>{
                                //console.log(value)
                                this.productPromotionList.push({ Title : value.Title , Id : value.Id })
                            })

                            this.product_promotion_selected =""
                            this.promotionResult = true
                         
                        }else{
                            this.promotionResult = false
                        }
                    }
                }).catch(error => {
                      console.error(error);
                })
        },
        validateTransferAmount(value){
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