<template>
<Header :title="title" :description="description"/>


<section class="form-01-main">
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
                              <p class="text-muted">{{memProfile.DateCreatedLocal}}</p>
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


</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import Header from '../components/header.vue'
import CryptoJS from 'crypto-js'

axios.defaults.withCredentials = true;

export default {
    data(){
        return{
            title : "",
            description : "",
            memProfile:{}
        }
    }, 
    created(){
      const { t } = useI18n()
      this.title = t("title.profile")
      this.description = t("title.profile_description")
      this.getProfile()
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
                    console.log(response.data.UserDetail)
                    this.memProfile = response.data.UserDetail
                })
                .catch(error => {
                  console.error(error);
                });
            }
    },
    components:{
        Header
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
</style>