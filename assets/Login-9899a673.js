import{_,u,d as p,C as g,H as f,L as h,r as a,o as v,c as y,a as o,b as e,w as b,F as U,t as w}from"./index-5ac596e8.js";const x="/vue-deploy-demo/assets/vector-4ff7aaef.png";const P={data(){return{title:"",description:"",message:"",loading:!1}},setup(){},created(){const{t:s}=u();this.title=s("title.login"),this.description=s("title.login_description")},methods:{onSubmit(s){this.loading=!0,p.post("auth",{Username:s.Username,Password:s.Password},{}).then(t=>{const n="{'Username': '"+t.data.MemberDetail.Username+"','UserId': '"+t.data.MemberDetail.UserId+"', 'UserGroup': '"+t.data.MemberDetail.UserGroup+"', 'IpAddress': '"+t.data.MemberDetail.IpAddress+"', 'PlayerType': '"+t.data.MemberDetail.PlayerType+"'}";sessionStorage.setItem("memDetail",g.AES.encrypt(n,this.aesKey)),sessionStorage.setItem("tokenLogin","Bearer "+t.data.AccessToken),location.reload()}).catch(t=>{console.error(t)})},validateUsername(s){return s?/^[a-zA-Z0-9]{3,18}$/i.test(s)?!0:"This field must be a valid Username":"This field is required"},validatePassword(s){return s?/^[a-zA-Z0-9]{3,16}$/i.test(s)?!0:"This field must be a valid Password":"This field is required"}},components:{Header:f,Loading:h},computed:{}},S={class:"form-01-main"},I={class:"form-cover"},D={class:"container"},L={class:"row"},M={class:"col-md-12"},T={class:"form-sub-main"},A=e("div",{class:"_main_head_as"},[e("a",{href:"#"},[e("img",{src:x})])],-1),F={class:"form-group"},E={class:"form-group"},k={class:"form-group"},B={class:"btn_uy"};function C(s,t,n,$,l,r){const c=a("Loading"),i=a("Field"),d=a("ErrorMessage"),m=a("Form");return v(),y(U,null,[o(c,{loading:l.loading},null,8,["loading"]),e("section",S,[e("div",I,[e("div",D,[e("div",L,[e("div",M,[o(m,{onSubmit:r.onSubmit},{default:b(()=>[e("div",T,[A,e("div",F,[o(i,{class:"form-control _ge_de_ol",name:"Username",type:"text",placeholder:"Enter Username",rules:r.validateUsername,autocomplete:"off"},null,8,["rules"]),o(d,{name:"Username",style:{color:"red"}})]),e("div",E,[o(i,{class:"form-control _ge_de_ol",name:"Password",type:"password",rules:r.validatePassword,placeholder:"********",autocomplete:"off"},null,8,["rules"]),o(d,{name:"Password",style:{color:"red"}})]),e("div",k,[e("div",B,[e("button",null,w(s.$t("common.login")),1)])])])]),_:1},8,["onSubmit"])])])])])])],64)}const z=_(P,[["render",C]]);export{z as default};