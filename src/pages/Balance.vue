<template>

    <div class="container px-5 my-5">
        <div v-show="show">
            <EasyDataTable :headers="headers"  :items="balanceList" />
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'


let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};


export default {
    data(){
        const { t } = useI18n()
        return{
            status: t("common.maintenance"),
            loading: t("common.loading"),
            balanceList:[],
            headers : [
                          { text: "Product Name", value: "ProductName" },
                          { text: "Balance", value: "ProductWalletBalance"}
            ],
            show:false
            
        }
    }, 
    created(){
       this.GetProductWalletDetails()
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
            GetProductWalletDetails(){
                axios.get( 'GetProductWalletDetails', {}, {headers}
                ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        //console.log( response.data.ProductList )
                        response.data.ProductList.forEach( (value) => {
                            this.balanceList.push(
                                 {  ProductName : value.ProductName ,
                                    ProductCode : value.ProductCode ,
                                    IsSeamless : value.IsSeamless,
                                    IsMaintenance : value.IsMaintenance,
                                    ProductWalletBalance : this.loading
                                 }
                            )
                        });
                        for( let i = 0 ; i < this.balanceList.length ; i++){
                            const balance = this.getProductBalance(this.balanceList[i].ProductCode , this.balanceList[i].IsSeamless , this.balanceList[i].IsMaintenance)

                            balance.then(result =>{ 
                                    this.balanceList[i].ProductWalletBalance = result
                            })
                        }
                        this.show = true
                    }
                })
                .catch(error => {
                  console.error(error);
                });
            },
            async getProductBalance(productCode , isSeamless , isMaintenance){
                const response = await axios.post( 'GetBalance?productCode='+productCode+'&isSeamless='+isSeamless+'&isMaintenance='+isMaintenance, {  },{ headers })
                        
                if(response.data == '9999' || response.data == 'null' ){
                    return this.status
                }
                else{
                    return response.data
                }
            }
    },  
    components:{ }
}
</script>