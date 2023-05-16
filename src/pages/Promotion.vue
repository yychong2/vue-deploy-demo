<template>
    <Header :title="title" :description="description"/>
      <!-- Section-->
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                <div>
                    <div v-for="(item,index) of promotionCategory" :key="index">
                        <div class="card">
                            <h5 class="fw-bolder btn btn-outline-dark mt-auto">{{ item.CategoryName    }}</h5>
                        </div>
                    </div>
                </div>

                <div class="col mb-5" v-for="(item,index) of promotionList" :key="index">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" :src="item.Image " alt="{{ item.Title }}" />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{ item.StartOnLocalStr    }}</h5>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View Promotion</a></div>
                            </div>
                        </div>
                </div>

            </div>
        </div>
     </section>
</template>
    
    <script>
    import axios from 'axios';
    import { useI18n } from 'vue-i18n'
    import Header from '../components/header.vue'
    import CryptoJS from 'crypto-js'
    
    axios.defaults.withCredentials = true;
    
    export default {
        data(){
            return{
                title : "",
                description : "",
                promotionList:{},
                promotionCategory:{}
            }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.promotion")
           this.description = t("title.promotion_description")
           this.getPromotion()
           this.getPromotionCategoryList()
        },
        methods:{
                getPromotion : function(params){
                    axios.defaults.headers.common['Content-Type'] = "application/json";
                    axios.defaults.headers.common['Language'] = "en-US";
                    //axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(toRaw(this.memDetail)) ;
                    axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                    axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");
    
                    const headers = { 
                        "Content-Type": "application/json",
                        "Language":"en-US",
                        "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                        "Authorization" : axios.defaults.headers.common['Authorization']
                    };

                    axios.get(this.apiUrl+ 'GetPromotionNews', {}, {headers}
                    ).then(response => {
                       //console.log(response.data)
                        this.promotionList = response.data.PromotionNewsList
                       //console.log(this.promotionList)
                    })
                    .catch(error => {
                      console.error(error);
                    });
                },//GET /api/v1/GetPromotionCategoryList
                getPromotionCategoryList : function(params){
                    axios.defaults.headers.common['Content-Type'] = "application/json";
                    axios.defaults.headers.common['Language'] = "en-US";
                    //axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(toRaw(this.memDetail)) ;
                    axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                    axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");
    
                    const headers = { 
                        "Content-Type": "application/json",
                        "Language":"en-US",
                        "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                        "Authorization" : axios.defaults.headers.common['Authorization']
                    };

                    axios.get(this.apiUrl+ 'GetPromotionCategoryList', {}, {headers}
                    ).then(response => {
                        //console.log(response.data)
                        this.promotionCategory = response.data.PromotionCategoryList
                        //console.log(this.promotionList)
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }
        },
        components:{
            Header
        }
    }
    </script>
    