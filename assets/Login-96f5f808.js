import{_ as c,a as n,t as f,o as u,c as d,b as e,d as l,e as m,w as p,v as h,f as g,g as k,h as w,T as D,F as b}from"./index-0183b483.js";n.defaults.withCredentials=!0;const v={data(){return{data:"",token:"",username:"",password:"",tokenRes:!1,title:"Welcome Vue 2 Demo 22",errorMsg:"",gameCasino:[],memDetail:{},imagaSize:{width:"100px"},classReadData:{width:"796px"},memProfile:{}}},setup(){return{fun1:()=>{console.log("fun1")}}},created(){},methods:{getToken(){n.post(this.apiUrl+"auth ",{username:this.username,password:this.password},{"X-Requested-With":"XMLHttpRequest",withCredentials:!0,credentials:"include"}).then(t=>{this.data=t.data,this.token=t.data.AccessToken,this.memDetail=t.data.MemberDetail,this.tokenRes=!0}).catch(t=>{console.error(t),this.errorMsg=t})},GetUserProfile(){var t=JSON.stringify(f(this.memDetail));n.defaults.headers.common["Content-Type"]="application/json",n.defaults.headers.common["X-Member-Details"]=t,n.defaults.headers.common.Authorization="Bearer "+this.token;const s={"Content-Type":"application/json",Language:"en-US","X-Member-Details":n.defaults.headers.common["X-Member-Details"],Authorization:n.defaults.headers.common.Authorization};n.get("https://flut.jcmmweb.com/api/v1/GetUserProfile",{},{headers:s}).then(i=>{console.log(i.data),this.memProfile=i.data.UserDetail}).catch(i=>{console.error(i)})}},computed:{}},y={class:"title"},_={key:0},P={style:{"overflow-wrap":"break-word"}},T={key:1};function M(t,s,i,U,o,r){return u(),d(b,null,[e("h3",y,l(o.title),1),e("form",{onSubmit:s[3]||(s[3]=g((...a)=>t.loginWithPassword&&t.loginWithPassword(...a),["prevent"]))},[e("label",null,[m(" Username "),p(e("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=a=>o.username=a)},null,512),[[h,o.username]])]),e("label",null,[m(" Password "),p(e("input",{type:"password","onUpdate:modelValue":s[1]||(s[1]=a=>o.password=a)},null,512),[[h,o.password]])]),e("button",{type:"submit",onClick:s[2]||(s[2]=(...a)=>r.getToken&&r.getToken(...a))},"Log in")],32),k(D,null,{default:w(()=>[o.tokenRes?(u(),d("div",_,[e("div",P,[e("p",null,"Token : "+l(o.token),1)]),e("div",null,[e("button",{type:"button",onClick:s[4]||(s[4]=(...a)=>r.GetUserProfile&&r.GetUserProfile(...a))},"Click Profile Detail after click Token"),e("p",null,"Profile Detail :"+l(o.memProfile),1)])])):(u(),d("div",T,[e("p",null,l(o.errorMsg),1)]))]),_:1})],64)}const C=c(v,[["render",M]]);export{C as default};
