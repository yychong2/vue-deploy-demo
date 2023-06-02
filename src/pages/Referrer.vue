<template>
    <Header :title="title" :description="description"/>

    <!-- Page content-->
    <section class="py-5">
            <div class="container px-5">

                <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                   
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-8 col-xl-8">

                            <div class="qr_board">
                                <img class="qr_code" :src="qr_code"  alt="" />
                            </div>
                            <div>
                                <input class="form-control _ge_de_ol" ref="message" style="color: black; max-width: 1000px;" type="text" v-model="referrar_link" disabled/>
                               
                            </div>
                            <hr class="mt-0 mb-4">
                            <button class="btn btn-dark btn-lg " @click="copy">Copy</button>
                            <input type="hidden" id="testing-code" :value="referrar_link">

                             <!-- <div style="max-width: 500px; margin:auto">
                                 <Form @submit="searchRebateData">
                                     <div class="form-group">
                                        <VueDatePicker class="form-control _ge_de_ol" v-model="startDate" :format="format" auto-apply placeholder="Start Date"  />
                                     </div>
                                 
                                     <div class="form-group">
                                          <VueDatePicker class="form-control _ge_de_ol" v-model="endDate" :format="format" auto-apply placeholder="End Date"  />
                                     </div>
                                 
                                     <div class="form-group">
                                           <div class="btn_uy">
                                             <button >{{$t("common.submit")}}</button>
                                           </div>
                                     </div>
                                 </Form>
                             </div> -->

                        </div>
                    </div>
                </div>
            
            </div>
    </section>

</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import Header from '../components/header.vue'
import CryptoJS from 'crypto-js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

export default {
    data(){
        return{
            title : "",
            description : "",
            qr_code: "",
            referrar_link:"",
            startDate :null,
            endDate : null,            
            format:"yyyy-MM-dd",
        }
    }, 
    created(){
       const { t } = useI18n()
       this.title = t("title.referrer")
       this.description = t("title.referrer_description")
       axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
       this.getReferrerRebateQRDetails()
       //this.getReferrerList()
    },
    methods:{
        getReferrerList : function(params){
                axios.get('GetReferrerList', {}, {headers} ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        console.log(response.data)
                    }
                })
                .catch(error => {
                  console.error(error);
                });
        },
        getReferrerRebateQRDetails : function(params){
                axios.get('GetReferrerRebateQRDetails', {}, {headers} ).then(response => {
                    if(response.data.ResponseCode == "0"){
                        this.referrar_link = response.data.QrCodeLink
                        this.qr_code = "data:image/png;base64,"+ response.data.QrCodeImageBase64
                    }
                })
                .catch(error => {
                  console.error(error);
                });
        },
        searchRebateData(){
            if(this.startDate == null || this.endDate == null ){
                    return alert('The field is required');
            }

            axios.post( 'GetReferrerRebateReport', {
                  FromDate: this.startDate,
                  ToDate: this.endDate
            }, { headers } ).then(response => {
                console.log(response.data)
              if(response.data.ResponseCode == "0"){
                //   if(this.report_type == "DEP"){
                //     if(response.data.ReportDepositDetails != null){
                //       this.data = response.data.ReportDepositDetails
                //       this.show = true
                //       this.headers = [ { text: "Deposit Number", value: "DepositNo" },
                //         { text: "Deposit Amount", value: "DepositAmount"},
                //         { text: "Deposit Method", value: "DepositMethodStr"},
                //         { text: "Deposit Status", value: "DepositStatusStr"},
                //         { text: "Deposit Time", value: "DepositTimeLocalStr"}
                //       ]
                //     }
                    
                //   }
              }
              
            }).catch(error => {
               console.error(error);
            });

        },
        copy() {
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text')    // 不是 hidden 才能複製
            testingCodeToCopy.select()

            try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'successful' : 'unsuccessful';
              alert('Copied ' + msg);
            } catch (err) {
              alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        }
    },
    components:{
        Header ,VueDatePicker
    }
}

</script>

<style>
.copy_button{
    position: absolute;
    top: 2px;
    right: 2px;
    width: 19%;
    height: 91%;
    border-radius: 6px;
    background: green;
    color: white;
}

.qr_code{
    width:300px; 
    height: 300px;
}

.qr_board{
    width: 300px;
    margin: auto;
}

@media only screen and (max-width: 600px) {
    .qr_code{
        width:100%; 
        height: 100%; 
    }

    .qr_board{
        width: 100%;
        margin: auto;
    }

}
</style>