<template>
    <Header :title="title" :description="description"/>

    <section class="form-01-main">
      <div class="form-cover">
      <div class="container">

        <div class="row">
          <div class="col-md-12">

            <form @submit.prevent="loginWithPassword" v-show="reg_form">
                <div class="form-sub-main">
                  <div class="_main_head_as">
                    <a href="#">
                      <img src="../assets/img/vector.png">
                    </a>
                  </div>
                  <div class="form-group">
                      <input class="form-control _ge_de_ol" v-model="username" type="text" placeholder="Enter Username" required="" aria-required="true">
                  </div>

                  <div class="form-group">                                              
                    <input id="password" type="password" class="form-control" v-model="password" name="password" placeholder="********" required="required">
                    <i toggle="#password" class="fa fa-fw fa-eye toggle-password field-icon"></i>
                  </div>

                  <div class="form-group">
                    <div class="check_box_main">
                      <a href="#" class="pas-text">Forgot Password</a>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="btn_uy">
                      <!-- <a href="#"><span>Login</span></a> -->
                      <button type="submit" @click="getToken">Login</button>
                    </div>
                  </div>
                </div>
            </form>

            <Transition>
            <div v-if="tokenRes" style="margin-top: 80px;">

                <div style="overflow-wrap: break-word ; color: white;" >
                <p>Token : {{ token }}</p>
                </div>

                <div style="overflow-wrap: break-word ; color: white;">
                    <!-- <p>{{ indexes }}</p> -->
                    <div class="btn_uy">
                        <button type="button" @click="GetUserProfile">Click Profile Detail</button>
                    </div>
                    <p >Profile Detail :{{ memProfile }}</p>
                </div>

            </div>
            <div v-else>
                <p>{{ errorMsg }}</p> 
            
            </div>
            </Transition>


          </div>
        </div>

   
      </div>
      </div>
    </section>

    


  
</template>

<script>
import axios from 'axios';
import { isProxy, toRaw } from 'vue';
import Header from '../components/header.vue'
import { useI18n } from 'vue-i18n'

axios.defaults.withCredentials = true;

export default {
    data(){
        const { t } = useI18n()

        return{
            title : t("title.login"),
            description : t("title.login_description"),
            data :"",
            token:"",
            username:"",
            password:"",
            tokenRes : false,
            reg_form : true,
            errorMsg : "",
            gameCasino:[],
            memDetail:{},
            imagaSize:{
                width:"100px"
            },
            classReadData:{
                width: "796px",
            },
            memProfile:{}
        }
    },
    setup(){
        const fun1 = () =>{
            console.log("fun1");
        }
        
        return{
            fun1
        }
    },
    created(){},
    methods: {
        getToken() {
            axios.post( this.apiUrl +'auth ', {   
                username: this.username,
                password: this.password,
            },
            {  
                'X-Requested-With': 'XMLHttpRequest',
                withCredentials: true,
                credentials: 'include'
            }
            )
            .then(response => {
              this.data = response.data;
              this.token = response.data.AccessToken;
              this.memDetail = response.data.MemberDetail;

              //console.log(toRaw(this.memDetail));
              this.tokenRes = true;
              this.reg_form = false
            })
            .catch(error => {
                console.error(error);
                this.errorMsg = error;
            });
        },
        GetUserProfile(){
             
            axios.defaults.headers.common['Content-Type'] = "application/json";
            axios.defaults.headers.common['X-Member-Details'] = '{"UserId": "'+ this.memDetail.UserId +'"}';
            axios.defaults.headers.common['Authorization'] = 'Bearer ' +  this.token;

            const headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                "Authorization" : axios.defaults.headers.common['Authorization']
            };

            axios.get('https://flut.jcmmweb.com/api/v1/GetUserProfile', {  } , {headers}
            ).then(response => {
              //console.log( response.data);
              this.memProfile = response.data.UserDetail
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
