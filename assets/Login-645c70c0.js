import{_,u,d as m,C as h,H as f,r as g,o as i,c as n,a as d,b as e,w as v,T as w,F as k,t as y,e as b,f as l,v as c}from"./index-200b4202.js";const x="/vue-deploy-demo/assets/vector-4ff7aaef.png";const U={data(){return{title:"",description:"",token:"",username:"",password:"",tokenSwitch:!1}},setup(){},created(){const{t:s}=u();this.title=s("title.login"),this.description=s("title.login_description")},methods:{getToken(){m.post("auth",{username:this.username,password:this.password},{"X-Requested-With":"XMLHttpRequest",withCredentials:!0,credentials:"include"}).then(s=>{const t="{'Username': '"+s.data.MemberDetail.Username+"','UserId': '"+s.data.MemberDetail.UserId+"', 'UserGroup': '"+s.data.MemberDetail.UserGroup+"', 'IpAddress': '"+s.data.MemberDetail.IpAddress+"'}";sessionStorage.setItem("memDetail",h.AES.encrypt(t,this.aesKey)),sessionStorage.setItem("tokenLogin","Bearer "+s.data.AccessToken),location.reload()}).catch(s=>{console.error(s)})}},components:{Header:f},computed:{}},I={class:"form-01-main"},S={class:"form-cover"},T={class:"container"},D={class:"row"},M={class:"col-md-12"},q={key:0,style:{"margin-top":"80px"}},C={style:{"overflow-wrap":"break-word",color:"white"}},H={key:1},L={class:"form-sub-main"},A=e("div",{class:"_main_head_as"},[e("a",{href:"#"},[e("img",{src:x})])],-1),B={class:"form-group"},V={class:"form-group"},E=e("i",{toggle:"#password",class:"fa fa-fw fa-eye toggle-password field-icon"},null,-1),F=e("div",{class:"form-group"},[e("div",{class:"check_box_main"},[e("a",{href:"#",class:"pas-text"},"Forgot Password")])],-1),P={class:"form-group"},W={class:"btn_uy"};function G(s,t,N,R,o,a){const p=g("Header");return i(),n(k,null,[d(p,{title:o.title,description:o.description},null,8,["title","description"]),e("section",I,[e("div",S,[e("div",T,[e("div",D,[e("div",M,[d(w,null,{default:v(()=>[o.tokenSwitch?(i(),n("div",q,[e("div",C,[e("p",null,"Token : "+y(o.token),1)])])):(i(),n("div",H,[e("form",{onSubmit:t[3]||(t[3]=b((...r)=>s.loginWithPassword&&s.loginWithPassword(...r),["prevent"]))},[e("div",L,[A,e("div",B,[l(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":t[0]||(t[0]=r=>o.username=r),type:"text",placeholder:"Enter Username",required:"","aria-required":"true"},null,512),[[c,o.username]])]),e("div",V,[l(e("input",{id:"password",type:"password",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=r=>o.password=r),name:"password",placeholder:"********",required:"required"},null,512),[[c,o.password]]),E]),F,e("div",P,[e("div",W,[e("button",{type:"submit",onClick:t[2]||(t[2]=(...r)=>a.getToken&&a.getToken(...r))},"Login")])])])],32)]))]),_:1})])])])])])],64)}const J=_(U,[["render",G]]);export{J as default};
