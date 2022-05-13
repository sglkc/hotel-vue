import{_ as p,A as S}from"./index.9d8ddc5c.js";import{o as u,e as y,c as d,w as e,a as t,I as o,Q as _,H as l,A as c,t as i,d as V,f as n,i as a,V as v,b as I,G as f,K as b,L as w,v as k}from"./vendor.485835f2.js";const C={name:"StaffView",components:{AuthForm:S},data(){return{loggedIn:null,message:""}},methods:{logout(){window.localStorage.clear(),location.reload()},verifyStaff(){const s=this.store.state.USER.role_name;s!=="admin"&&s!=="receptionist"?(this.message="Your account is unauthorized",this.loggedIn=!1):this.loggedIn=!0}},async created(){if(this.emitter.on("refreshView",this.verifyStaff),!this.store.state.JWT_TOKEN)return this.loggedIn=!1;this.verifyStaff()}},m=s=>(b("data-v-3b0a40b1"),s=s(),w(),s),E={key:0},R=a("Successfully logged in"),A=m(()=>c("h1",null,"Staff CRUD Operations currently unavailable",-1)),U={class:"pa-3"},B=m(()=>c("b",null,"Use the sidebar to get started",-1)),L=a("mdi-logout"),N=a(" Logout ");function x(s,F,T,D,r,h){const g=k("AuthForm");return r.loggedIn===null?(u(),y("div",E)):r.loggedIn?(u(),d(f,{key:1,class:"h-100"},{default:e(()=>[t(l,{class:"mt-auto mb-0"},{default:e(()=>[t(o,{class:"mb-0 pb-0"},{default:e(()=>[t(_,{type:"success"},{default:e(()=>[R]),_:1})]),_:1})]),_:1}),t(l,{class:"mt-auto mb-6"},{default:e(()=>[t(o,null,{default:e(()=>[t(_,{type:"error",prominent:""},{default:e(()=>[A]),_:1})]),_:1})]),_:1}),t(l,null,{default:e(()=>[t(o,{class:"elevation-1"},{default:e(()=>[c("h1",U,"Welcome, "+i(s.store.state.USER.full_name),1),t(V,{density:"compact"},{default:e(()=>[t(n,null,{default:e(()=>[a("Email: "+i(s.store.state.USER.email),1)]),_:1}),t(n,null,{default:e(()=>[a("Role: "+i(s.store.state.USER.role_name),1)]),_:1}),t(n,null,{default:e(()=>[B]),_:1}),t(n,null,{default:e(()=>[t(v,{color:"error",variant:"outlined",onClick:h.logout},{default:e(()=>[t(I,null,{default:e(()=>[L]),_:1}),N]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):(u(),d(f,{key:2,class:"h-100",fluid:""},{default:e(()=>[t(l,{class:"h-100",align:"center",justify:"center"},{default:e(()=>[t(o,{cols:"auto",md:"5",lg:"4"},{default:e(()=>[t(g,{message:r.message},null,8,["message"])]),_:1})]),_:1})]),_:1}))}var W=p(C,[["render",x],["__scopeId","data-v-3b0a40b1"]]);export{W as default};
