import{_ as c,d as t,u as d,C as n,H as m,r as p,o as f,c as h,a as _,b as e,t as a,F as u}from"./index-75bf9c6a.js";t.defaults.withCredentials=!0;const g={data(){return{title:"",description:"",memProfile:{}}},created(){const{t:o}=d();this.title=o("title.profile"),this.description=o("title.profile_description"),this.getProfile()},methods:{getProfile:function(o){t.defaults.headers.common["Content-Type"]="application/json",t.defaults.headers.common["X-Member-Details"]=n.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(n.enc.Utf8),t.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin");const r={"Content-Type":"application/json",Language:"en-US","X-Member-Details":t.defaults.headers.common["X-Member-Details"],Authorization:t.defaults.headers.common.Authorization};t.get(this.apiUrl+"GetUserProfile",{},{headers:r}).then(s=>{this.memProfile=s.data.UserDetail}).catch(s=>{console.error(s)})}},components:{Header:m}},v={class:"form-01-main"},w={class:"form-cover"},P={class:"container"},y={class:"row"},D={class:"col-md-12"},S={style:{"margin-top":"80px"}},b={style:{"overflow-wrap":"break-word",color:"white"}},C={style:{"overflow-wrap":"break-word",color:"white"}};function k(o,r,s,x,i,U){const l=p("Header");return f(),h(u,null,[_(l,{title:i.title,description:i.description},null,8,["title","description"]),e("section",v,[e("div",w,[e("div",P,[e("div",y,[e("div",D,[e("div",S,[e("div",b,[e("p",null,"Profile Detail :"+a(i.memProfile),1)])])])])])])]),e("div",C,[e("p",null,"Profile Detail :"+a(i.memProfile),1)])],64)}const H=c(g,[["render",k]]);export{H as default};
