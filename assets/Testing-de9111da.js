import{F as l,a as m,E as c}from"./vee-validate.esm-683495a7.js";import{_ as d,r as t,o as u,c as _,a as o,w as p,b as f}from"./index-f461efc9.js";const g={components:{Form:l,Field:m,ErrorMessage:c},methods:{onSubmit(e){console.log(JSON.stringify(e,null,2))},validateEmail(e){return e?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)?!0:"This field must be a valid email":"This field is required"}}},b={id:"app"},h=f("button",null,"Sign up",-1);function E(e,r,F,x,S,s){const n=t("Field"),a=t("ErrorMessage"),i=t("Form");return u(),_("div",b,[o(i,{onSubmit:s.onSubmit},{default:p(()=>[o(n,{name:"email",type:"email",rules:s.validateEmail},null,8,["rules"]),o(a,{name:"email"}),h]),_:1},8,["onSubmit"])])}const B=d(g,[["render",E]]);export{B as default};
