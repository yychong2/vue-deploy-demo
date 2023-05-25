import{_,d as u,u as T,C as m,H as y,r as s,o as i,c as h,a as l,b as a,e as x,t as S,w,i as P,j as V,F as p,g as b,h as R}from"./index-98e023ea.js";import{e as W}from"./main-3459e26b.js";let A={"X-Member-Details":u.defaults.headers.common["X-Member-Details"]};const B={data(){return{title:"",description:"",update_dob:null,max_date:null,startDate:null,endDate:null,format:"yyyy-MM-dd",report_type:"",options:[{value:"DEP",label:"Deposit"},{value:"WIT",label:"Withdrawal"},{value:"PRO",label:"Promotion"},{value:"TRA",label:"Transfer"},{value:"WL",label:"Bet"},{value:"VOU",label:"Voucher"}],headers:[],data:[],show:!1}},created(){const{t}=T();this.title=t("title.history"),this.description=t("title.history_description"),u.defaults.headers.common["X-Member-Details"]=m.AES.decrypt(sessionStorage.getItem("memDetail"),this.aesKey).toString(m.enc.Utf8)},methods:{searchHistory(){if(this.startDate==null||this.endDate==null||this.report_type=="")return alert("The field is required");u.post("History",{HistoryFromDate:this.startDate,HistoryToDate:this.endDate,ReportType:this.report_type},{headers:A}).then(t=>{t.data.ResponseCode=="0"&&(this.report_type=="DEP"?t.data.ReportDepositDetails!=null&&(this.data=t.data.ReportDepositDetails,this.show=!0,this.headers=[{text:"Deposit Number",value:"DepositNo"},{text:"Deposit Amount",value:"DepositAmount"},{text:"Deposit Method",value:"DepositMethodStr"},{text:"Deposit Status",value:"DepositStatusStr"},{text:"Deposit Time",value:"DepositTimeLocalStr"}]):this.report_type=="WIT"?t.data.ReportWithdrawDetails!=null&&(this.data=t.data.ReportWithdrawDetails,this.show=!0,this.headers=[{text:"Withdrawal Number",value:"WithdrawNo"},{text:"Withdrawal Amount",value:"WithdrawAmount"},{text:"Withdrawal Bank",value:"WithdrawBank"},{text:"Withdrawal Status",value:"WithdrawStatusStr"},{text:"Withdrawal Time",value:"WithdrawTimeLocalStr"}]):this.report_type=="PRO"?t.data.ReportPromotionDetails!=null&&(this.data=t.data.ReportPromotionDetails,this.show=!0,this.headers=[{text:"Promotion Title",value:"PromoTitle"},{text:"Promotion Amount",value:"PromoAmount"},{text:"Promotion turnover",value:"PromoTurnover"},{text:"Product Name",value:"ProductName"},{text:"Promotion Status",value:"PromoStatusStr"},{text:"Promotion Time",value:"PromoTimeLocalStr"}]):this.report_type=="TRA"?t.data.ReportTransferDetails!=null&&(this.data=t.data.ReportTransferDetails,this.show=!0,this.headers=[{text:"Transfer From",value:"TransferFrom"},{text:"Transfer To",value:"TransferTo"},{text:"Transfer Amount",value:"TransferAmount"},{text:"Transfer Status",value:"TransferStatusStr"},{text:"Transfer Time",value:"TransferTimeLocalStr"}]):this.report_type=="WL"?t.data.ReportBetDetails!=null&&(this.data=t.data.ReportBetDetails,this.show=!0,this.headers=[{text:"Bet Nunmber",value:"BetNo"},{text:"Total Record",value:"TotalRecord"},{text:"Product Name",value:"ProductName"},{text:"Product Type",value:"ProductType"},{text:"Turnover Amount",value:"TurnoverAmount"},{text:"Bet Amount",value:"BetAmount"},{text:"Win Lose",value:"WinLose"},{text:"Bet Time",value:"BetTimeLocal"}]):this.report_type=="VOU"&&t.data.ReportVoucherDetails!=null&&(this.data=t.data.ReportVoucherDetails,this.show=!0,this.headers=[{text:"Voucher Id",value:"VoucherId"},{text:"Voucher Amount",value:"VoucherAmount"},{text:"Voucher Title",value:"Title"},{text:"Voucher Status",value:"VoucherStatusStr"},{text:"Claim Time",value:"ClaimTimeLocalStr"}]))}).catch(t=>{console.error(t)})}},components:{Header:y,VueDatePicker:W}},g={class:"form-01-main"},H={class:"form-cover"},N={class:"form-sub-main"},L={class:"form-group"},k={class:"btn_uy"},C={class:"form-group"},M={class:"form-group"},E={class:"form-group"};function I(t,r,U,F,e,n){const c=s("Header"),v=s("el-option"),f=s("el-select"),d=s("VueDatePicker"),D=s("EasyDataTable");return i(),h(p,null,[l(c,{title:e.title,description:e.description},null,8,["title","description"]),a("section",g,[a("div",H,[a("form",{onSubmit:r[4]||(r[4]=x((...o)=>t.searchHistoryData&&t.searchHistoryData(...o),["prevent"]))},[a("div",N,[a("div",L,[a("div",k,[a("button",{type:"submit",onClick:r[0]||(r[0]=(...o)=>n.searchHistory&&n.searchHistory(...o))},S(t.$t("common.submit")),1)])]),a("div",C,[l(f,{class:"form-control _ge_de_ol",modelValue:e.report_type,"onUpdate:modelValue":r[1]||(r[1]=o=>e.report_type=o),placeholder:"Report Type"},{default:w(()=>[(i(!0),h(p,null,b(e.options,(o,O)=>(i(),R(v,{label:o.label,key:o.value,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),a("div",M,[l(d,{class:"form-control _ge_de_ol",modelValue:e.startDate,"onUpdate:modelValue":r[2]||(r[2]=o=>e.startDate=o),format:e.format,"auto-apply":"",placeholder:"Start Date"},null,8,["modelValue","format"])]),a("div",E,[l(d,{class:"form-control _ge_de_ol",modelValue:e.endDate,"onUpdate:modelValue":r[3]||(r[3]=o=>e.endDate=o),format:e.format,"auto-apply":"",placeholder:"End Date"},null,8,["modelValue","format"])])])],32),P(a("div",null,[l(D,{headers:e.headers,items:e.data},null,8,["headers","items"])],512),[[V,e.show]])])])],64)}const q=_(B,[["render",I]]);export{q as default};
