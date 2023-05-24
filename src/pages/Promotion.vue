<template>
    <Header :title="title" :description="description"/>
      <!-- Section-->
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                <div>
                    <div class="card" @click="showAll(category)">
                            <h5 class="fw-bolder btn btn-outline-dark mt-auto">Show All</h5>
                    </div>
                    <div v-for="(item,index) of promotionCategory" :key="index" @click="filterArticle(item.ParentId)">
                        <div class="card">
                            <h5 class="fw-bolder btn btn-outline-dark mt-auto">{{ item.CategoryName }}</h5>
                        </div>
                    </div>
                </div>

                <div class="col mb-5" v-for="(item,index) of filteredArticles" :key="index">
                        <div class="card h-100">
                            <img class="card-img-top" :src="item.Image " alt="{{ item.Title }}" />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{{ item.Title }}</h5>
                                </div>
                            </div>
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
    
    
    let headers = { 
       "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
    };

    export default {
        data(){
            return{
                title : "",
                description : "",
                promotionList:{},
                promotionCategory:{},
                selectedArticle: null,
            }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.promotion")
           this.description = t("title.promotion_description")
           this.getPromotion()
           this.getPromotionCategoryList()
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
        },
        methods:{
                getPromotion : function(params){
                    axios.get( 'GetPromotionNews', {}, {headers} ).then(response => {
                        if(response.data.ResponseCode == "0"){
                            this.promotionList = response.data.PromotionNewsList
                        }
                    })
                    .catch(error => {
                      console.error(error);
                    });
                },
                getPromotionCategoryList : function(params){     
                    axios.get( 'GetPromotionCategoryList', {}, {headers}).then(response => {
                        if(response.data.ResponseCode == "0"){
                            this.promotionCategory = response.data.PromotionCategoryList
                        }
                    })
                    .catch(error => {
                      console.error(error);
                    });
                },
                filterArticle(category) {
                  // Set selectedArticle data to
                  // selected category's name
                  this.selectedArticle = category;
                },
                showAll() {
                  this.selectedArticle = null;
                },
        },
        computed: {
            filteredArticles() {
              // If selectedArticle is equal to null
              // display all data

                const data = this.selectedArticle
                  ? this.promotionList.filter((item) =>  { 
                    const data =  item.CategoryType.match(this.selectedArticle.toString())
                    if(data != null ){
                        return true
                    }
                  } )
                  : this.promotionList;

                //   const data = this.selectedArticle
                //   ? this.promotionList.filter((item) =>  item.CategoryType === this.selectedArticle.toString()   )
                //   : this.promotionList;

              return data;
            }
        },
        components:{
            Header
        }
    }
    </script>
    
