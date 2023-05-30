<template>
              

<Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <div class="container">
               
               
                


    
              
            </div>
        </div>
    </section>
</template>


<script>
    import axios from 'axios';
    import { useI18n } from 'vue-i18n'
    import Header from '../components/header.vue'
    import CryptoJS from 'crypto-js'
  
    
    let headers = { 
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'], 
    };

    export default {
        data(){
            return{
                title : "",
                description : "",
            }
        }, 
        created(){
           const { t } = useI18n()
           this.title = t("title.deposit")
           this.description = t("title.deposit_description")
           axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
           this.GetDepositDetails()
        },
        methods:{
            //GET /api/v1/GetDepositDetails
            GetDepositDetails : function(params){
            
                axios.get('GetDepositDetails', {}, {headers} ).then(response => {
                    console.log(response.data);
                    if(response.data.ResponseCode == "0"){
                       // console.log(response.data);
                    }
                })
                .catch(error => {
                  console.error(error);
                });
            },
        },
        components:{
            Header 
        }
    }
</script>

