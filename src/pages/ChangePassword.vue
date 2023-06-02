<template>
    <Loading :loading="loading"/>

    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-key"></i></div>
                    <h1 class="fw-bolder">{{$t("title.password")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                      <Form @submit="updatePassword" id="passwordForm">
                          
                          <div class="form-floating mb-3">
                              <Field class="form-control _ge_de_ol" name="old_password" type="password" placeholder="Enter Old Passowrd" :rules="validateOldPassword" autocomplete="off" />
                              <label for="name">Old Password</label>
                              <ErrorMessage name="old_password" style="color:red"/>
                          </div>

                          <div class="form-floating mb-3">
                              <Field class="form-control _ge_de_ol" v-model="new_password" name="new_password" type="password" :rules="validateNewPassword" placeholder="Enter New Password" autocomplete="off" />
                              <label for="name">New Password</label>
                              <ErrorMessage name="new_password" style="color:red"/>
                          </div>

                          <div class="form-floating mb-3">
                              <Field class="form-control _ge_de_ol" name="confirm_password" type="password" :rules="validateConfirmPassword" placeholder="Enter Confirm Password" autocomplete="off" />
                              <label for="name">Confirm Password</label>
                              <ErrorMessage name="confirm_password" style="color:red"/>
                          </div>

                          <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("common.submit")}}</button></div>
                        
                      </Form>
                    </div>
                </div>
            </div>
          
        </div>
    </section>

</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import Loading from '../components/Loading.vue'

const headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

export default {
    data(){
        return{
            new_password:"",
            loading : false,
        }
    }, 
    created(){
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
            updatePassword(value){
                this.loading = true
                axios.post( 'ChangeUserPassword', {
                    OldPassword: value.old_password,
                    NewPassword: value.new_password,
                }, { headers }
                ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        alert(response.data.ResponseMessage)
                    }
                })
                .catch(error => { console.error(error);})
                .finally( com => {    this.loading = false  });
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
       Loading
    }
}

</script>