import{_ as D,d as u,C as L,r as c,o as r,c as i,b as s,t as v,a as n,w as a,F as p,g as h,e as f}from"./index-d3edd26f.js";let k={"X-Member-Details":u.defaults.headers.common["X-Member-Details"]};const x={data(){return{promotionResult:!1,operatorBankAccountList:{},productList:[],promotionList:[],productPromotionList:[],bank_selected:"",product_selected:"",promotion_selected:"",product_promotion_selected:""}},created(){u.defaults.headers.common["X-Member-Details"]=L.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(L.enc.Utf8),this.GetDepositDetails()},methods:{GetDepositDetails:function(d){u.get("GetDepositDetails",{},{headers:k}).then(e=>{e.data.ResponseCode=="0"&&(this.operatorBankAccountList=e.data.OperatorBankAccountList,e.data.ProductList.length>0&&(this.productList.push({ProductName:"Please select",Id:"",ProductCode:""}),e.data.ProductList.forEach(t=>{this.productList.push({ProductName:t.ProductName,ProductCode:t.Id,Id:t.Id})})),e.data.PromotionList.length>0&&(this.promotionList.push({Title:"Please select",Id:""}),e.data.PromotionList.forEach(t=>{this.promotionList.push({Title:t.Title,Id:t.Id})})))}).catch(e=>{console.error(e)})},onSubmit(d){const e=this.product_selected;u.post("Deposit",{DepositBankId:this.bank_selected,DepositBankCode:"",DepositAmount:d.amount_deposit,ProductId:this.product_selected,ProductCode:e,ProductPromotionId:this.product_promotion_selected,PromotionId:this.promotion_selected,PromotionCode:""},{headers:k}).then(t=>{t.data.ResponseCode=="0"&&alert(t.data.ResponseMessage)}).catch(t=>{console.error(t)})},onChange(d){const e=[];this.productList.forEach(t=>{t.ProductCode===d&&e.push(t)}),u.post("GetProductPromoList",{ProductId:e[0].Id,ProductCode:e[0].ProductCode,IsLaunchGame:!0},{headers:k}).then(t=>{t.data.ResponseCode=="0"&&(this.productPromotionList=[],t.data.ProductPromotionList.length>0?(this.productPromotionList.push({Title:"Please select",Id:""}),t.data.ProductPromotionList.forEach(b=>{this.productPromotionList.push({Title:b.Title,Id:b.Id})}),this.promotion_selected="",this.promotionResult=!0):(this.product_promotion_selected="",this.promotionResult=!1))}).catch(t=>{console.error(t)})},validateDepositAmount(d){return d?!0:"This field is required"}},components:{}},B={class:"py-5"},V={class:"container px-5"},A={class:"bg-light rounded-3 py-5 px-4 px-md-5 mb-5"},E={class:"text-center mb-5"},N=s("div",{class:"feature bg-dark bg-gradient text-white rounded-3 mb-3"},[s("i",{class:"bi bi-cash"})],-1),S={class:"fw-bolder"},T={class:"row gx-5 justify-content-center"},R={class:"col-lg-8 col-xl-6"},F={class:"form-floating mb-3"},M={class:"form-group"},q=s("span",{style:{color:"black"}},"Bank Name",-1),w={class:"form-floating mb-3"},G={class:"form-group"},U=s("span",{style:{color:"black"}},"Product Name",-1),X={key:0,class:"form-floating mb-3"},j={class:"form-group"},J=s("span",{style:{color:"black"}},"Product Promotion",-1),K={key:1,class:"form-floating mb-3"},O={class:"form-group"},z=s("span",{style:{color:"black"}},"Promotion",-1),H={class:"form-floating mb-3"},Q={class:"d-grid"},W={class:"btn btn-dark btn-lg",id:"submitButton"};function Y(d,e,t,b,l,P){const m=c("el-option"),_=c("el-select"),I=c("Field"),y=c("ErrorMessage"),C=c("Form");return r(),i("section",B,[s("div",V,[s("div",A,[s("div",E,[N,s("h1",S,v(d.$t("title.deposit")),1)]),s("div",T,[s("div",R,[n(C,{onSubmit:P.onSubmit},{default:a(()=>[s("div",F,[s("div",M,[q,n(_,{class:"form-control2 _ge_de_ol",modelValue:l.bank_selected,"onUpdate:modelValue":e[0]||(e[0]=o=>l.bank_selected=o),placeholder:"Please select","aria-required":"true"},{default:a(()=>[(r(!0),i(p,null,h(l.operatorBankAccountList,(o,g)=>(r(),f(m,{label:o.BankName,key:o.BankId,value:o.BankId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])]),s("div",w,[s("div",G,[U,n(_,{class:"form-control2 _ge_de_ol",modelValue:l.product_selected,"onUpdate:modelValue":e[1]||(e[1]=o=>l.product_selected=o),onChange:P.onChange,placeholder:"Please select","aria-required":"true"},{default:a(()=>[(r(!0),i(p,null,h(l.productList,(o,g)=>(r(),f(m,{label:o.ProductName,key:o.ProductCode,value:o.ProductCode},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])])]),l.promotionResult?(r(),i("div",X,[s("div",j,[J,n(_,{class:"form-control2 _ge_de_ol",modelValue:l.product_promotion_selected,"onUpdate:modelValue":e[2]||(e[2]=o=>l.product_promotion_selected=o),placeholder:"Please select","aria-required":"true"},{default:a(()=>[(r(!0),i(p,null,h(l.productPromotionList,(o,g)=>(r(),f(m,{label:o.Title,key:o.Id,value:o.Id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])):(r(),i("div",K,[s("div",O,[z,n(_,{class:"form-control2 _ge_de_ol",modelValue:l.promotion_selected,"onUpdate:modelValue":e[3]||(e[3]=o=>l.promotion_selected=o),placeholder:"Please select","aria-required":"true"},{default:a(()=>[(r(!0),i(p,null,h(l.promotionList,(o,g)=>(r(),f(m,{label:o.Title,key:o.Id,value:o.Id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])),s("div",H,[n(I,{class:"form-control2 _ge_de_ol",name:"amount_deposit",style:{color:"black"},type:"text",inputmode:"numeric",pattern:"/d+",placeholder:"Enter Deposit Amount",rules:P.validateDepositAmount,autocomplete:"off"},null,8,["rules"]),n(y,{name:"amount_deposit",style:{color:"red"}})]),s("div",Q,[s("button",W,v(d.$t("common.submit")),1)])]),_:1},8,["onSubmit"])])])])])])}const $=D(x,[["render",Y]]);export{$ as default};
