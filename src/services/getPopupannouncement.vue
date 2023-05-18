<template>
    
</template>
<script>
 import axios from 'axios';
 import CryptoJS from 'crypto-js'
 import { VueperSlides, VueperSlide } from 'vueperslides'
 import 'vueperslides/dist/vueperslides.css'

 export default{
       data(){
          return{
           popupAnnouncementList:[]
          }
       },
       created(){
           this.getPopupAnnoncement();
       },
       methods:{
           getPopupAnnoncement : function(params){
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

               axios.get(this.apiUrl+ 'GetPopupAnnouncement', { } , {headers} ).then(response => {
                 this.popupAnnouncementList = response.data.PopupAnnouncementList;
                 console.log(response.data.PopupAnnouncementList);
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