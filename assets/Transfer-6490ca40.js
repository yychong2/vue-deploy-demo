import{_ as r,d as e,u as i,C as a,H as c,r as l,o as d,c as m,a as u,F as p,b as s}from"./index-4e0af188.js";e.defaults.withCredentials=!0;let h={"Content-Type":"application/json",Language:"en-US","X-Member-Details":e.defaults.headers.common["X-Member-Details"],Authorization:e.defaults.headers.common.Authorization};const f={data(){return{title:"",description:"",voucher:"",afterResult:!1,detail:""}},created(){const{t}=i();this.title=t("title.transfer"),this.description=t("title.transfer_description"),this.GetProductWalletDetails()},methods:{GetProductWalletDetails(){e.defaults.headers.common["Content-Type"]="application/json",e.defaults.headers.common.Language="en-US",e.defaults.headers.common["X-Member-Details"]=a.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(a.enc.Utf8),e.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin"),e.get(this.apiUrl+"GetProductWalletDetails",{},{headers:h}).then(t=>{console.log(t.data)}).catch(t=>{console.error(t)})}},components:{Header:c}},_=s("section",{class:"form-01-main"},[s("div",{class:"form-cover"},[s("div",{class:"container"})])],-1);function g(t,D,S,C,o,v){const n=l("Header");return d(),m(p,null,[u(n,{title:o.title,description:o.description},null,8,["title","description"]),_],64)}const b=r(f,[["render",g]]);export{b as default};
