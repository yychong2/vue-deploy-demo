

<template>

  
  <Navigation></Navigation>
  <RouterView ></RouterView>
  <Footer />

</template>

<script>

import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/footer.vue'
import Navigation from './components/navigation.vue'

export default{
  components:{
    Footer, Navigation
  }

}
</script>
