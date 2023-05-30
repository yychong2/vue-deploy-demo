<template>

    <Loading :loading="loading"/>

    <el-dialog v-model="centerTransferVisible" title="Transfer Wallet" width="60%" center>
      
            <Form>

                <div class="form-group">  
                      <span>Product Balance</span>   
                      <Field class="form-control2 _ge_de_ol" name="productWallet" v-model="productWallet" type="text" autocomplete="off" disabled/>
                </div> 

                <div class="form-group">
                    <span>Tranfer From</span>
                    <Field class="form-control2 _ge_de_ol" name="mainWallet" v-model="mainWallet" type="text"  autocomplete="off" disabled/>
                </div> 
             
                <div class="form-group">  
                      <span>Tranfer To</span>   
                      <Field class="form-control2 _ge_de_ol" name="transferAmount" v-model="transferAmount" type="text" placeholder="Enter Amount" autocomplete="off" />
                </div> 
            </Form>
           
         <template #footer>
           <span class="dialog-footer">
             <el-button @click="centerTransferVisible = false">{{ $t("common.cancel")  }}</el-button>
             <el-button @click="submitTransfer">{{ $t("common.transfer")  }}</el-button>
             <el-button type="primary" @click="launchGameLink">
               {{ $t("common.ignore_launch_game")  }}
             </el-button>
           </span>
         </template>
     
    </el-dialog>

     <!-- Section-->
     <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div>
                    <div v-for="(item,index) of productCategory" :key="index" @click="filterCategory(item.CategoryType)">
                        <div class="card">
                            <h5 class="fw-bolder btn btn-outline-dark mt-auto">{{ item.CategoryName }}</h5>
                        </div>
                    </div>
                </div>
                
                <div class="col mb-5" v-for="(item,index) of gameList" :key="index">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" :src="item.Image2 " alt="{{ item.ProductName }}" />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{ item.ProductName }}</h5>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" @click="LaunchGame(item.ProductCode , item.ProductType)" >View Game</a></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
     </section>

</template>

<script>
  import axios from 'axios';
  import CryptoJS from 'crypto-js'
  import Loading from '../components/Loading.vue'

  let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
  };

  export default{
        data(){
           return{
            productCategory:[
                { "CategoryName" : "Slot"  ,  "CategoryType" : "SL"   },
                { "CategoryName" : "Live Casino"  ,  "CategoryType" : "LC"   },
                { "CategoryName" : "Fishing"  ,  "CategoryType" : "FH"   },
                { "CategoryName" : "Sport"  ,  "CategoryType" : "SB"   },
            ],
            gameList:[],
            windowSize:'width=1000,height=600',
            centerTransferVisible: false,
            mainWallet : null,
            productWallet : null,
            transferAmount:null,
            gameUrl: "",
            product_code : "",
            loading : false,
           }
        },
        created(){
            this.gameCategory();
            axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
        },
        methods:{
            gameCategory : function(params){
                axios.post( 'GetProductListByCategory', {   
                  "CategoryType": "SL", "IsLaunchGame": false }
                )
                .then(response => { 

                    response.data.ProductTypeContent.forEach(item =>{
                        if( item.isHide == false && item.isDrop == false ){
                            this.gameList.push(item);
                        }
                    })

                 })
                .catch(error => { console.error(error); });
            },
            filterCategory(CategoryType){
                this.gameList = []
                axios.post( 'GetProductListByCategory', {   
                  "CategoryType": CategoryType , "IsLaunchGame": false }
                )
                .then(response => { 

                    response.data.ProductTypeContent.forEach(item =>{
                        if( item.isHide == false && item.isDrop == false ){
                            this.gameList.push(item);
                        }
                    })

                 })
                .catch(error => { console.error(error); });
            },
            LaunchGame( ProductCode , CategoryType  ){
                this.loading = true
                axios.post('LaunchGames', {   
                  "CategoryType": CategoryType, "ProductCode": ProductCode , "ProductHtml5" : "0"  , "IsLaunchGame": true }
                )
                .then(response => { 

                    /** Redirect to new Page */
                    // let resolvedRoute = this.$router.resolve({
                    //   name: "launchgame"
                    // });
                    // console.log( resolvedRoute.href)
                    //window.open( resolvedRoute.href, '_blank');
                    //this.mainWallet = response.data.WalletDetail.MainWalletBalance
                    //this.productWallet = response.data.WalletDetail.ProductWalletBalance

                    this.gameUrl = response.data.GameUrl
                    const productWallet = this.getBalance( ProductCode , "false" , "false")
                    productWallet.then(result =>{ 
                        this.loading = false
                        if(result == "Error"){
                            return alert("Error")
                        }

                        this.productWallet = result
                        this.product_code = ProductCode
                        const mainWallet = this.getBalance( "main" , "false" , "false")
                        mainWallet.then(result =>{ 
                                    this.mainWallet = result
                        })

                        this.centerTransferVisible = true
                     

                          /** min Pre Amount code */
                        // if(result > 30){
                        //     this.centerTransferVisible = false
                        //     this.launchGameLink()
                        // }
                        // else{
                        //     this.productWallet = result
                        //     this.product_code = ProductCode
                        //     const mainWallet = this.getBalance( "main" , "false" , "false")
                        //     mainWallet.then(result =>{ 
                        //                 this.mainWallet = result
                        //     })

                        //     this.centerTransferVisible = true
                        // }
                    })

                

                 })
                .catch(error => { console.error(error); this.loading = false }) 
                
            },
            submitTransfer(){
                if(this.transferAmount == null || this.transferAmount == ""){
                    return alert('Transfer Amount is required');
                }

                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);

                let headers = { 
                  "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
                };

                axios.post('Transfer', {
                    TransferFrom : "main" ,
                    TransferTo : this.product_code ,
                    TransferAmount : this.transferAmount,
                }, {headers})
                .then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage);
                        this.launchGameLink()
                    }
                }).catch(error => {
                      console.error(error);
                })
            },
            async getBalance(productCode , isSeamless , isMaintenance){

                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);

                let headers = { 
                  "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
                };

                const response = await axios.post( 'GetBalance?productCode='+productCode+'&isSeamless='+isSeamless+'&isMaintenance='+isMaintenance, {  },{ headers })
                if(response.data == '9999' || response.data == 'null' ){
                    return "Error"
                }
                else{
                    return response.data
                }
                
            },
            launchGameLink(){
                window.open(this.gameUrl, "" , this.windowSize);
                this.centerTransferVisible = false
            }
        },
        components:{
            Loading
        }
    }
</script>

<style>
.text-center{
    color: black;
}

.form-control2 {
    min-height: 50px;
    /* box-shadow: none; */
    border: 1px solid rgba(15, 14, 14, 0.3);
    padding: 10px 15px;
    background-color: transparent;
    color: black;
    width: 100%;
    margin: 0px 0px 30px 0px;
}
</style>