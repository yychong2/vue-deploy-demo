<template>

    <el-dialog v-model="centerDialogVisible" :title="title" width="60%" center>
      
      <div v-html="detail" style="margin: auto;"></div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{ $t("common.cancel")  }}</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            {{ $t("common.confirm")  }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Section-->
    <section class="py-5">
    
      
      <nav class="horizontal-menu plain">
        <ul>
          <li @click="showAll(category)" class="active"><a>Show All</a></li>
          <li v-for="(item,index) of promotionCategory" 
          :key="index" @click="filterArticle(item.ParentId)"><a>{{ item.CategoryName }}</a></li>
        </ul>
      </nav>
        
    
      <div class="container px-5 my-5">
            <div class="row gx-5">
                <div class="col-lg-6" v-for="(itemPromotion,index) of filteredArticles" :key="index">
                    <div class="position-relative mb-5 gameClick">
                        <img class="img-fluid rounded-3 mb-3" :src="itemPromotion.Image " alt="{{ itemPromotion.Title }}" />
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
    
    let headers = { 
       "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
    };

    export default {
        data(){
            return{
                promotionList:{},
                promotionCategory:{},
                selectedArticle: null,
                detail:"",
                title : "",
                centerDialogVisible :false,
                activeName : "show_all"
            }
        }, 
        created(){
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
                viewDetail(id){
                    this.promotionList.forEach( (item) =>{
                        if(item.ParentId === id){
                            this.detail= item.Content
                            this.title = item.Title
                            this.centerDialogVisible = true
                        }
                    })
                }
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
        components:{}
    }
    </script>

<style>
    .dialog-footer button:first-child {
      margin-right: 10px;
    }

    ul {
    	list-style: none;
    }

    a {
    	color: #bebebe;
    	text-decoration: none;
      cursor: pointer;
    }


 </style>