import{_ as L,d as c,C,r as d,o as l,c as r,b as t,t as D,a as i,w as u,F as h,g as b,e as k,l as y}from"./index-d3edd26f.js";let f={"X-Member-Details":c.defaults.headers.common["X-Member-Details"]};const I={data(){return{operatorBankAccountList:{},bankCodeList:[],promotionList:[],bank_selected:"",promotion_selected:"",bank_code_selected:"",bankCodeResult:!1}},created(){c.defaults.headers.common["X-Member-Details"]=C.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(C.enc.Utf8),this.GetDepositDetails()},methods:{GetDepositDetails:function(a){c.get("GetPGDepositDetails",{},{headers:f}).then(e=>{e.data.ResponseCode=="0"&&(this.operatorBankAccountList=e.data.OperatorBankAccountList,e.data.PromotionList.length>0&&(this.promotionList.push({Title:"Please select",Id:""}),e.data.PromotionList.forEach(s=>{this.promotionList.push({Title:s.Title,Id:s.Id})})))}).catch(e=>{console.error(e)})},GetBankCodeDetails(a){const e=[];this.operatorBankAccountList.forEach(s=>{s.BankId===a&&e.push(s)}),c.post("GetPgBankDetails",{DepositBankId:a,DepositBankCode:e[0].BankCode,DepositAmount:"",ProductId:"",ProductCode:"",ProductPromotionId:"",PromotionId:"",PromotionCode:"",SwiftCode:e[0].SwiftCode},{headers:f}).then(s=>{this.bankCodeList=[],s.data.ResponseCode=="0"&&(s.data.PgDetail.BankList!=null?s.data.PgDetail.BankList.length>0?(console.log(s.data),this.bankCodeList=s.data.PgDetail.BankList,console.log(this.bankCodeList),this.bankCodeResult=!0):(this.bankCodeList="",this.bankCodeResult=!1):(this.bankCodeList="",this.bankCodeResult=!1))}).catch(s=>{console.error(s)})},onSubmit(a){this.product_selected,c.post("PgDeposit",{DepositBankId:this.bank_selected,DepositBankCode:"",DepositAmount:a.amount_deposit,ProductId:"",ProductCode:"",ProductPromotionId:"",PromotionId:this.promotion_selected,PromotionCode:""},{headers:f}).then(e=>{console.log(e.data),e.data.ResponseCode=="0"&&(alert(e.data.ResponseMessage),window.open(e.data.ResponseData))}).catch(e=>{console.error(e)})},validateDepositAmount(a){return a?!0:"This field is required"}},components:{}},x={class:"py-5"},V={class:"container px-5"},A={class:"bg-light rounded-3 py-5 px-4 px-md-5 mb-5"},S={class:"text-center mb-5"},G=t("div",{class:"feature bg-dark bg-gradient text-white rounded-3 mb-3"},[t("i",{class:"bi bi-cash"})],-1),R={class:"fw-bolder"},w={class:"row gx-5 justify-content-center"},E={class:"col-lg-8 col-xl-6"},F={class:"form-floating mb-3"},M={class:"form-group"},N=t("span",{style:{color:"black"}},"Bank Name",-1),T={key:0,class:"form-floating mb-3"},q={class:"form-group"},U=t("span",{style:{color:"black"}},"Bank Options",-1),X={class:"form-floating mb-3"},O={class:"form-group"},j=t("span",{style:{color:"black"}},"Promotion",-1),J={class:"form-floating mb-3"},K={class:"d-grid"},z={class:"btn btn-dark btn-lg",id:"submitButton"};function H(a,e,s,Q,n,_){const m=d("el-option"),p=d("el-select"),P=d("Field"),B=d("ErrorMessage"),v=d("Form");return l(),r("section",x,[t("div",V,[t("div",A,[t("div",S,[G,t("h1",R,D(a.$t("title.deposit"))+" PG",1)]),t("div",w,[t("div",E,[i(v,{onSubmit:_.onSubmit},{default:u(()=>[t("div",F,[t("div",M,[N,i(p,{class:"form-control2 _ge_de_ol",modelValue:n.bank_selected,"onUpdate:modelValue":e[0]||(e[0]=o=>n.bank_selected=o),onChange:_.GetBankCodeDetails,placeholder:"Please select","aria-required":"true"},{default:u(()=>[(l(!0),r(h,null,b(n.operatorBankAccountList,(o,g)=>(l(),k(m,{label:o.BankName,key:o.BankId,value:o.BankId},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])])]),n.bankCodeResult?(l(),r("div",T,[t("div",q,[U,i(p,{class:"form-control2 _ge_de_ol",modelValue:n.bank_code_selected,"onUpdate:modelValue":e[1]||(e[1]=o=>n.bank_code_selected=o),placeholder:"Please select","aria-required":"true"},{default:u(()=>[(l(!0),r(h,null,b(n.bankCodeList,(o,g)=>(l(),k(m,{label:o.Name,key:o.Code,value:o.Code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])):y("",!0),t("div",X,[t("div",O,[j,i(p,{class:"form-control2 _ge_de_ol",modelValue:n.promotion_selected,"onUpdate:modelValue":e[2]||(e[2]=o=>n.promotion_selected=o),placeholder:"Please select","aria-required":"true"},{default:u(()=>[(l(!0),r(h,null,b(n.promotionList,(o,g)=>(l(),k(m,{label:o.Title,key:o.Id,value:o.Id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])]),t("div",J,[i(P,{class:"form-control2 _ge_de_ol",name:"amount_deposit",type:"text",inputmode:"numeric",pattern:"/d+",placeholder:"Enter Deposit Amount",rules:_.validateDepositAmount,autocomplete:"off"},null,8,["rules"]),i(B,{name:"amount_deposit",style:{color:"red"}})]),t("div",K,[t("button",z,D(a.$t("common.submit")),1)])]),_:1},8,["onSubmit"])])])])])])}const Y=L(I,[["render",H]]);export{Y as default};
