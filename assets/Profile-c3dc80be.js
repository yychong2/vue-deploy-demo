import{_ as c,d as i,u as d,C as r,H as m,r as _,o as h,c as p,a as f,b as e,t,F as u}from"./index-ef562248.js";i.defaults.withCredentials=!0;const b={data(){return{title:"",description:"",memProfile:{}}},created(){const{t:s}=d();this.title=s("title.profile"),this.description=s("title.profile_description"),this.getProfile()},methods:{getProfile:function(s){i.defaults.headers.common["Content-Type"]="application/json",i.defaults.headers.common["X-Member-Details"]=r.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(r.enc.Utf8),i.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin");const n={"Content-Type":"application/json",Language:"en-US","X-Member-Details":i.defaults.headers.common["X-Member-Details"],Authorization:i.defaults.headers.common.Authorization};i.get(this.apiUrl+"GetUserProfile",{},{headers:n}).then(l=>{this.memProfile=l.data.UserDetail}).catch(l=>{console.error(l)})}},components:{Header:m}},g={class:"form-01-main"},v={class:"form-cover"},y={class:"container",style:{"margin-top":"80px"}},P={class:"vh-90"},w={class:"container py-5 h-100"},C={class:"row d-flex justify-content-center align-items-center h-100"},x={class:"col col-lg-6 mb-4 mb-lg-0"},D={class:"card mb-3",style:{"border-radius":".5rem"}},S={class:"row g-0"},U={class:"col-md-4 gradient-custom text-center text-white",style:{"border-top-left-radius":".5rem","border-bottom-left-radius":".5rem"}},A=e("img",{src:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",alt:"Avatar",class:"img-fluid my-5",style:{width:"80px"}},null,-1),H=e("i",{class:"far fa-edit mb-5"},null,-1),$={class:"col-md-8"},j={class:"card-body p-4"},k=e("hr",{class:"mt-0 mb-4"},null,-1),z={class:"row pt-1"},B={class:"col-6 mb-3"},E={class:"text-muted"},I={class:"col-6 mb-3"},L={class:"text-muted"},M=e("hr",{class:"mt-0 mb-4"},null,-1),N={class:"row pt-1"},X={class:"col-6 mb-3"},F={class:"text-muted"},T={class:"col-6 mb-3"},V={class:"text-muted"};function G(s,n,l,J,o,K){const a=_("Header");return h(),p(u,null,[f(a,{title:o.title,description:o.description},null,8,["title","description"]),e("section",g,[e("div",v,[e("div",y,[e("section",P,[e("div",w,[e("div",C,[e("div",x,[e("div",D,[e("div",S,[e("div",U,[A,e("h5",null,t(o.memProfile.Username),1),e("p",null,t(s.$t("profile.web_designer")),1),H]),e("div",$,[e("div",j,[e("h6",null,t(s.$t("profile.information")),1),k,e("div",z,[e("div",B,[e("h6",null,t(s.$t("profile.email")),1),e("p",E,t(o.memProfile.Email),1)]),e("div",I,[e("h6",null,t(s.$t("profile.phone")),1),e("p",L,t(o.memProfile.Contact),1)])]),e("h6",null,t(s.$t("profile.more_detail")),1),M,e("div",N,[e("div",X,[e("h6",null,t(s.$t("profile.full_name")),1),e("p",F,t(o.memProfile.Name),1)]),e("div",T,[e("h6",null,t(s.$t("profile.date_created")),1),e("p",V,t(o.memProfile.DateCreatedLocal),1)])])])])])])])])])])])])])],64)}const O=c(b,[["render",G]]);export{O as default};
