

<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-4 px-lg-5">
      <RouterLink class="navbar-brand" to="/">Start Demo</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
      aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item"><a><RouterLink class="nav-link active" aria-current="page" :to="Tr.i18nRoute({name:'home'})">{{$t("nav.home")}}</RouterLink></a></li>
            <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'about'})">{{$t("nav.about")}}</RouterLink></a></li>
            <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'login'})">{{$t("nav.login")}}</RouterLink></a></li>
            <li class="nav-item"><a><RouterLink class="nav-link" :to="Tr.i18nRoute({name:'language'})">{{$t("nav.loginTest")}}</RouterLink></a></li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{$t("nav.shop")}}</a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#!">All Products</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                    <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                </ul>
            </li>
        </ul>
        <form class="d-flex">
            <LanguageSwitcher></LanguageSwitcher>
            <!-- <button class="btn btn-outline-dark" type="submit">
                <i class="bi-cart-fill me-1"></i>
                Cart
                <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </button> -->
        </form>
      </div>
    </div>
  </nav>

  <RouterView />

  <Footer />

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/footer.vue'
import LanguageSwitcher from "./components/LanguageSwitcher.vue"
import Tr from "./i18n/translation"

export default{
  setup(){
    return{
      Tr
    }
  },
  components:{
    Footer, LanguageSwitcher
  }
}
</script>

<style scoped>

</style>
