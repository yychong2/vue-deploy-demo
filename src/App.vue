

<template>
  <div class="hero route bg-image">
  
    <!-- <HomePage></HomePage> -->
 

  <div >
    <a href="#/">Home</a> |
    <a href="#/login">Login</a> |
    <a href="#/about">About</a> |
    <a href="#/non-existent-path">Broken Link</a>
  </div>

  <div>
    <component :is="currentView" />
  </div>
  
   </div>
</template>

<script>

// import HomePage from './components/HomePage.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/NotFound.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/login':Login,
  '/NotFound' : NotFound
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}

</script>

<style scoped>
.bg-image{
  background-color: black;
  min-height: 100vh;
}
</style>
