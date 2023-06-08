<template>
    
</template>
<script>
 import axios from 'axios';
 import CryptoJS from 'crypto-js'
 import 'vueperslides/dist/vueperslides.css'

 export default{
       data(){
          return{
           popupAnnouncementList:[],
           headers : { 
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
            }
          }
       },
       created(){
           this.getPopupAnnoncement();
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
       },
       methods:{
            getPopupAnnoncement : function(params){
                axios.get('GetPopupAnnouncement', { } , this.headers ).then(response => {
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