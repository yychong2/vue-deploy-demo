<template>
     <!-- Section-->
     <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.pay")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'home'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.transfer")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'home'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.receive")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'withdrawal'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.bank")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'bank'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.password")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'password'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.history")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'history'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{{ $t("nav.voucher")  }}</h5>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" >
                                <RouterLink :to="Tr.i18nRoute({name:'voucher'})">View</RouterLink></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </section>

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