<template>

<Transition>
  <div class="container px-5 my-5">
    <div v-if="afterResult">
      <section class="form-01-main">
        <div class="form-cover">
          <div class="container" style="margin-top: 80px;">
             <section class="vh-90">
              <div class="container py-5">
                  <div class="col mb-4 mb-lg-0">
                 <div class=" mb-3" style="border-radius: .5rem;">
                   <div class="row g-0">
                     <div class="col-md-5 gradient-custom text-center text-white"
                       style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                       <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                         alt="Avatar" class="img-fluid my-5" />
                       <h5>{{memProfile.Username}}</h5>
                       <p>{{$t("profile.web_designer")}}</p>
                       <i class="far fa-edit mb-5"></i>
                     </div>
                     <div class="col-md-7">
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
                         <hr class="mt-0 mb-4">
                         <button type="button" class="btn btn-dark btn-lg " @click="backProfileList">{{$t("common.update_profile")}}</button>
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
          

           <section class="py-5">
               <div class="container px-5">
                

                   <!-- Contact form-->
                   <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                    <div class="form-group">
                     <div class="btn_uy" style="margin-left: 27%; width: 21%;">
                       <button type="button" class="btn btn-dark btn-lg " @click="backProfileList">{{$t("common.back")}}</button>
                     </div>
                    </div>

                    <div class="text-center mb-5">
                        <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-person-square"></i></div>
                        <h1 class="fw-bolder">{{$t("title.profile")}}</h1>
                    </div>
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-8 col-xl-6">
                          <form @submit.prevent="submitupdateProfileDetail">
                           <div class="form-sub-main">
                           
                             <div class="form-floating mb-3">
                               <VueDatePicker v-model="update_dob" :format="format" :start-date="startDate" :max-date="this.max_date" auto-apply placeholder="Update Date of Birth"  />
                             </div>
                           
                             <div class="form-group">
                               <div class="btn_uy">
                                 <button type="submit" class="btn btn-dark btn-lg "  @click="updateProfileDetail">{{$t("common.submit")}}</button>
                               </div>
                             </div>
                           
                             </div>
                          </form>
                        </div>
                    </div>
                   </div>
               </div>
           </section>
    </div>
  </div>
</Transition>

</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

export default {
    data(){
        return{
            afterResult: true,
            memProfile:{},
            update_dob:null,
            max_date:null,
            startDate :null,
            format:"yyyy-MM-dd"
        }
    }, 
    created(){
      const date = new Date();
      this.startDate = new Date( (date.getFullYear() - 18) , (date.getMonth()  ));
      this.max_date = new Date(date.setFullYear(date.getFullYear() - 18)) ;
      axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
      this.getProfile()
    },
    setup(){

    

    },
    methods:{
            getProfile : function(params){
                axios.get( 'GetUserProfile', {}, {headers}
                ).then(response => {
                  if(response.data.ResponseCode == "0"){
                    this.memProfile = response.data.UserDetail
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            },
            updateProfileDetail(){

                if(this.bank_selected == null){
                    return alert('The field is required');
                }

                const dob = this.update_dob.getFullYear() + "-"   + ( this.update_dob.getMonth() + 1) + "-"  +  this.update_dob.getDate()
                
               

                axios.post( 'UpdateUserDetails', {
                   BirthDate: dob
                }, { headers } ).then(response => {
                  if(response.data.ResponseCode == "0"){
                    this.afterResult = true
                    this.getProfile()
                  }
                }).catch(error => {
                   console.error(error);
                });
            },
            backProfileList(){
                this.afterResult = this.afterResult ? false : true;
               // this.afterResult = !this.enable;
            }
    },
    components:{
        VueDatePicker
    }
}
</script>

<style></style>