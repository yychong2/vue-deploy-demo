import{_ as m,d as a,u,C as l,H as c,r as w,o as _,c as f,a as h,b as e,e as g,f as n,v as d,t as b,F as v}from"./index-8c048e35.js";a.defaults.withCredentials=!0;const C={data(){return{title:"",description:"",old_password:"",new_password:"",confirm_password:""}},created(){const{t:r}=u();this.title=r("title.password"),this.description=r("title.password_description")},methods:{updatePassword(){a.defaults.headers.common["Content-Type"]="application/json",a.defaults.headers.common.Language="en-US",a.defaults.headers.common["X-Member-Details"]=l.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(l.enc.Utf8),a.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin");const r={"Content-Type":"application/json",Language:"en-US","X-Member-Details":a.defaults.headers.common["X-Member-Details"],Authorization:a.defaults.headers.common.Authorization};a.post(this.apiUrl+"ChangeUserPassword",{OldPassword:this.old_password,NewPassword:this.new_password},{headers:r}).then(s=>{console.log(s.data)}).catch(s=>{console.error(s)})}},components:{Header:c}},P={class:"form-01-main"},y={class:"form-cover"},S={class:"form-sub-main"},U={class:"form-group"},q={class:"form-group"},D={class:"form-group"},E={class:"form-group"},M={class:"btn_uy"},V=["disabled"];function k(r,s,A,H,o,i){const p=w("Header");return _(),f(v,null,[h(p,{title:o.title,description:o.description},null,8,["title","description"]),e("section",P,[e("div",y,[e("form",{onSubmit:s[4]||(s[4]=g((...t)=>r.submitChangePassword&&r.submitChangePassword(...t),["prevent"]))},[e("div",S,[e("div",U,[n(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":s[0]||(s[0]=t=>o.old_password=t),type:"password",placeholder:"Enter Old Passowrd",required:"","aria-required":"true"},null,512),[[d,o.old_password]])]),e("div",q,[n(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":s[1]||(s[1]=t=>o.new_password=t),type:"password",placeholder:"Enter New Password",required:"","aria-required":"true"},null,512),[[d,o.new_password]])]),e("div",D,[n(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":s[2]||(s[2]=t=>o.confirm_password=t),type:"password",placeholder:"Enter Confirm Password",required:"","aria-required":"true"},null,512),[[d,o.confirm_password]])]),e("div",E,[e("div",M,[e("button",{type:"submit",onClick:s[3]||(s[3]=(...t)=>i.updatePassword&&i.updatePassword(...t)),disabled:o.new_password!=o.confirm_password},b(r.$t("common.submit")),9,V)])])])],32)])])],64)}const z=m(C,[["render",k]]);export{z as default};
