<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <form @submit.prevent="submitChangePassword">
                  <div class="form-sub-main">
                
                    <div class="form-group">
                        <input class="form-control _ge_de_ol" v-model="old_password" type="password" placeholder="Enter Old Passowrd" required="" aria-required="true">
                    </div>

                    <div class="form-group">
                        <input class="form-control _ge_de_ol" v-model="new_password" type="password" placeholder="Enter New Password" required="" aria-required="true">
                    </div>
                
                    <div class="form-group">
                        <input class="form-control _ge_de_ol" v-model="confirm_password" type="password" placeholder="Enter Confirm Password" required="" aria-required="true">
                    </div>
                
                    <div class="form-group">
                      <div class="btn_uy">
                        <button type="submit" @click="updatePassword" :disabled="new_password != confirm_password">{{$t("common.submit")}}</button>
                      </div>
                    </div>
                
                  </div>
            </form>
        </div>
    </section>
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
            old_password:"",
            new_password:"",
            confirm_password:""
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.password")
       this.description = t("title.password_description")
    },
    methods:{
            updatePassword(){
                //POST /api/v1/AddBankAccount

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

                axios.post( this.apiUrl +'ChangeUserPassword', {
                    OldPassword: this.old_password,
                    NewPassword: this.new_password,
                }, { headers }
                ).then(response => {
                    //this.afterResult = true
                    console.log(response.data);
               
               }).catch(error => {
                  console.error(error);
               });

            }
        },
    components:{
        Header
    }
}

</script>