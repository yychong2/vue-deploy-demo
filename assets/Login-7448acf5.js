import{_,d as h,C as g,L as f,r as a,o as p,c as b,a as o,b as e,t as l,w as y,F as x}from"./index-d2e958fe.js";const U={data(){return{loading:!1}},created(){},methods:{onSubmit(t){this.loading=!0,h.post("auth",{Username:t.Username,Password:t.Password},{}).then(s=>{const n="{'Username': '"+s.data.MemberDetail.Username+"','UserId': '"+s.data.MemberDetail.UserId+"', 'UserGroup': '"+s.data.MemberDetail.UserGroup+"', 'IpAddress': '"+s.data.MemberDetail.IpAddress+"', 'PlayerType': '"+s.data.MemberDetail.PlayerType+"'}";sessionStorage.setItem("memDetail",g.AES.encrypt(n,this.aesKey)),sessionStorage.setItem("tokenLogin","Bearer "+s.data.AccessToken),this.$router.push({path:"/"}).then(()=>{this.$router.go()})}).catch(s=>{console.error(s)}).finally(s=>{this.loading=!1})},validateUsername(t){return t?/^[a-zA-Z0-9]{3,18}$/i.test(t)?!0:"This field must be a valid Username":"This field is required"},validatePassword(t){return t?/^[a-zA-Z0-9]{3,16}$/i.test(t)?!0:"This field must be a valid Password":"This field is required"}},components:{Loading:f},computed:{}},w={class:"py-5"},v={class:"container px-5"},P={class:"bg-light rounded-3 py-5 px-4 px-md-5 mb-5"},S={class:"text-center mb-5"},D=e("div",{class:"feature bg-dark bg-gradient text-white rounded-3 mb-3"},[e("i",{class:"bi bi-person-square"})],-1),F={class:"fw-bolder"},I={class:"row gx-5 justify-content-center"},M={class:"col-lg-8 col-xl-6"},T={class:"form-floating mb-3"},k=e("label",{for:"name"},"Username",-1),A={class:"form-floating mb-3"},L=e("label",{for:"name"},"Password",-1),$={class:"d-grid"},B={class:"btn btn-dark btn-lg",id:"submitButton"};function E(t,s,n,C,c,r){const m=a("Loading"),i=a("Field"),d=a("ErrorMessage"),u=a("Form");return p(),b(x,null,[o(m,{loading:c.loading},null,8,["loading"]),e("section",w,[e("div",v,[e("div",P,[e("div",S,[D,e("h1",F,l(t.$t("common.login")),1)]),e("div",I,[e("div",M,[o(u,{onSubmit:r.onSubmit,id:"loginForm"},{default:y(()=>[e("div",T,[o(i,{class:"form-control",name:"Username",type:"text",placeholder:"Enter Username",rules:r.validateUsername,autocomplete:"off"},null,8,["rules"]),k,o(d,{name:"Username",style:{color:"red"}})]),e("div",A,[o(i,{class:"form-control",name:"Password",type:"password",rules:r.validatePassword,placeholder:"********",autocomplete:"off"},null,8,["rules"]),L,o(d,{name:"Password",style:{color:"red"}})]),e("div",$,[e("button",B,l(t.$t("common.login")),1)])]),_:1},8,["onSubmit"])])])])])])],64)}const z=_(U,[["render",E]]);export{z as default};