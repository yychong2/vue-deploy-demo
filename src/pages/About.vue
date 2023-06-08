<template>
  <Header :title="title" :description="description"/>

     <!-- About section one-->
     <section class="py-5 bg-light" id="scroll-target">
         <div class="container px-5 my-5">
             <div class="row gx-5 align-items-center">
                 <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src="../assets/img/about-1.png" alt="..." /></div>
                 <div class="col-lg-6">
                     <h2 class="fw-bolder">Story One</h2>
                     <p class="lead fw-normal text-muted mb-0">{{$t("about.content1")}}</p>
                 </div>
             </div>
         </div>
     </section>

     <!-- About section two-->
     <section class="py-5">
         <div class="container px-5 my-5">
             <div class="row gx-5 align-items-center">
                 <div class="col-lg-6 order-first order-lg-last"><img class="img-fluid rounded mb-5 mb-lg-0" src="../assets/img/about-2.png" alt="..." /></div>
                 <div class="col-lg-6">
                     <h2 class="fw-bolder">Story Two</h2>
                     <p class="lead fw-normal text-muted mb-0">{{$t("about.content2")}}</p>
                 </div>
             </div>
         </div>
     </section>

      <!-- About section one-->
      <section class="py-5 bg-light" id="scroll-target">
         <div class="container px-5 my-5">
             <div class="row gx-5 align-items-center">
                 <div class="col-lg-6"><img class="img-fluid rounded mb-5 mb-lg-0" src="../assets/img/about-3.png" alt="..." /></div>
                 <div class="col-lg-6">
                     <h2 class="fw-bolder">Story Three</h2>
                     <p class="lead fw-normal text-muted mb-0">{{$t("about.content3")}}</p>
                 </div>
             </div>
         </div>
     </section>

</template>

<script>

    import Header from '../components/header.vue'
    import { useI18n } from 'vue-i18n'

    export default{
        data(){
            return{}
        //     const { t } = useI18n()
        //    return{
        //     title : t("title.about"),
        //             description : t("title.about_description"),
        //    }
        },
        methods:{
            
        },
        components:{
            Header
        },
        setup(){
           const { t } = useI18n()
           return{
            title : t("title.about"),
            description : t("title.about_description"),
           }
        }
    }
</script>

<style></style>