<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
                <form @submit.prevent="submitTransferAmount">
                    <div class="form-sub-main">
                      <div class="form-group">
                        <el-select class="form-control _ge_de_ol" v-model="productFrom" @change="onChange" clearable placeholder="Please select" >
                            <el-option v-for="(item,index) in productList" :label="item.name" :key="item.code" :value="item.code"></el-option>
                        </el-select>                                              
                      </div> 
                  
                      <div class="form-group">
                        <el-select class="form-control _ge_de_ol" clearable filterable v-model="productTo"  placeholder="Please select" >
                            <el-option v-for="(item,index) in productListTo" :label="item.name" :key="item.code" :value="item.code"></el-option>
                        </el-select>                                              
                      </div> 
                  
                      <div class="form-group">
                           <input class="form-control _ge_de_ol" v-model="transferAmount" type="text" placeholder="Enter Transfer Amount" required="" >
                      </div>

                      <div class="form-group">
                        <div class="btn_uy">
                          <button type="submit" @click="submitTransfer">{{$t("common.submit")}}</button>
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
            transferAmount:""
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.transfer")
       this.description = t("title.transfer_description")
       this.GetProductWalletFrom()
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
        GetProductWalletFrom(){
                axios.get('GetProductWalletDetails', {}, {headers}
                ).then(response => {
                    //console.log(response.data.ProductList.length)
                    for( let i = 0 ; i < response.data.ProductList.length ; i++){
                        if( response.data.ProductList[i].IsMaintenance == false || response.data.ProductList[i].IsDrop == false ){
                            const balance = this.getProductBalance( response.data.ProductList[i].ProductCode , response.data.ProductList[i].IsSeamless , response.data.ProductList[i].IsMaintenance)
                            balance.then(result =>{ 
                                this.productList.push({ name: response.data.ProductList[i].ProductName + " - " + result , code: response.data.ProductList[i].ProductCode })           
                            })
                        }
                    }
                    //this.productList = response.data.ProductList
                    //console.log(this.productList)
                })
                .catch(error => {
                  console.error(error);
                });
        },
        onChange(code) {
            this.productListTo = []
            for(let j = 0 ; j < this.productList.length ; j++ ){
                if(code != this.productList[j].code){
                    this.productListTo.push({ name: this.productList[j].name , code: this.productList[j].code })           
                }
            }
            this.productTo = ""
        },
        submitTransfer(){
            axios.post('Transfer', {
                TransferFrom : this.productFrom ,
                TransferTo : this.productTo ,
                TransferAmount : this.transferAmount,
                //ProductPromotionId : ""
            }, {headers})
            .then(response => {
                alert(response.data.ResponseMessage);
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
        }
    },
    components:{
        Header
    }

}


</script>