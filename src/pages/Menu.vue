<template>

     <div class="container px-5 my-5">
         <div class="row gx-5">
             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'deposit'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.pay")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'depositpg'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.pay")  }} PG</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'withdrawal'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.receive")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'transfer'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.transfer")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'bank'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.bank")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'password'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.password")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'history'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.history")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'voucher'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
                         <a class="h3 fw-bolder text-decoration-none link-dark stretched-link">{{ $t("nav.voucher")  }}</a>
                     </RouterLink>
                 </div>
             </div>

             <div class="col-lg-4">
                 <div class="position-relative mb-5 gameClick">
                     <RouterLink :to="Tr.i18nRoute({name:'referrer'})">
                         <img class="img-fluid rounded-3 mb-3" src="../assets/img/dummy2.png"  />
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
            
        }
    }
</script>
<style>
.text-center{
    color: black;
}
</style>