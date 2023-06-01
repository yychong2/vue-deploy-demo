<template>
   
    <Loading :loading="loading"/>
  
    <!-- Page content-->
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-person-square"></i></div>
                    <h1 class="fw-bolder">{{$t("common.login")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">

                      <Form @submit="onSubmit" id="loginForm">
                            <div class="form-floating mb-3">
                                <Field class="form-control" name="Username" type="text" placeholder="Enter Username" :rules="validateUsername" autocomplete="off" />
                                <label for="name">Username</label>
                                <ErrorMessage name="Username" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control " name="Password" type="password" :rules="validatePassword" placeholder="********" autocomplete="off" />
                                <label for="name">Password</label>
                                <ErrorMessage name="Password" style="color:red"/>
                            </div>

                            <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("common.login")}}</button></div>
                      </Form>

                    </div>
                </div>
            </div>
          
        </div>
    </section>
 
</template>

<script>
import axios from 'axios';
import { isProxy, toRaw , reactive, ref  } from 'vue';
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import Loading from '../components/Loading.vue'

export default {
    data(){
        return{
            loading : false,
        }
    },
    created(){},
    methods: {
        onSubmit(values){

          this.loading = true
          axios.post( 'auth', { Username: values.Username , Password: values.Password },{}
            ).then(response => {
              //console.log(response.data.MemberDetail);

              const userId = "{'Username': '" + response.data.MemberDetail.Username +
              "','UserId': '"+ response.data.MemberDetail.UserId +
              "', 'UserGroup': '" + response.data.MemberDetail.UserGroup +
              "', 'IpAddress': '" + response.data.MemberDetail.IpAddress +
              "', 'PlayerType': '" + response.data.MemberDetail.PlayerType + "'}";    

              sessionStorage.setItem("memDetail", CryptoJS.AES.encrypt(userId, this.aesKey))
              sessionStorage.setItem("tokenLogin", 'Bearer ' + response.data.AccessToken)
              //this.token = response.data.AccessToken
              //console.log(CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8))
              //this.tokenSwitch = true;
             
              location.reload();
            })
            .catch(error => {  console.error(error);  })
            .finally( com => {    this.loading = false  });
        },
        validateUsername(value) {
          // if the field is empty

          if (!value) {
            return 'This field is required';
          }
        
          // if the field is not a valid email
          const regex = /^[a-zA-Z0-9]{3,18}$/i;
          if (!regex.test(value)) {
            return 'This field must be a valid Username';
          }
        
          // All is good
          return true;
        },
        validatePassword(value){
          if (!value) {
            return 'This field is required';
          }

          const regex = /^[a-zA-Z0-9]{3,16}$/i;
          if (!regex.test(value)) {
            return 'This field must be a valid Password';
          }
        
          // All is good
          return true;
        }
    },
    components:{
       Loading
    },
    computed:{
    },
   
};


</script>


<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading{
    z-index: 99999;
    background: black;
    opacity: 0.8;
    margin-top: -5%;
    height: 103%;
    width: 100%;
    position: fixed;
    overflow: hidden;
}

.shape{
    /* width: 50%; */
    /* height: 50%; */
    margin: 20% 0 0% 42%;
}

@media only screen and (max-width: 600px) {
  .loading{
    z-index: 99999;
    background: black;
    opacity: 0.8;
    margin-top: -13%;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
  }

  .fulfilling-square-spinner{
    height: 200px !important;
    width: 200px !important;
    margin: 48% 0 0% -28%;
  }
}


</style>
