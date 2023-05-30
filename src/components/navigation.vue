<template>

  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light" >
      <div class="container px-4 px-lg-5">
        <RouterLink class="navbar-brand" :to="Tr.i18nRoute({name:'home'})">{{$t("title.app_name")}}</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
        aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li class="nav-item"><a><RouterLink class="nav-link active" aria-current="page" :to="Tr.i18nRoute({name:'home'})">{{$t("nav.home")}}</RouterLink></a></li>
              <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'about'})">{{$t("nav.about")}}</RouterLink></a></li>
              <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'language'})">{{$t("nav.loginTest")}}</RouterLink></a></li>
              <li class="nav-item" v-if="beforeLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'login'})">{{$t("nav.login")}}</RouterLink></a></li>
              <li class="nav-item" v-if="beforeLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'register'})">{{ $t("nav.register")  }}</RouterLink></a></li>  
              <li class="nav-item" v-if="afterLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'profile'})">{{$t("nav.profile")}}</RouterLink></a></li>
              <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'testing'})">Testing</RouterLink></a></li>  

              <li class="nav-item dropdown" v-if="afterLogin">
                  <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{$t("nav.menu")}}</a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item"><RouterLink :to="Tr.i18nRoute({name:'menu'})">{{ $t("nav.all_menu")  }}</RouterLink></a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item"><RouterLink :to="Tr.i18nRoute({name:'promotion'})">{{ $t("nav.promotion")  }}</RouterLink></a></li>
                      <li><a class="dropdown-item"><RouterLink :to="Tr.i18nRoute({name:'trsdetail'})">{{ $t("nav.trs_detail")  }}</RouterLink></a></li>
                      <li><a class="dropdown-item"><RouterLink :to="Tr.i18nRoute({name:'balance'})">{{ $t("nav.balance")  }}</RouterLink></a></li>  
                  </ul>
              </li>
          </ul>
          <form class="d-flex">
              <LanguageSwitcher></LanguageSwitcher>
          </form>
        </div>
      </div>
  </nav>

</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue"
import Tr from "../i18n/translation"

export default{
  setup(){
    return{
      Tr,
      beforeLogin: true,
      afterLogin: false,
    }
  },
  created(){
      const token = sessionStorage.getItem("tokenLogin")
      if(token != null){
          this.afterLogin= true
          this.beforeLogin=false
      }
  },
  methods:{
  },
  components:{
     LanguageSwitcher
  }

}

</script>