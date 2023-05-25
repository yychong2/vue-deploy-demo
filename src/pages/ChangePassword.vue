<template>
    <Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
           
            <Form @submit="updatePassword">
                 <div class="form-sub-main">
                     <div class="form-group">
                       <Field class="form-control _ge_de_ol" name="old_password" type="password" placeholder="Enter Old Passowrd" :rules="validateOldPassword" autocomplete="off" />
                       <ErrorMessage name="old_password" style="color:red"/>
                     </div>
                 
                     <div class="form-group">
                       <Field class="form-control _ge_de_ol" v-model="new_password" name="new_password" type="password" :rules="validateNewPassword" placeholder="Enter New Password" autocomplete="off" />
                       <ErrorMessage name="new_password" style="color:red"/>
                     </div>
                 
                     <div class="form-group">
                       <Field class="form-control _ge_de_ol" name="confirm_password" type="password" :rules="validateConfirmPassword" placeholder="Enter Confirm Password" autocomplete="off" />
                       <ErrorMessage name="confirm_password" style="color:red"/>
                     </div>

                     <div class="form-group">
                       <div class="btn_uy">
                         <button>{{$t("common.submit")}}</button>
                       </div>
                     </div>

                 </div>
             </Form>
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
            new_password:"",
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.password")
       this.description = t("title.password_description")
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
            updatePassword(value){
                axios.post( 'ChangeUserPassword', {
                    OldPassword: value.old_password,
                    NewPassword: value.new_password,
                }, { headers }
                ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
                }).catch(error => {
                   console.error(error);
                });
            },
            validateOldPassword(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
            },
            validateNewPassword(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                // All is good
                return true;
            },
            validateConfirmPassword(value){
                // if the field is empty
                if (!value) {
                  return 'This field is required';
                }

                if(value != this.new_password ){
                  return 'This field must be same with Password';
                }

                // All is good
                return true;
            }
        },
    components:{
        Header
    }
}

</script>