<template>

     <div class="container px-5 my-5">
         <div class="row gx-5">
             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'deposit'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/9.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.pay")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'depositpg'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/1.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.pay")  }} PG</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'withdrawal'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/5.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.receive")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'transfer'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/8.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.transfer")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'bank'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/4.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.bank")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'password'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/3.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.password")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'history'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.history")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'voucher'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/6.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.voucher")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'referrer'})">
                         <v-lazy-image class="img-fluid rounded-3 mb-3" src="src/assets/img/7.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.referrer")  }}</a>
                     </RouterLink>
                 </div>
             </div>
         </div>
     </div>

</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'  
  import Tr from "../i18n//translation"
  import VLazyImage from "v-lazy-image";

  export default{
        data(){
           return{
            
           }
        },
        setup(){
          return{
            Tr
          }
        },
        created(){
            
        },
        methods:{
            
        },
        components:{
          VLazyImage
        }
    }
</script>
<style module>
.v-lazy-image {
  filter: blur(20px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}
</style>