<template>
    <!-- <Header :title="title" :description="description"/> -->

    <Loading :loading="loading"/>
  
    <section class="form-01-main">
      <div class="form-cover">
        <div class="container">
          <div class="row">
            <div class="col-md-12">

              <Form @submit="onSubmit">
                <div class="form-sub-main">
                  <div class="_main_head_as">
                    <a href="#">
                      <img src="../assets/img/vector.png">
                    </a>
                  </div>

                  <div class="form-group">
                    <Field class="form-control _ge_de_ol" name="Username" type="text" placeholder="Enter Username" :rules="validateUsername" autocomplete="off" />
                    <ErrorMessage name="Username" style="color:red"/>
                  </div>

                  <div class="form-group">
                    <Field class="form-control _ge_de_ol" name="Password" type="password" :rules="validatePassword" placeholder="********" autocomplete="off" />
                    <ErrorMessage name="Password" style="color:red"/>
                  </div>

               

                  <div class="form-group">
                    <div class="btn_uy">
                      <button>{{$t("common.login")}}</button>
                    </div>
                  </div>

                </div>
              
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
import Header from '../components/header.vue'
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import Loading from '../components/Loading.vue'

export default {
    data(){
        return{
            title : "",
            description : "",
            message : "",
            loading : false,
        }
    },
    setup(){},
    created(){
      const { t } = useI18n()
      this.title = t("title.login")
      this.description = t("title.login_description")
      
    },
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
        Header ,Loading
    },
    computed:{
    },
   
};


</script>


<style>

.form-01-main{
   height: 804px;;
}

.btn_uy button{
    padding: 10px 20px;
    background: #37a000;
    text-transform: uppercase;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;
    line-height: normal;
    border-radius: 5px;
    color: #fff;
    width: 100%;
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.active{
    display: block;
}

.non-active {
    display: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>


