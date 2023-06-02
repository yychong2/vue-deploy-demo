<template>

    <Loading :loading="loading"/>

    <!-- Page content-->
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-person-square"></i></div>
                    <h1 class="fw-bolder">{{$t("nav.register")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">

                      <Form @submit="onSubmit" id="registerForm">
                            <div class="form-floating mb-3">
                                <Field class="form-control" name="Username" type="text" placeholder="Enter Username" :rules="validateUsername" autocomplete="off" />
                                <label for="name">Username</label>
                                <ErrorMessage name="Username" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control" name="Password" type="password" v-model="Password" :rules="validatePassword" placeholder="********" autocomplete="off" />
                                <label for="name">Password</label>
                                <ErrorMessage name="Password" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control" name="Confirm_Password" type="password" :rules="validateConfirmPassword" placeholder="********" autocomplete="off" />
                                <label for="name">Confirm Password</label>
                                <ErrorMessage name="Confirm_Password" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control " name="Name" type="text" placeholder="Enter Fullname" :rules="validateFullname" autocomplete="off" />
                                <label for="name">Full Name</label>
                                <ErrorMessage name="Name" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control" name="Email" type="text" placeholder="Enter Email" :rules="validateEmail" autocomplete="off" />
                                <label for="name">E-Mail</label>
                                <ErrorMessage name="Email" style="color:red"/>
                            </div>

                            <div class="form-floating mb-3">
                                <Field class="form-control " name="Contact" type="text" inputmode="numeric" pattern="/d+" placeholder="Enter Contact" :rules="validateContact" autocomplete="off" />
                                <label for="name">Contact Number</label>
                                <ErrorMessage name="Contact" style="color:red"/>
                            </div>

                            <div class="d-grid"><button class="btn btn-dark btn-lg " id="submitButton" >{{$t("nav.register")}}</button></div>
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
import Loading from '../components/Loading.vue'

export default {
    data(){
        return{
            Password:"",
            loading : false,
        }
    },
    setup(){},
    created(){},
    methods: {
        onSubmit(values){
          this.loading = true
          axios.post( 'register', {   
                Username: values.Username, 
                Password: values.Password,
                Name: values.Name,
                Email : values.Email,
                Contact : values.Contact
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
            .catch(error => {console.error(error); })
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
        
          this.password = value
          // All is good
          return true;
        },
        validateConfirmPassword(value){
          if (!value) {
            return 'This field is required';
          }

          if(value != this.Password ){
            return 'This field must be same with Password';
          }

          return true;
        },
        validateFullname(value){
            // if the field is empty
            if (!value) {
              return 'This field is required';
            }
            // All is good
            return true;
        },
        validateEmail(value){
            // if the field is empty
            if (!value) {
              return 'This field is required';
            }

            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
              return 'This field must be a valid email';
            }

            // All is good
            return true;
        },
        validateContact(value){
            // if the field is empty
            if (!value) {
              return 'This field is required';
            }

            // if the field is not a valid email
            const regex = /^[0-9]{3,14}$/i;
            if (!regex.test(value)) {
              return 'This field must be a valid Contact number';
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


<style></style>
