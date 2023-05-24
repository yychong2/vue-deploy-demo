<template>
    <vueper-slides fade autoplay duration=5000>
      <vueper-slide v-for="(slide, i) in bannerList" :key="i" 
         :image="slide.Image2"
        >
      </vueper-slide>
    </vueper-slides>
    
</template>


<script>
 import axios from 'axios';
 import CryptoJS from 'crypto-js'
 import { VueperSlides, VueperSlide } from 'vueperslides'
 import 'vueperslides/dist/vueperslides.css'

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
            axios.get(this.apiUrl+ 'GetBanner', { } , {headers} ).then(response => {
              this.bannerList = response.data.BannerList;
              //console.log(this.bannerList);
            })
            .catch(error => {
              console.error(error);
            });
          }
        }, 
        components: {
            VueperSlides, VueperSlide
        }
   }
</script>
<style>
.text-center{
   color: black;
}
</style>