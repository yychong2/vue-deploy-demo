import{_ as u,d as p,u as m,C as h,H as f,r as g,o as r,c as n,a as d,b as e,w,T as v,F as k,t as y,e as b,f as l,v as c}from"./index-f3956b56.js";const x="/vue-deploy-demo/assets/vector-4ff7aaef.png";p.defaults.withCredentials=!0;const S={data(){return{title:"",description:"",token:"",username:"",password:"",tokenSwitch:!1}},setup(){},created(){const{t:s}=m();this.title=s("title.login"),this.description=s("title.login_description")},methods:{getToken(){p.post(this.apiUrl+"auth",{username:this.username,password:this.password},{"X-Requested-With":"XMLHttpRequest",withCredentials:!0,credentials:"include"}).then(s=>{const t="{'UserId': '"+s.data.MemberDetail.UserId+"'}";sessionStorage.setItem("memDetail",h.AES.encrypt(t,this.aesKey)),sessionStorage.setItem("tokenLogin","Bearer "+s.data.AccessToken),this.token=s.data.AccessToken,this.tokenSwitch=!0,location.reload()}).catch(s=>{console.error(s)})}},components:{Header:f},computed:{}},T={class:"form-01-main"},C={class:"form-cover"},q={class:"container"},I={class:"row"},U={class:"col-md-12"},H={key:0,style:{"margin-top":"80px"}},L={style:{"overflow-wrap":"break-word",color:"white"}},B={key:1},D={class:"form-sub-main"},M=e("div",{class:"_main_head_as"},[e("a",{href:"#"},[e("img",{src:x})])],-1),V={class:"form-group"},A={class:"form-group"},E=e("i",{toggle:"#password",class:"fa fa-fw fa-eye toggle-password field-icon"},null,-1),F=e("div",{class:"form-group"},[e("div",{class:"check_box_main"},[e("a",{href:"#",class:"pas-text"},"Forgot Password")])],-1),P={class:"form-group"},W={class:"btn_uy"};function N(s,t,R,X,o,a){const _=g("Header");return r(),n(k,null,[d(_,{title:o.title,description:o.description},null,8,["title","description"]),e("section",T,[e("div",C,[e("div",q,[e("div",I,[e("div",U,[d(v,null,{default:w(()=>[o.tokenSwitch?(r(),n("div",H,[e("div",L,[e("p",null,"Token : "+y(o.token),1)])])):(r(),n("div",B,[e("form",{onSubmit:t[3]||(t[3]=b((...i)=>s.loginWithPassword&&s.loginWithPassword(...i),["prevent"]))},[e("div",D,[M,e("div",V,[l(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":t[0]||(t[0]=i=>o.username=i),type:"text",placeholder:"Enter Username",required:"","aria-required":"true"},null,512),[[c,o.username]])]),e("div",A,[l(e("input",{id:"password",type:"password",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=i=>o.password=i),name:"password",placeholder:"********",required:"required"},null,512),[[c,o.password]]),E]),F,e("div",P,[e("div",W,[e("button",{type:"submit",onClick:t[2]||(t[2]=(...i)=>a.getToken&&a.getToken(...i))},"Login")])])])],32)]))]),_:1})])])])])])],64)}const K=u(S,[["render",N]]);export{K as default};