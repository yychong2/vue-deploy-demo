import{_,d as e,u as f,C as c,H as y,r as b,o as r,c as a,a as A,b as t,F as h,g as u,t as p}from"./index-3c50fdb7.js";e.defaults.withCredentials=!0;const C={data(){return{title:"",description:"",promotionList:{},promotionCategory:{},selectedArticle:null}},created(){const{t:o}=f();this.title=o("title.promotion"),this.description=o("title.promotion_description"),this.getPromotion(),this.getPromotionCategoryList()},methods:{getPromotion:function(o){e.defaults.headers.common["Content-Type"]="application/json",e.defaults.headers.common.Language="en-US",e.defaults.headers.common["X-Member-Details"]=c.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(c.enc.Utf8),e.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin");const n={"Content-Type":"application/json",Language:"en-US","X-Member-Details":e.defaults.headers.common["X-Member-Details"],Authorization:e.defaults.headers.common.Authorization};e.get(this.apiUrl+"GetPromotionNews",{},{headers:n}).then(s=>{this.promotionList=s.data.PromotionNewsList}).catch(s=>{console.error(s)})},getPromotionCategoryList:function(o){e.defaults.headers.common["Content-Type"]="application/json",e.defaults.headers.common.Language="en-US",e.defaults.headers.common["X-Member-Details"]=c.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(c.enc.Utf8),e.defaults.headers.common.Authorization=sessionStorage.getItem("tokenLogin");const n={"Content-Type":"application/json",Language:"en-US","X-Member-Details":e.defaults.headers.common["X-Member-Details"],Authorization:e.defaults.headers.common.Authorization};e.get(this.apiUrl+"GetPromotionCategoryList",{},{headers:n}).then(s=>{this.promotionCategory=s.data.PromotionCategoryList}).catch(s=>{console.error(s)})},filterArticle(o){this.selectedArticle=o},showAll(){this.selectedArticle=null}},computed:{filteredArticles(){return this.selectedArticle?this.promotionList.filter(n=>{if(n.CategoryType.match(this.selectedArticle.toString())!=null)return!0}):this.promotionList}},components:{Header:y}},L={class:"py-5"},S={class:"container px-4 px-lg-5 mt-5"},v={class:"row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"},w=t("h5",{class:"fw-bolder btn btn-outline-dark mt-auto"},"Show All",-1),k=[w],P=["onClick"],x={class:"card"},D={class:"fw-bolder btn btn-outline-dark mt-auto"},U={class:"card h-100"},I=["src"],T={class:"card-body p-4"},z={class:"text-center"},M={class:"fw-bolder"},X=t("div",{class:"card-footer p-4 pt-0 border-top-0 bg-transparent"},[t("div",{class:"text-center"},[t("a",{class:"btn btn-outline-dark mt-auto",href:"#"},"View Promotion")])],-1);function j(o,n,s,N,l,d){const g=b("Header");return r(),a(h,null,[A(g,{title:l.title,description:l.description},null,8,["title","description"]),t("section",L,[t("div",S,[t("div",v,[t("div",null,[t("div",{class:"card",onClick:n[0]||(n[0]=i=>d.showAll(o.category))},k),(r(!0),a(h,null,u(l.promotionCategory,(i,m)=>(r(),a("div",{key:m,onClick:H=>d.filterArticle(i.ParentId)},[t("div",x,[t("h5",D,p(i.CategoryName),1)])],8,P))),128))]),(r(!0),a(h,null,u(d.filteredArticles,(i,m)=>(r(),a("div",{class:"col mb-5",key:m},[t("div",U,[t("img",{class:"card-img-top",src:i.Image,alt:"{{ item.Title }}"},null,8,I),t("div",T,[t("div",z,[t("h5",M,p(i.Title),1)])]),X])]))),128))])])])],64)}const E=_(C,[["render",j]]);export{E as default};
