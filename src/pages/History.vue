<template>
    <Loading :loading="loading"/>

    <!-- Page content-->
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                <div class="text-center mb-5">
                    <div class="feature bg-dark bg-gradient text-white rounded-3 mb-3"><i class="bi bi-files"></i></div>
                    <h1 class="fw-bolder">{{$t("nav.history")}}</h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                      <form @submit.prevent="searchHistoryData">
                          
                          <div class="form-floating mb-3">
                            <div class="form-group">
                              <el-select class="form-control _ge_de_ol" v-model="report_type" placeholder="Report Type" >
                                <el-option v-for="(item,index) in options" :label="item.label" :key="item.value" :value="item.value"></el-option>
                              </el-select>  
                            </div>
                           
                          </div>

                          <div class="form-floating mb-3">
                            <div class="form-group">
                              <VueDatePicker class="form-control _ge_de_ol" v-model="startDate" :format="format" auto-apply placeholder="Start Date"  />
                            </div>
                          </div>

                          <div class="form-floating mb-3">
                            <div class="form-group">
                              <VueDatePicker class="form-control _ge_de_ol" v-model="endDate" :format="format" auto-apply placeholder="End Date"  />
                            </div>
                          </div>

                          <div class="d-grid"><button class="btn btn-dark btn-lg "  @click="searchHistory" id="submitButton" >{{$t("common.submit")}}</button></div>
                        
                      </form>
                    </div>
                </div>
            </div>
          
        </div>
    </section>

    <div v-show="show">
      <EasyDataTable :headers="headers" :items="data" />
    </div>
         
</template>

<script>
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Loading from '../components/Loading.vue'

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']      
};

export default {
    data(){
        return{
            update_dob:null,
            max_date:null,
            startDate :null,
            endDate : null,            
            format:"yyyy-MM-dd",
            report_type:"",
            options : [
              {
                value: 'DEP',
                label: 'Deposit',
              },
              {
                value: 'WIT',
                label: 'Withdrawal',
              },
              {
                value: 'PRO',
                label: 'Promotion',
              },
              {
                value: 'TRA',
                label: 'Transfer',
              },
              {
                value: 'WL',
                label: 'Bet',
              },
              {
                value: 'VOU',
                label: 'Voucher',
              },
            ],
            headers:[],
            data:[],
            show:false,
            loading : false,
        }
    }, 
    created(){
      axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
        searchHistory(){
          
            if(this.startDate == null || this.endDate == null || this.report_type == ""){
                    return alert('The field is required');
            }
            this.loading = true

            axios.post( 'History', {
                HistoryFromDate: this.startDate,
                HistoryToDate : this.endDate,
                ReportType : this.report_type
            }, { headers } ).then(response => {

              if(response.data.ResponseCode == "0"){
                  if(this.report_type == "DEP"){
                    if(response.data.ReportDepositDetails != null){
                      this.data = response.data.ReportDepositDetails
                      this.show = true
                      this.headers = [ { text: "Deposit Number", value: "DepositNo" },
                        { text: "Deposit Amount", value: "DepositAmount"},
                        { text: "Deposit Method", value: "DepositMethodStr"},
                        { text: "Deposit Status", value: "DepositStatusStr"},
                        { text: "Deposit Time", value: "DepositTimeLocalStr"}
                      ]
                    }
                    
                  }
                  else if(this.report_type == "WIT"){
                    if(response.data.ReportWithdrawDetails != null){
                      this.data = response.data.ReportWithdrawDetails
                      this.show = true
                      this.headers = [ { text: "Withdrawal Number", value: "WithdrawNo" },
                        { text: "Withdrawal Amount", value: "WithdrawAmount"},
                        { text: "Withdrawal Bank", value: "WithdrawBank"},
                        { text: "Withdrawal Status", value: "WithdrawStatusStr"},
                        { text: "Withdrawal Time", value: "WithdrawTimeLocalStr"}
                      ]
                    }
                  }
                  else if(this.report_type == "PRO"){
                    if(response.data.ReportPromotionDetails != null){
                      this.data = response.data.ReportPromotionDetails
                      this.show = true
                      this.headers =
                      [ { text: "Promotion Title", value: "PromoTitle" },
                        { text: "Promotion Amount", value: "PromoAmount"},
                        { text: "Promotion turnover", value: "PromoTurnover"},
                        { text: "Product Name", value: "ProductName"},
                        { text: "Promotion Status", value: "PromoStatusStr"},
                        { text: "Promotion Time", value: "PromoTimeLocalStr"}
                      ]
                    }
                  }
                  else if(this.report_type == "TRA"){
                    if(response.data.ReportTransferDetails != null){
                      this.data = response.data.ReportTransferDetails
                      this.show = true
                      this.headers =
                      [ { text: "Transfer From", value: "TransferFrom" },
                        { text: "Transfer To", value: "TransferTo"},
                        { text: "Transfer Amount", value: "TransferAmount"},
                        { text: "Transfer Status", value: "TransferStatusStr"},
                        { text: "Transfer Time", value: "TransferTimeLocalStr"}
                      ]
                    }
                  }
                  else if(this.report_type == "WL"){
                    if(response.data.ReportBetDetails != null){
                      this.data = response.data.ReportBetDetails
                      this.show = true
                      this.headers =
                      [ { text: "Bet Nunmber", value: "BetNo" },
                        { text: "Total Record", value: "TotalRecord"},
                        { text: "Product Name", value: "ProductName"},
                        { text: "Product Type", value: "ProductType"},
                        { text: "Turnover Amount", value: "TurnoverAmount"},
                        { text: "Bet Amount", value: "BetAmount"},
                        { text: "Win Lose", value: "WinLose"},
                        { text: "Bet Time", value: "BetTimeLocal"}
                      ]
                    }
                  }
                  else if(this.report_type == "VOU"){
                    if(response.data.ReportVoucherDetails != null){
                      this.data = response.data.ReportVoucherDetails
                      this.show = true
                      this.headers =
                      [ { text: "Voucher Id", value: "VoucherId" },
                        { text: "Voucher Amount", value: "VoucherAmount"},
                        { text: "Voucher Title", value: "Title"},
                        { text: "Voucher Status", value: "VoucherStatusStr"},
                        { text: "Claim Time", value: "ClaimTimeLocalStr"}
                      ]
                    }
                  }
              }
             
            }).catch(error => { console.error(error);})
            .finally( com => {    this.loading = false  });
        }
    },
    components:{
      Loading,VueDatePicker
    }
}

</script>