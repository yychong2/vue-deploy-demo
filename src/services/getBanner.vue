<template>
    <el-carousel indicator-position="outside" style="background: #212529 !important;">
      <el-carousel-item v-for="(slide, i) in bannerList" :key="i">
         <img class="" :src="slide.Image2" alt="{{ slide.ProductName }}" />
      </el-carousel-item>
    </el-carousel>
</template>


<script>
 import axios from 'axios';
 import CryptoJS from 'crypto-js'



  axios.defaults.withCredentials = true;

 export default{
      data(){
         return{
          bannerList:[]
         }
      },
      created(){
          this.getBanner();
         
      },
      methods:{
         getBanner : function(params){
            axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), "6699").toString(CryptoJS.enc.Utf8);
            axios.defaults.headers.common['Content-Type'] = "application/json";
            axios.defaults.headers.common['Language'] = "en-US";
            axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("tokenLogin");

           axios.get( 'GetBanner', { } , { 
            "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']

           } ).then(response => {
              this.bannerList = response.data.BannerList;
           })
           .catch(error => {
             console.error(error);
           });
         }
      }, 
      components: {
           
      }
   }
</script>
<style>
.text-center{
   color: black;
}
</style>