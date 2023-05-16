<template>
<Header :title="title" :description="description"/>


<section class="form-01-main">
      <div class="form-cover">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div style="margin-top: 80px;">
                <div style="overflow-wrap: break-word ; color: white;">
                    <!-- <p>{{ indexes }}</p> -->
                    <!-- <div class="btn_uy">
                        <button type="button" @click="GetUserProfile">Click Profile Detail</button>
                    </div> -->
                    <p >Profile Detail :{{ memProfile }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</section>

<div style="overflow-wrap: break-word ; color: white;">
   
    <p >Profile Detail :{{ memProfile }}</p>
</div>

</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import Header from '../components/header.vue'
import CryptoJS from 'crypto-js'

axios.defaults.withCredentials = true;

export default {
    data(){
        return{
            title : "",
            description : "",
            memProfile:{}
        }
    }, 
    created(){
      const { t } = useI18n()
      this.title = t("title.profile")
      this.description = t("title.profile_description")
      this.getProfile()
    },
    methods:{
            getProfile : function(params){
                axios.defaults.headers.common['Content-Type'] = "application/json";
                //axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(toRaw(this.memDetail)) ;
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("tokenLogin");

                const headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                "Authorization" : axios.defaults.headers.common['Authorization']
                };

                axios.get(this.apiUrl+ 'GetUserProfile', {}, {headers}
                ).then(response => {
                    this.memProfile = response.data.UserDetail
                })
                .catch(error => {
                  console.error(error);
                });
            }
    },
    components:{
        Header
    }
}
</script>