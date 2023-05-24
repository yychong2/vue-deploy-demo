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

const headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

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
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
            updatePassword(){
                axios.post( 'ChangeUserPassword', {
                    OldPassword: this.old_password,
                    NewPassword: this.new_password,
                }, { headers }
                ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
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