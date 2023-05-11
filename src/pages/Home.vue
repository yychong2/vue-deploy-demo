<template>

    <Header :title="title" :description="description"/>
    
    
    <div v-if="afterLogin">
        <gameCategory/>
    </div>
    <div v-else>
        <section class="form-01-main">
          <div class="form-cover">
          <div class="container">

            <div class="row youtube-border">
              <div class="col-md-12 ">
                <vue-plyr>
                  <div class="plyr__video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/8Fkb5ZTu07c?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
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
        </section>
    </div>



   

</template>

<script>
    import Header from '../components/header.vue'
    import { useI18n } from 'vue-i18n'
    import gameCategory from '../services/getGameCategory.vue';

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
                console.log(this.afterLogin)
            }

        },
        methods:{},
        components:{
            Header , gameCategory
        }
    }
</script>

<style>
.card-img-top{
    max-height: 160px;
    min-height: 160px;
}

.form-01-main{
   height: 804px !important;
}

.btn_uy button{
    padding: 10px 20px;
    background: #37a000;
    text-transform: uppercase;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    line-height: normal;
    border-radius: 5px;
    color: #fff;
    width: 100%;
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.youtube-border{
    margin-top: 60px !important;
}

</style>