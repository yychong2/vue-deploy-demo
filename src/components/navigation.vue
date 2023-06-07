<template>

  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-5">
        <a class="navbar-brand" :to="Tr.i18nRoute({name:'home'})">{{$t("title.app_name")}}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a><RouterLink class="nav-link active" aria-current="page" :to="Tr.i18nRoute({name:'home'})">{{$t("nav.home")}}</RouterLink></a></li>
                <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'about'})">{{$t("nav.about")}}</RouterLink></a></li>
                <li class="nav-item" v-if="beforeLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'login'})">{{$t("nav.login")}}</RouterLink></a></li>
                <li class="nav-item" v-if="beforeLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'register'})">{{ $t("nav.register")  }}</RouterLink></a></li>               
                <li class="nav-item" v-if="afterLogin"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'profile'})">{{$t("nav.profile")}}</RouterLink></a></li>
                <!-- <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'language'})">{{$t("nav.loginTest")}}</RouterLink></a></li> -->
                <!-- <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'testing'})">Testing</RouterLink></a></li>   -->          
                <li class="nav-item dropdown" v-if="afterLogin">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{$t("nav.menu")}}</a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <RouterLink :to="Tr.i18nRoute({name:'menu'})">  <li><a class="dropdown-item">{{ $t("nav.all_menu")  }}</a></li></RouterLink>
                      <RouterLink :to="Tr.i18nRoute({name:'promotion'})"><li><a class="dropdown-item">{{ $t("nav.promotion")  }}</a></li></RouterLink>
                      <RouterLink :to="Tr.i18nRoute({name:'trsdetail'})"><li><a class="dropdown-item">{{ $t("nav.trs_detail")  }}</a></li></RouterLink>
                      <RouterLink :to="Tr.i18nRoute({name:'balance'})"><li><a class="dropdown-item">{{ $t("nav.balance")  }}</a></li>  </RouterLink>
                    </ul>
                </li>
                <li class="nav-item" style="cursor: pointer;" v-if="afterLogin" @click="logout"><a class="nav-link">{{$t("nav.logout")}}</a></li> 
            </ul>
            <div class="navbar-nav ms-auto mb-2 mb-lg-0">
              <LanguageSwitcher></LanguageSwitcher>
            </div>
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
    logout(){
      sessionStorage.clear("memDetail")
      sessionStorage.clear("tokenLogin")
      this.$router
      .push({ path: '/' })
      .then(() => { this.$router.go() 
      })
    }
  },
  components:{
     LanguageSwitcher
  }

}

</script>