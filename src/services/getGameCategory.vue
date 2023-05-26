<template>
     

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
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" @click="LaunchGame(item.ProductCode , item.ProductType)" href="#">View Game</a></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
     </section>

</template>

<script>
  import axios from 'axios';
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
           }
        },
        created(){
            this.gameCategory();
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
                axios.post('LaunchGames', {   
                  "CategoryType": CategoryType, "ProductCode": ProductCode , "ProductHtml5" : "0"  , "IsLaunchGame": true }
                )
                .then(response => { 
                    console.log(response.data)
                    var GameUrl = response.data.GameUrl
                    window.open(GameUrl, '_blank');
                 })
                .catch(error => { console.error(error); });

            }
        }
    }
</script>

<style>
.text-center{
    color: black;
}
</style>