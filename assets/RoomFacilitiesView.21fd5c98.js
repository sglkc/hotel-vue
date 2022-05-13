import{_ as k}from"./index.9d8ddc5c.js";import{o as n,c as _,w as t,e as r,F as V,r as x,ab as T,A as i,t as p,a as e,V as f,b as u,a2 as B,i as s,H as b,I as m,X as h,ac as I,ad as U,G as w,$ as C,Q as N,v as R}from"./vendor.485835f2.js";const E={name:"RoomFacilityTable",data(){return{facilities:[{type_name:"Regular",id:1,room_type:1,name:"Double Bed",notes:"Includes pillows and a blanket"},{type_name:"Regular",id:2,room_type:1,name:"Work Desk",notes:"Includes a mirror and a table lamp"},{type_name:"Regular",id:3,room_type:1,name:"Air Conditioning",notes:"Complete with remote control"},{type_name:"Regular",id:4,room_type:1,name:"Bathroom",notes:"A compact bathroom for everyday use"},{type_name:"Exclusive",id:5,room_type:2,name:"Queen Bed",notes:"Includes pillows, a blanket, and a cupboard with bed lamp"},{type_name:"Exclusive",id:6,room_type:2,name:"Air Conditioning",notes:"Complete with remote control"},{type_name:"Exclusive",id:7,room_type:2,name:"Living Room",notes:"Includes a table, sofa, and a comfy rug"},{type_name:"Exclusive",id:8,room_type:2,name:"Balcony",notes:"With city view to accompany you"},{type_name:"Exclusive",id:9,room_type:2,name:"Bathroom",notes:"Features a bathtub and a shower"},{type_name:"Premium",id:10,room_type:3,name:"King Bed",notes:"Includes pillows, a blanket, and a cupboard with bed lamp"},{type_name:"Premium",id:11,room_type:3,name:"Air Conditioning",notes:"Complete with remote control"},{type_name:"Premium",id:12,room_type:3,name:"Living Room",notes:"Includes a table, sofa, a TV, and a DVD player"},{type_name:"Premium",id:13,room_type:3,name:"Kitchen",notes:"Free fresh vegetables daily and stainless silverwares"},{type_name:"Premium",id:14,room_type:3,name:"Dining Room",notes:"Imported wooden table with comfortable chairs"},{type_name:"Premium",id:15,room_type:3,name:"Bathroom",notes:"Spacious bathroom with a bathtub and a shower"}],selected:!1}},methods:{getRoomFacilities(){},updateFacility(l){this.selected=l.id,this.emitter.emit("updateRoomFacility",l)},deleteFacility(l){this.selected===l&&this.emitter.emit("updateRoomFacility",!1)}},created(){this.emitter.on("getRoomFacilities",this.getRoomFacilities),this.getRoomFacilities()}},D=i("thead",null,[i("tr",null,[i("th",null,"No"),i("th",null,"ID"),i("th",null,"Room Type"),i("th",null,"Room Type ID"),i("th",null,"Name"),i("th",null,"Notes"),i("th",{class:"text-center"},"Action")])],-1),q={key:0},A={class:"text-center"},P=s(" Delete "),j=s(" Update "),L={key:1},z={class:"text-center font-weight-bold",colspan:"7"},G=s("mdi-exclamation-thick"),S=i("span",{class:"text-red"},"Facility data is empty",-1),K={key:2},Q={class:"text-center font-weight-bold",colspan:"7"},W=s("mdi-loading"),H=s(" Loading facility data ");function J(l,d,y,F,o,c){return n(),_(B,null,{default:t(()=>[D,o.facilities.length?(n(),r("tbody",q,[(n(!0),r(V,null,x(o.facilities,(a,v)=>{var g;return n(),r("tr",{style:T(a.id===o.selected?"background: #EEE":""),key:v},[i("td",null,p(v+1),1),i("td",null,p(a.id),1),i("td",null,p(a.type_name),1),i("td",null,p(a.room_type),1),i("td",null,p(a.name),1),i("td",null,p((g=a.notes)!=null?g:"-"),1),i("td",A,[e(f,{class:"ma-1",color:"error",size:"small",variant:"contained-text",onClick:$=>c.deleteFacility(a.id)},{default:t(()=>[P]),_:2},1032,["onClick"]),e(f,{class:"ma-1",color:"warning",size:"small",variant:"contained-text",onClick:$=>c.updateFacility(a)},{default:t(()=>[j]),_:2},1032,["onClick"])])],4)}),128))])):o.facilities?(n(),r("tbody",L,[i("tr",null,[i("td",z,[e(u,{color:"red"},{default:t(()=>[G]),_:1}),S])])])):(n(),r("tbody",K,[i("tr",null,[i("td",Q,[e(u,{class:"mdi-spin"},{default:t(()=>[W]),_:1}),H])])]))]),_:1})}var O=k(E,[["render",J]]);const X={name:"RoomForm",data(){return{name:null,roomType:null,roomTypes:[{id:1,name:"Regular",description:"Just wanted to have a leisure? This room is perfect for you and your wallet.",image:"https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg",price:16e4,total:15},{id:2,name:"Exclusive",description:"Get more comfortable with a living room and a balcony with the city view.",image:"https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg",price:5e5,total:10},{id:3,name:"Premium",description:"Feel like home, complete with a living room, a dining room, and a fully equipped kitchen.",image:"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q60",price:129e4,total:5}],notes:null,required:l=>!!l||"Required"}},methods:{async submit(){!(await this.$refs.form.validate()).valid||this.roomType}}},M=s("mdi-bed-king"),Y=i("span",{class:"ms-3"},"Room Type*",-1),Z={key:0},ee={key:1,class:"mt-3"},te=s("mdi-exclamation-thick"),oe=i("span",{class:"text-red"},"Room type is empty",-1),ae={key:1,class:"mt-3"},ie=s("mdi-loading"),le=s(" Loading room types "),ne=s("mdi-plus"),se=s(" New ");function de(l,d,y,F,o,c){return n(),_(C,{ref:"form"},{default:t(()=>[e(w,null,{default:t(()=>[e(b,{justify:"center"},{default:t(()=>[e(m,{cols:"12",sm:"4",md:"3"},{default:t(()=>[e(h,{modelValue:o.name,"onUpdate:modelValue":d[0]||(d[0]=a=>o.name=a),label:"Name*","prepend-icon":"mdi-rename-box",variant:"underlined",rules:[o.required],"hide-details":""},null,8,["modelValue","rules"])]),_:1}),e(m,{cols:"12",sm:"5",md:"4"},{default:t(()=>[e(h,{modelValue:o.notes,"onUpdate:modelValue":d[1]||(d[1]=a=>o.notes=a),label:"Notes","prepend-icon":"mdi-note",variant:"underlined","hide-details":""},null,8,["modelValue"])]),_:1}),e(m,{class:"mt-3"},{default:t(()=>[i("div",{style:T("color: "+(o.roomType?"#00000099":"#b00020"))},[e(u,null,{default:t(()=>[M]),_:1}),Y],4),o.roomTypes?(n(),_(I,{key:0,modelValue:o.roomType,"onUpdate:modelValue":d[2]||(d[2]=a=>o.roomType=a),class:"mt-1","hide-details":"",mandatory:""},{default:t(()=>[o.roomTypes.length?(n(),r("span",Z,[(n(!0),r(V,null,x(o.roomTypes,a=>(n(),_(U,{key:a.id,label:a.name,value:a.id},null,8,["label","value"]))),128))])):(n(),r("div",ee,[e(u,{color:"red"},{default:t(()=>[te]),_:1}),oe]))]),_:1},8,["modelValue"])):(n(),r("div",ae,[e(u,{class:"mdi-spin"},{default:t(()=>[ie]),_:1}),le]))]),_:1}),e(m,{class:"mt-2 mb-sm-0 mb-3",align:"center"},{default:t(()=>[e(f,{color:"primary",type:"submit",variant:"outlined",onClick:c.submit},{default:t(()=>[e(u,null,{default:t(()=>[ne]),_:1}),se]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},512)}var me=k(X,[["render",de]]);const re={name:"RoomFacilityUpdateForm",props:{facility:Object},data(){return{name:this.facility.name,notes:this.facility.notes,required:l=>!!l||"Required"}},methods:{updateRoomFacility(l){this.name=l.name,this.notes=l.notes},async submit(){(await this.$refs.form.validate()).valid},cancel(){this.emitter.emit("updateRoomFacility",!1)}},created(){this.emitter.on("updateRoomFacility",this.updateRoomFacility)}},ce=s("mdi-update"),ue=s(" Update "),_e=s("mdi-keyboard-backspace"),pe=s(" Cancel ");function ye(l,d,y,F,o,c){return n(),_(C,{ref:"form"},{default:t(()=>[e(w,null,{default:t(()=>[e(b,null,{default:t(()=>[e(m,null,{default:t(()=>[e(N,{density:"compact",type:"warning",variant:"contained-text"},{default:t(()=>[s(" Updating room facility "+p(y.facility.id),1)]),_:1})]),_:1})]),_:1}),e(b,{class:"mt-3",justify:"center"},{default:t(()=>[e(m,{cols:"12",sm:"4"},{default:t(()=>[e(h,{modelValue:o.name,"onUpdate:modelValue":d[0]||(d[0]=a=>o.name=a),label:"Name*","prepend-icon":"mdi-rename-box",variant:"underlined",rules:[o.required],"hide-details":""},null,8,["modelValue","rules"])]),_:1}),e(m,{cols:"12",sm:"5"},{default:t(()=>[e(h,{modelValue:o.notes,"onUpdate:modelValue":d[1]||(d[1]=a=>o.notes=a),label:"Notes","prepend-icon":"mdi-note",variant:"underlined","hide-details":""},null,8,["modelValue"])]),_:1}),e(m,{cols:"6",sm:"3"},{default:t(()=>[e(h,{label:"Room Type*","prepend-icon":"mdi-bed-king",variant:"underlined","model-value":y.facility.type_name,disabled:"","hide-details":""},null,8,["model-value"])]),_:1}),e(m,{class:"mt-2 mb-sm-0 mb-3",align:"center"},{default:t(()=>[e(f,{class:"ma-1",color:"primary",type:"submit",variant:"outlined",onClick:c.submit},{default:t(()=>[e(u,null,{default:t(()=>[ce]),_:1}),ue]),_:1},8,["onClick"]),e(f,{class:"ma-1",color:"error",variant:"outlined",onClick:c.cancel},{default:t(()=>[e(u,null,{default:t(()=>[_e]),_:1}),pe]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},512)}var he=k(re,[["render",ye]]);const fe={name:"RoomFacilitiesView",components:{Table:O,Form:me,UpdateForm:he},data(){return{facility:!1}},methods:{updateRoomFacility(l){this.facility=l}},created(){this.emitter.on("updateRoomFacility",this.updateRoomFacility)}};function be(l,d,y,F,o,c){const a=R("Table"),v=R("Form"),g=R("UpdateForm");return n(),_(w,{class:"h-100 my-3"},{default:t(()=>[e(b,{class:"mb-6"},{default:t(()=>[e(m,{class:"elevation-1"},{default:t(()=>[e(a)]),_:1})]),_:1}),e(b,{class:"elevation-1 mt-3"},{default:t(()=>[o.facility?(n(),_(m,{key:1},{default:t(()=>[e(g,{facility:o.facility},null,8,["facility"])]),_:1})):(n(),_(m,{key:0},{default:t(()=>[e(v)]),_:1}))]),_:1})]),_:1})}var ke=k(fe,[["render",be],["__scopeId","data-v-33df989c"]]);export{ke as default};
