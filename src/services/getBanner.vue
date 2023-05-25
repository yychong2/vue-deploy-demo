<template>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(slide, i) in bannerList" :key="i">
         <img class="" :src="slide.Image2" alt="{{ slide.ProductName }}" />
      </el-carousel-item>
    </el-carousel>
</template>


<script>
 import axios from 'axios';
 import CryptoJS from 'crypto-js'

  let headers = { 
     "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
  };

 export default{
      data(){
         return{
          bannerList:[]
         }
      },
      created(){
          this.getBanner();
          axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), "6699").toString(CryptoJS.enc.Utf8);
      },
      methods:{
         getBanner : function(params){
           axios.get( 'GetBanner', { } , { headers} ).then(response => {
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