import{_ as V}from"./index.9d8ddc5c.js";import{o as i,c as y,w as a,e as c,F as v,r as D,A as e,t as o,a as l,b,a2 as T,i as p,a0 as w,I as u,H as f,X as x,G as S,K as I,L,v as k}from"./vendor.485835f2.js";const R={name:"ReservationsTable",data(){return{entries:[{user_name:"Dummy",email:"dummy@dum.my",phone:"12345678",room_name:"x30-04",id:1,room_id:1,user_id:1,checkin:"2022-04-10T17:00:00.000Z",checkout:"2022-04-12T17:00:00.000Z",created_at:"2022-04-11T04:46:12.000Z"}],filter:null,date:null}},computed:{filtered(){return!this.filter&&!this.date?this.entries:this.entries.filter(t=>{const s=`${t.user_name}${t.email}${t.phone}`,_=new Date(t.checkin).toLocaleDateString();return this.date?s.includes(this.filter)&&_===this.date.toLocaleDateString():s.includes(this.filter)})}},methods:{filterTable(t){this.filter=t.filter,this.date=t.date},getData(){}},created(){this.emitter.on("filterTable",this.filterTable),this.emitter.on("getData",this.getData),this.getData()}},C=e("thead",null,[e("tr",null,[e("th",null,"ID"),e("th",null,"Room Name"),e("th",null,"Name"),e("th",null,"Email"),e("th",null,"Phone"),e("th",null,"Check In"),e("th",null,"Check Out"),e("th",null,"Created At")])],-1),N={key:0},$={key:1},B={class:"text-center font-weight-bold",colspan:"8"},F=p("mdi-exclamation-thick"),U=e("span",{class:"text-red"},"Reservation data is empty",-1),Z={key:2},A={class:"text-center font-weight-bold",colspan:"8"},E=p("mdi-loading"),P=p(" Loading reservation data ");function G(t,s,_,g,d,r){return i(),y(T,null,{default:a(()=>[C,r.filtered.length?(i(),c("tbody",N,[(i(!0),c(v,null,D(r.filtered,(n,h)=>(i(),c("tr",{key:h},[e("td",null,o(n.id),1),e("td",null,o(n.room_name),1),e("td",null,o(n.user_name),1),e("td",null,o(n.email),1),e("td",null,o(n.phone),1),e("td",null,o(new Date(n.checkin).toLocaleDateString()),1),e("td",null,o(new Date(n.checkout).toLocaleDateString()),1),e("td",null,o(new Date(n.created_at).toLocaleString()),1)]))),128))])):r.filtered?(i(),c("tbody",$,[e("tr",null,[e("td",B,[l(b,{color:"red"},{default:a(()=>[F]),_:1}),U])])])):(i(),c("tbody",Z,[e("tr",null,[e("td",A,[l(b,{class:"mdi-spin"},{default:a(()=>[E]),_:1}),P])])]))]),_:1})}var H=V(R,[["render",G]]);const K={name:"ReservationsView",components:{Table:H,Datepicker:w},data(){return{filter:"",date:""}},methods:{filterTable(){this.emitter.emit("filterTable",{filter:this.filter,date:this.date})}}},O=t=>(I("data-v-5bd7442e"),t=t(),L(),t),Q=O(()=>e("h3",{class:"mb-3"},"Reservations made by users",-1));function X(t,s,_,g,d,r){const n=k("Datepicker"),h=k("Table");return i(),y(S,{class:"my-3 elevation-1"},{default:a(()=>[l(f,null,{default:a(()=>[l(u,null,{default:a(()=>[Q]),_:1})]),_:1}),l(f,null,{default:a(()=>[l(u,null,{default:a(()=>[l(x,{modelValue:d.filter,"onUpdate:modelValue":[s[0]||(s[0]=m=>d.filter=m),r.filterTable],label:"Search by name, email, or phone",density:"comfortable",variant:"underlined","hide-details":""},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(u,null,{default:a(()=>[l(n,{modelValue:d.date,"onUpdate:modelValue":[s[1]||(s[1]=m=>d.date=m),r.filterTable],placeholder:"Filter by check in date",enableTimePicker:!1},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1}),l(f,null,{default:a(()=>[l(u,null,{default:a(()=>[l(h)]),_:1})]),_:1})]),_:1})}var z=V(K,[["render",X],["__scopeId","data-v-5bd7442e"]]);export{z as default};