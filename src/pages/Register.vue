<template>
    <Header :title="title" :description="description"/>

    <section class="form-01-main">
      <div class="form-cover">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div>
                <form @submit.prevent="submitRegisterForm">
                <div class="form-sub-main">

                  <div class="form-group">
                      <input class="form-control _ge_de_ol" v-model="username" type="text" placeholder="Enter Username" required="" aria-required="true">
                  </div>

                  <div class="form-group">                                              
                    <input id="password" type="password" class="form-control" v-model="password" name="password" placeholder="********" required="required">
                    <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                  </div>
                  
                  <div class="form-group">
                      <input class="form-control _ge_de_ol" v-model="fullname" type="text" maxlength="20" placeholder="Enter Full Name" required="" aria-required="true">
                  </div>

                  <div class="form-group">
                      <input class="form-control _ge_de_ol" v-model="email" type="email" placeholder="Enter Email" required="" aria-required="true">
                  </div>

                  <div class="form-group">
                      <input class="form-control _ge_de_ol" v-model="contact" maxlength="12"  inputmode="numeric" pattern="/d+" type="text" placeholder="Enter Contact" required="" aria-required="true">
                      
                  </div>

                  <div class="form-group">
                    <div class="btn_uy">
                      <!-- <a href="#"><span>Login</span></a> -->
                      <button type="submit" @click="submitRegister">{{ $t("nav.register")  }}</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
</template>

<script>
import axios from 'axios';
import Header from '../components/header.vue'
import { useI18n } from 'vue-i18n'

export default {
    data(){
        return{
            title : "",
            description : "",
            username:"",
            password:"",
            email:"",
            contact: "",
            fullname:""
        }
    },
    setup(){},
    created(){
      const { t } = useI18n()
      this.title = t("title.register")
      this.description = t("title.register_description")
    },
    methods: {
        submitRegister(){

            axios.post( 'register', {   
                Username: this.username, 
                Password: this.password,
                Name: this.fullname,
                Email : this.email,
                Contact : this.contact
            },
            {  
                'X-Requested-With': 'XMLHttpRequest',  
                withCredentials: true,    
                credentials: 'include'
            }
            )
            .then(response => {
              if(response.data.ResponseCode == "0"){
                alert(response.data.ResponseMessage)
              }
            })
            .catch(error => {
                console.error(error);
            });
        }
    },
    components:{
        Header
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
