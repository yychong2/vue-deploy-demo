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
                axios.defaults.headers.common['Content-Type'] = "application/json";
                axios.defaults.headers.common['Language'] = "en-US";
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] =   sessionStorage.getItem("tokenLogin");
    
                const headers = { 
                    "Content-Type": "application/json",
                    "Language":"en-US",
                    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                    "Authorization" : axios.defaults.headers.common['Authorization']
                };

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