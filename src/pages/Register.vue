<template>
    <Header :title="title" :description="description"/>

    <section class="form-01-main">
      <div class="form-cover">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
             
                <Form @submit="onSubmit">
                  <div class="form-sub-main">
                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Username" type="text" placeholder="Enter Username" :rules="validateUsername" autocomplete="off" />
                      <ErrorMessage name="Username" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Password" v-model="Password" type="password" :rules="validatePassword" placeholder="********" autocomplete="off" />
                      <ErrorMessage name="Password" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Confirm_Password" type="password" :rules="validateConfirmPassword" placeholder="********" autocomplete="off" />
                      <ErrorMessage name="Confirm_Password" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Name" type="text" placeholder="Enter Fullname" :rules="validateFullname" autocomplete="off" />
                      <ErrorMessage name="Name" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Email" type="text" placeholder="Enter Email" :rules="validateEmail" autocomplete="off" />
                      <ErrorMessage name="Email" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <Field class="form-control _ge_de_ol" name="Contact" type="text" inputmode="numeric" pattern="/d+" placeholder="Enter Contact" :rules="validateContact" autocomplete="off" />
                      <ErrorMessage name="Contact" style="color:red"/>
                    </div>

                    <div class="form-group">
                      <div class="btn_uy">
                        <button>{{ $t("nav.register")  }}</button>
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
import Header from '../components/header.vue'
import { useI18n } from 'vue-i18n'

export default {
    data(){
        return{
            title : "",
            description : "",
            Password:""
        }
    },
    setup(){},
    created(){
      const { t } = useI18n()
      this.title = t("title.register")
      this.description = t("title.register_description")
    },
    methods: {
        onSubmit(values){
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
            .catch(error => {
                console.error(error);
            });
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
