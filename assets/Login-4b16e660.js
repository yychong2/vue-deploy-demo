import{_,d as r,u as h,H as f,r as g,o as a,c as l,a as d,b as e,w,T as v,F as k,t as c,e as y,f as m,v as u}from"./index-4eb0032d.js";const b="/vue-deploy-demo/assets/vector-4ff7aaef.png";r.defaults.withCredentials=!0;const D={data(){return{title:"",description:"",token:"",username:"",password:"",tokenSwitch:!1,memDetail:{},memProfile:{}}},setup(){},created(){const{t:s}=h();this.title=s("title.login"),this.description=s("title.login_description")},methods:{getToken(){r.post(this.apiUrl+"auth",{username:this.username,password:this.password},{"X-Requested-With":"XMLHttpRequest",withCredentials:!0,credentials:"include"}).then(s=>{this.memDetail=s.data.MemberDetail,sessionStorage.setItem("tokenLogin",s.data.AccessToken),this.token=s.data.AccessToken,this.tokenSwitch=!0}).catch(s=>{console.error(s)})},GetUserProfile(){r.defaults.headers.common["Content-Type"]="application/json",r.defaults.headers.common["X-Member-Details"]='{"UserId": "'+this.memDetail.UserId+'"}',r.defaults.headers.common.Authorization="Bearer "+sessionStorage.getItem("tokenLogin");const s={"Content-Type":"application/json",Language:"en-US","X-Member-Details":r.defaults.headers.common["X-Member-Details"],Authorization:r.defaults.headers.common.Authorization};r.get("https://flut.jcmmweb.com/api/v1/GetUserProfile",{},{headers:s}).then(t=>{this.memProfile=t.data.UserDetail}).catch(t=>{console.error(t)})}},components:{Header:f},computed:{}},P={class:"form-01-main"},U={class:"form-cover"},T={class:"container"},x={class:"row"},C={class:"col-md-12"},S={key:0,style:{"margin-top":"80px"}},L={style:{"overflow-wrap":"break-word",color:"white"}},M={style:{"overflow-wrap":"break-word",color:"white"}},q={class:"btn_uy"},A={key:1},H={class:"form-sub-main"},I=e("div",{class:"_main_head_as"},[e("a",{href:"#"},[e("img",{src:b})])],-1),X={class:"form-group"},B={class:"form-group"},G=e("i",{toggle:"#password",class:"fa fa-fw fa-eye toggle-password field-icon"},null,-1),V=e("div",{class:"form-group"},[e("div",{class:"check_box_main"},[e("a",{href:"#",class:"pas-text"},"Forgot Password")])],-1),j={class:"form-group"},z={class:"btn_uy"};function F(s,t,W,E,o,n){const p=g("Header");return a(),l(k,null,[d(p,{title:o.title,description:o.description},null,8,["title","description"]),e("section",P,[e("div",U,[e("div",T,[e("div",x,[e("div",C,[d(v,null,{default:w(()=>[o.tokenSwitch?(a(),l("div",S,[e("div",L,[e("p",null,"Token : "+c(o.token),1)]),e("div",M,[e("div",q,[e("button",{type:"button",onClick:t[0]||(t[0]=(...i)=>n.GetUserProfile&&n.GetUserProfile(...i))},"Click Profile Detail")]),e("p",null,"Profile Detail :"+c(o.memProfile),1)])])):(a(),l("div",A,[e("form",{onSubmit:t[4]||(t[4]=y((...i)=>s.loginWithPassword&&s.loginWithPassword(...i),["prevent"]))},[e("div",H,[I,e("div",X,[m(e("input",{class:"form-control _ge_de_ol","onUpdate:modelValue":t[1]||(t[1]=i=>o.username=i),type:"text",placeholder:"Enter Username",required:"","aria-required":"true"},null,512),[[u,o.username]])]),e("div",B,[m(e("input",{id:"password",type:"password",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=i=>o.password=i),name:"password",placeholder:"********",required:"required"},null,512),[[u,o.password]]),G]),V,e("div",j,[e("div",z,[e("button",{type:"submit",onClick:t[3]||(t[3]=(...i)=>n.getToken&&n.getToken(...i))},"Login")])])])],32)]))]),_:1})])])])])])],64)}const R=_(D,[["render",F]]);export{R as default};
