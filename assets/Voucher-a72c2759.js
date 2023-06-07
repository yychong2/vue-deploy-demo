import{_ as p,d as n,C as h,L as v,r,o as d,c as l,a as i,b as e,t as u,e as V,w as y,F as C}from"./index-b179daac.js";let m={"X-Member-Details":n.defaults.headers.common["X-Member-Details"]};const x={data(){return{voucher:"",afterResult:!1,detail:"",loading:!1}},created(){n.defaults.headers.common["X-Member-Details"]=h.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(h.enc.Utf8)},methods:{submitVoucher(){this.loading=!0,n.post("ClaimVoucher",{VoucherCode:this.voucher},{headers:m}).then(t=>{t.data.ResponseCode=="0"&&(alert(t.data.ResponseMessage),this.afterResult=!1)}).catch(t=>{console.error(t)}).finally(t=>{this.loading=!1})},getVoucherDetail(t){n.post("GetVoucherDetailByVoucherCode",{VoucherCode:t.voucher},{headers:m}).then(o=>{o.data.ResponseCode=="0"&&(this.detail=o.data.VoucherDetail.Content,this.voucher=t.voucher,this.afterResult=!0)}).catch(o=>{console.error(o)})},validateVoucher(t){return t?!0:"This field is required"}},components:{Loading:v}},D={class:"py-5"},M={class:"container px-5"},k={class:"bg-light rounded-3 py-5 px-4 px-md-5 mb-5"},w={class:"text-center mb-5"},S=e("div",{class:"feature bg-dark bg-gradient text-white rounded-3 mb-3"},[e("i",{class:"bi bi-credit-card"})],-1),F={class:"fw-bolder"},R={class:"row gx-5 justify-content-center"},L={class:"col-lg-8 col-xl-6"},B={key:0,style:{"margin-top":"80px",color:"white"}},E=["innerHTML"],T={class:"form-sub-main"},X={class:"form-group"},H={class:"d-grid"},N={key:1},j={class:"form-floating mb-3"},q=e("label",{for:"name"},"Voucher",-1),A={class:"d-grid"},G={class:"btn btn-dark btn-lg",id:"submitButton"};function I(t,o,J,K,a,s){const _=r("Loading"),f=r("Field"),b=r("ErrorMessage"),g=r("Form");return d(),l(C,null,[i(_,{loading:a.loading},null,8,["loading"]),e("section",D,[e("div",M,[e("div",k,[e("div",w,[S,e("h1",F,u(t.$t("title.voucher")),1)]),e("div",R,[e("div",L,[a.afterResult?(d(),l("div",B,[e("div",{innerHTML:a.detail,style:{width:"50%",margin:"auto"}},null,8,E),e("form",{onSubmit:o[1]||(o[1]=V((...c)=>t.submitConfirmVoucher&&t.submitConfirmVoucher(...c),["prevent"]))},[e("div",T,[e("div",X,[e("div",H,[e("button",{class:"btn btn-dark btn-lg",onClick:o[0]||(o[0]=(...c)=>s.submitVoucher&&s.submitVoucher(...c))},u(t.$t("common.submit")),1)])])])],32)])):(d(),l("div",N,[i(g,{onSubmit:s.getVoucherDetail,id:"voucherForm"},{default:y(()=>[e("div",j,[i(f,{class:"form-control _ge_de_ol",name:"voucher",type:"text",placeholder:"Enter Voucher",rules:s.validateVoucher,autocomplete:"off"},null,8,["rules"]),q,i(b,{name:"voucher",style:{color:"red"}})]),e("div",A,[e("button",G,u(t.$t("common.submit")),1)])]),_:1},8,["onSubmit"])]))])])])])])],64)}const z=p(x,[["render",I]]);export{z as default};