<template>
<Header :title="title" :description="description"/>
    <section class="form-01-main">
        <div class="form-cover">
            <form @submit.prevent="searchHistoryData">
                <div class="form-sub-main">
                    <div class="form-group">
                      <div class="btn_uy">
                        <button type="submit" @click="searchHistory">{{$t("common.submit")}}</button>
                      </div>
                    </div>

                    <div class="form-group">
                      <el-select class="form-control _ge_de_ol" v-model="report_type" placeholder="Report Type" >
                          <el-option v-for="(item,index) in options" :label="item.label" :key="item.value" :value="item.value"></el-option>
                      </el-select>                                              
                    </div>

                    <div class="form-group">
                        <VueDatePicker class="form-control _ge_de_ol" v-model="startDate" :format="format" auto-apply placeholder="Start Date"  />
                    </div>

                    <div class="form-group">
                        <VueDatePicker class="form-control _ge_de_ol" v-model="endDate" :format="format" auto-apply placeholder="End Date"  />
                    </div>
                  </div>
            </form>

            <div v-show="show">
                <EasyDataTable :headers="headers" :items="data" />
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

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']      
};

export default {
    data(){
        return{
            title : "",
            description : "",
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
            headers:[ { text: "Deposit Number", value: "DepositNo" },
                      { text: "Deposit Amount", value: "DepositAmount"},
                      { text: "Deposit Method", value: "DepositMethodStr"},
                      { text: "Deposit Status", value: "DepositStatusStr"},
                      { text: "Deposit Time", value: "DepositTimeLocalStr"}
                    ],
            data:[],
            show:false
        }
    }, 
    created(){
      const { t } = useI18n()
      this.title = t("title.history")
      this.description = t("title.history_description")
      axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);
    },
    methods:{
        searchHistory(){
            axios.post( 'History', {
                HistoryFromDate: this.startDate,
                HistoryToDate : this.endDate,
                ReportType : this.report_type
            }, { headers } ).then(response => {

              if(response.data.ResponseCode == "0"){
                 this.data = response.data.ReportDepositDetails
                 this.show = true
              }
              
            }).catch(error => {
               console.error(error);
            });
        }
    },
    components:{
        Header,VueDatePicker
    }
}

</script>