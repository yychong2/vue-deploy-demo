<template>
<Header :title="title" :description="description"/>
<Transition>
  <div v-if="afterResult">
   
    <section class="form-01-main">
      <div class="form-group">
            <div class="btn_uy" style="margin-left: 27%; width: 29%;">
              <button type="button" @click="backProfileList">{{$t("common.update_profile")}}</button>
            </div>
      </div>

      <div class="form-cover">
        <div class="container" style="margin-top: 80px;">
          <section class="vh-90">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-6 mb-4 mb-lg-0">
                  <div class="card mb-3" style="border-radius: .5rem;">
                    <div class="row g-0">
                      <div class="col-md-4 gradient-custom text-center text-white"
                        style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                        <h5>{{memProfile.Username}}</h5>
                        <p>{{$t("profile.web_designer")}}</p>
                        <i class="far fa-edit mb-5"></i>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body p-4">
                          <h6>{{$t("profile.information")}}</h6>
                          <hr class="mt-0 mb-4">
                          <div class="row pt-1">
                            <div class="col-6 mb-3">
                              <h6>{{$t("profile.email")}}</h6>
                              <p class="text-muted">{{memProfile.Email}}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>{{$t("profile.phone")}}</h6>
                              <p class="text-muted">{{memProfile.Contact}}</p>
                            </div>
                          </div>
                          <h6>{{$t("profile.more_detail")}}</h6>
                          <hr class="mt-0 mb-4">
                          <div class="row pt-1">
                            <div class="col-6 mb-3">
                              <h6>{{$t("profile.full_name")}}</h6>
                              <p class="text-muted">{{memProfile.Name}}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>{{$t("profile.date_created")}}</h6>
                              <p class="text-muted">{{memProfile.BirthDate}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>         
        </div>
      </div>
    </section>
  </div>
  <div v-else>
        <div class="form-group">
            <div class="btn_uy" style="margin-left: 27%; width: 21%;">
              <button type="button" @click="backProfileList">{{$t("common.back")}}</button>
            </div>
        </div>
      <form @submit.prevent="submitupdateProfileDetail">
          <div class="form-sub-main">
           
            <VueDatePicker v-model="update_dob" :format="format" :start-date="startDate" :max-date="this.max_date" auto-apply placeholder="Update Date of Birth"  />
           
            <div class="form-group">
              <div class="btn_uy">
                <button type="submit" @click="updateProfileDetail">{{$t("common.submit")}}</button>
              </div>
            </div>

            </div>
      </form>

  </div>
</Transition>




</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import Header from '../components/header.vue'
import CryptoJS from 'crypto-js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

axios.defaults.withCredentials = true;

export default {
    data(){
        return{
            title : "",
            description : "",
            afterResult: true,
            memProfile:{},
            update_dob:null,
            max_date:null,
            startDate :null,
            format:"yyyy-MM-dd"
        }
    }, 
    created(){
      const { t } = useI18n()
      this.title = t("title.profile")
      this.description = t("title.profile_description")
      this.getProfile()

      const date = new Date();
      this.startDate = new Date( (date.getFullYear() - 18) , (date.getMonth()  ));
      this.max_date = new Date(date.setFullYear(date.getFullYear() - 18)) ;
     
    },
    setup(){

    

    },
    methods:{
            getProfile : function(params){
                axios.defaults.headers.common['Content-Type'] = "application/json";
                //axios.defaults.headers.common['X-Member-Details'] = JSON.stringify(toRaw(this.memDetail)) ;
                axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
                axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("tokenLogin");

                const headers = { 
                "Content-Type": "application/json",
                "Language":"en-US",
                "X-Member-Details" : axios.defaults.headers.common['X-Member-Details'],
                "Authorization" : axios.defaults.headers.common['Authorization']
                };

                axios.get(this.apiUrl+ 'GetUserProfile', {}, {headers}
                ).then(response => {
                    //console.log(response.data.UserDetail)
                    this.memProfile = response.data.UserDetail
                })
                .catch(error => {
                  console.error(error);
                });
            },
            updateProfileDetail(){
              //POST /api/v1/UpdateUserDetails
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
                const dob = this.update_dob.getFullYear() + "-"   + ( this.update_dob.getMonth() + 1) + "-"  +  this.update_dob.getDate()

                axios.post( this.apiUrl +'UpdateUserDetails', {
                   BirthDate: dob
                  
                 }, { headers }
                 ).then(response => {
                     this.afterResult = true
                     this.getProfile()
                     //console.log(response.data);
                
                }).catch(error => {
                   console.error(error);
                });
            },
            backProfileList(){
                this.afterResult = this.afterResult ? false : true;
               // this.afterResult = !this.enable;
            },
            dateChange(){
              console.log(update_dob)
            }
    },
    components:{
        Header,VueDatePicker
    }
}
</script>

<style>
.gradient-custom {
/* fallback for old browsers */
background: #f6d365;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>