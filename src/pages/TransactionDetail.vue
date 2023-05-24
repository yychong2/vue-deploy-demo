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
                      <div class="col-md-12">
                        <div class="card-body p-4">
                          <h6>{{$t("transaction.deposit_detail")}}</h6>
                          <hr class="mt-0 mb-4">
                          <div class="row pt-1">
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_deposit")}}</h6>
                              <p class="text-muted">{{UserTransactionDetail.TotalDeposit}}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_no_deposit")}}</h6>
                              <p class="text-muted">{{UserTransactionDetail.TotalNumberOfDeposit}}</p>
                            </div>
                          </div>
                          <h6>{{$t("transaction.withdrawal_detail")}}</h6>
                          <hr class="mt-0 mb-4">
                          <div class="row pt-1">
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_withdrawal")}}</h6> 
                              <p class="text-muted">{{UserTransactionDetail.TotalWithdraw}}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_no_withdrawal")}}</h6>
                              <p class="text-muted">{{UserTransactionDetail.TotalNumberOfWithdraw}}</p>
                            </div>
                          </div>
                          <h6>{{$t("transaction.more_detail")}}</h6>
                          <hr class="mt-0 mb-4">
                          <div class="row pt-1">
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_rollover")}}</h6> 
                              <p class="text-muted">{{UserTransactionDetail.TotalRollover}}</p>
                            </div>
                            <div class="col-6 mb-3">
                              <h6>{{$t("transaction.total_turnover")}}</h6>
                              <p class="text-muted">{{UserTransactionDetail.TotalTurnover}}</p>
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

let headers = { 
    "X-Member-Details" : axios.defaults.headers.common['X-Member-Details']
};

export default {
    data(){
        return{
            title : "",
            description : "",
            UserTransactionDetail:{}
        }
    }, 
    created(){
      const { t } = useI18n()
      this.title = t("title.trs_detail")
      this.description = t("title.trs_detail_description")
      this.GetTransactionDetail()
      axios.defaults.headers.common['X-Member-Details'] = CryptoJS.AES.decrypt(sessionStorage.getItem("memDetail"), this.aesKey).toString(CryptoJS.enc.Utf8);

    },
    methods:{
        GetTransactionDetail : function(params){
                axios.get('GetTransactionDetail', {}, {headers}
                ).then(response => {
                    //console.log(response.data.UserTransactionDetail)
                    this.UserTransactionDetail = response.data.UserTransactionDetail
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
