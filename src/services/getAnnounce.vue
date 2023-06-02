<template>
    <!-- <marquee-text v-for="(slide, index ) in AnnouncementList" :key="index" :duration="1"></marquee-text> -->
    <MarqueeText :repeat="4"><span>{{ AnnouncementText }}</span></MarqueeText>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js'
import MarqueeText from 'vue-marquee-text-component'

let headers = {
     "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

export default{
       data(){
          return{
           AnnouncementText: ""
          }
       },
       created(){
           this.getAnnounce();
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
       },
       methods:{
          getAnnounce : function(params){
            axios.get( 'GetAnnouncement', { } , {headers} ).then(response => {
              for(let i=0 ; i < response.data.AnnouncementList.length ; i++){
                 this.AnnouncementText = this.AnnouncementText + response.data.AnnouncementList[i].Content + " , "
              }
            })
            .catch(error => {
              console.error(error);
            });
          }
        }, 
        components: {
            MarqueeText
        }
   }
</script>

<style></style>