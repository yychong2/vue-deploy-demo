<template>
    <div v-if="afterLogin">
        <getBanner/>
        <getAnnounce/>
        <gameCategory/>
    </div>
    <div v-else>
      
      <!-- Header-->
      <header class="bg-dark py-5">
          <div class="container px-5">
              <div class="row gx-5 align-items-center justify-content-center">
                  <div class="col-lg-8 col-xl-7 col-xxl-6">
                      <div class="my-5 text-center text-xl-start">
                          <h1 class="display-5 fw-bolder text-white mb-2">Start Demo</h1>
                          <p class="lead fw-normal text-white-50 mb-4">Early in the day it was whispered that we should sail in a boat, only thou and I, 
                            and never a soul in the world would know of this our pilgrimage to no country and to no end.</p>
                      </div>
                  </div>
                  <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                    <img class="img-fluid rounded-3 my-5" src="../assets/img/dummy.png" alt="..." />
                  </div>
              </div>
          </div>
      </header>

      <!-- Features section-->
      <section class="py-5" id="features">
          <div class="container px-5 my-5">
                <div class="row gx-5">
                    <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">Best Friend - ALin cover</h2></div>
                    <div class="col-lg-8">
                        <div class="row gx-5 row-cols-1 ">
                            <div class="col mb-5 h-100">
                              <vue-plyr>
                                <div class="plyr__video-embed">
                                  <iframe
                                    src="https://www.youtube.com/embed/ge0ahqnv8fY?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                                    allowfullscreen
                                    allowtransparency
                                    allow="autoplay"
                                  ></iframe>
                                </div>
                              </vue-plyr>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </section>
    </div>
</template>

<script>
    import Header from '../components/header.vue'
    import { useI18n } from 'vue-i18n'
    import gameCategory from '../services/getGameCategory.vue';
    import getBanner from '../services/getBanner.vue'
    import getAnnounce from '../services/getAnnounce.vue'

    export default{
        data(){
           return{
            title : "",
            description : "",
            afterLogin: false,
           }
        },
        setup(){
        
        },
        created(){
            const { t } = useI18n()
            this.title = t("title.home")
            this.description = t("title.home_description")

            const token = sessionStorage.getItem("tokenLogin")
            if(token != null){
                this.afterLogin= true
            }

        },
        methods:{},
        components:{
            Header , gameCategory,getBanner,getAnnounce
        }
    }
</script>

<style>
  

</style>