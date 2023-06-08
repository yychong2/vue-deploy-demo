import{_ as g,d as r,C as h,L as p,r as i,o as d,c as l,a as n,b as e,t as u,e as v,w as V,F as y}from"./index-f2972f44.js";const C={data(){return{voucher:"",afterResult:!1,detail:"",loading:!1,headers:{"X-Member-Details":r.defaults.headers.common["X-Member-Details"]}}},created(){r.defaults.headers.common["X-Member-Details"]=h.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(h.enc.Utf8)},methods:{submitVoucher(){this.loading=!0,r.post("ClaimVoucher",{VoucherCode:this.voucher},this.headers).then(t=>{t.data.ResponseCode=="0"&&(alert(t.data.ResponseMessage),this.afterResult=!1)}).catch(t=>{console.error(t)}).finally(t=>{this.loading=!1})},getVoucherDetail(t){r.post("GetVoucherDetailByVoucherCode",{VoucherCode:t.voucher},this.headers).then(o=>{o.data.ResponseCode=="0"&&(this.detail=o.data.VoucherDetail.Content,this.voucher=t.voucher,this.afterResult=!0)}).catch(o=>{console.error(o)})},validateVoucher(t){return t?!0:"This field is required"}},components:{Loading:p}},x={class:"py-5"},D={class:"container px-5"},M={class:"bg-light rounded-3 py-5 px-4 px-md-5 mb-5"},k={class:"text-center mb-5"},w=e("div",{class:"feature bg-dark bg-gradient text-white rounded-3 mb-3"},[e("i",{class:"bi bi-credit-card"})],-1),S={class:"fw-bolder"},F={class:"row gx-5 justify-content-center"},R={class:"col-lg-8 col-xl-6"},L={key:0,style:{"margin-top":"80px",color:"white"}},B=["innerHTML"],E={class:"form-sub-main"},T={class:"form-group"},X={class:"d-grid"},H={key:1},N={class:"form-floating mb-3"},j=e("label",{for:"name"},"Voucher",-1),q={class:"d-grid"},A={class:"btn btn-dark btn-lg",id:"submitButton"};function G(t,o,I,J,a,s){const m=i("Loading"),_=i("Field"),f=i("ErrorMessage"),b=i("Form");return d(),l(y,null,[n(m,{loading:a.loading},null,8,["loading"]),e("section",x,[e("div",D,[e("div",M,[e("div",k,[w,e("h1",S,u(t.$t("title.voucher")),1)]),e("div",F,[e("div",R,[a.afterResult?(d(),l("div",L,[e("div",{innerHTML:a.detail,style:{width:"50%",margin:"auto"}},null,8,B),e("form",{onSubmit:o[1]||(o[1]=v((...c)=>t.submitConfirmVoucher&&t.submitConfirmVoucher(...c),["prevent"]))},[e("div",E,[e("div",T,[e("div",X,[e("button",{class:"btn btn-dark btn-lg",onClick:o[0]||(o[0]=(...c)=>s.submitVoucher&&s.submitVoucher(...c))},u(t.$t("common.submit")),1)])])])],32)])):(d(),l("div",H,[n(b,{onSubmit:s.getVoucherDetail,id:"voucherForm"},{default:V(()=>[e("div",N,[n(_,{class:"form-control _ge_de_ol",name:"voucher",type:"text",placeholder:"Enter Voucher",rules:s.validateVoucher,autocomplete:"off"},null,8,["rules"]),j,n(f,{name:"voucher",style:{color:"red"}})]),e("div",q,[e("button",A,u(t.$t("common.submit")),1)])]),_:1},8,["onSubmit"])]))])])])])])],64)}const U=g(C,[["render",G]]);export{U as default};
