System.register(["./.pnpm-legacy-D7gMMfiP.js","./index-legacy-SBoowHpm.js"],(function(e,l){"use strict";var t,a,n,o,i,s,c,d,u,r,f,p,m,g,h,v,b,y,x,_,C,k,w,S,j,N,E,H;return{setters:[e=>{t=e.b,a=e.C,n=e.r,o=e.o,i=e.c,s=e.w,c=e.d,d=e.a,u=e.D,r=e.u,f=e.g,p=e.F,m=e.h,g=e.t,h=e.i,v=e.G,b=e.H,y=e.I,x=e.J,_=e.L,C=e.M,k=e.p,w=e.e,S=e.N,j=e.O,N=e.P,E=e.Q},e=>{H=e._}],execute:function(){var l=document.createElement("style");l.textContent=".file-list[data-v-d1d46af9]{margin-top:8px}.file-list .file-box[data-v-d1d46af9]{display:flex;align-items:center;justify-content:space-between;line-height:24px}.file-list .file-box .icon-del[data-v-d1d46af9]{cursor:pointer}.file-list .file-box .icon-del[data-v-d1d46af9]:hover{color:#f60}.container[data-v-403fb5f1]{padding:16px}.card[data-v-403fb5f1]{text-align:center}.card .tip[data-v-403fb5f1]{margin-top:16px;color:#666}.card .sheet-list[data-v-403fb5f1]{padding-top:16px;display:flex;justify-content:center;flex-wrap:wrap}.card .sheet-list .sheet-item[data-v-403fb5f1]{margin:8px;cursor:pointer;color:#409eff}\n",document.head.appendChild(l);const V=(e=>(k("data-v-d1d46af9"),e=e(),w(),e))((()=>c("p",null,"将文件拖到此处或点击上传",-1))),B={key:0,class:"file-list"},O={class:"dialog-footer"},D=Object.assign({name:"UploadDialog"},{__name:"UploadDialog",props:{dialogVisible:{type:Boolean,default:!1},width:{type:[String,Number],default:"500"},title:{type:String,default:"上传"},modal:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!0},limit:{type:Number,default:3},accept:{type:[String,Array],default:".xls,.xlsx"},loading:{type:Boolean,default:!1}},emits:["on-confirm","on-cancel"],setup(e,{emit:l}){const k=e,w=l,S=t(!1),j=t([]),N=t(!1);function E(e){return j.value.length<k.limit?j.value.push(e):b.warning(`最多允许上传${k.limit}个文件`),!1}function H(){w("on-cancel"),j.value=[]}function D(){0===j.value.length?b.error("请选择要上传的文件"):w("on-confirm",j.value)}return a((()=>k.dialogVisible),(e=>{S.value=e}),{immediate:!0}),(l,t)=>{const a=n("upload-filled"),b=y,k=x,w=n("CircleClose"),I=_,P=C;return o(),i(P,{modelValue:r(S),"onUpdate:modelValue":t[0]||(t[0]=e=>v(S)?S.value=e:null),title:e.title,width:e.width,modal:e.modal,draggable:e.draggable,"before-close":H},{footer:s((()=>[c("div",O,[d(I,{onClick:H},{default:s((()=>[u("取消")])),_:1}),d(I,{type:"primary",loading:e.loading,onClick:D},{default:s((()=>[u("确定")])),_:1},8,["loading"])])])),default:s((()=>[d(k,{multiple:e.multiple,limit:e.limit,drag:"",action:"",accept:e.accept,"before-upload":E,disabled:r(N)},{default:s((()=>[d(b,{class:"el-icon--upload"},{default:s((()=>[d(a)])),_:1}),V])),_:1},8,["multiple","limit","accept","disabled"]),r(j).length>0?(o(),f("ul",B,[(o(!0),f(p,null,m(r(j),(e=>(o(),f("li",{key:e.uid,class:"file-box"},[c("span",null,g(e.name),1),d(b,{class:"icon-del",size:"16px",onClick:l=>function(e){const l=j.value.findIndex((l=>l.uid===e.uid));-1!==l&&j.value.splice(l,1)}(e)},{default:s((()=>[d(w)])),_:2},1032,["onClick"])])))),128))])):h("",!0)])),_:1},8,["modelValue","title","width","modal","draggable"])}}}),I=H(D,[["__scopeId","data-v-d1d46af9"]]),P={class:"base-container container"},U={key:0,class:"tip"},$={key:1,class:"sheet-list"},A=["onClick"],F=Object.assign({name:"StudentClassHours"},{__name:"studentClassHours",setup(e){const l=t(!1),a=t(!1),n=t([]),i=[3,4,5,6,7,8,11,12,13,14,15,16,19,20,21,22,23,24,27,28,29,30,31,32,35,36,37,38,39,40,43,44,45,46,47,48];function c(){l.value=!0}function v(){l.value=!1}async function b(e){var t;a.value=!0,n.value=await(t=e[0],new Promise((e=>{const l=new FileReader;l.onload=l=>{const t=l.target.result,a=S(t,{type:"binary"});console.log("excel原始数据",a);const n=[];a.SheetNames.forEach((e=>{const l={sheetName:e,sheetData:j.sheet_to_json(a.Sheets[e])};n.push(l)})),console.log("json序列化后的excel数据",n),e(n)},l.readAsBinaryString(t)}))),a.value=!1,l.value=!1,1===n.value.length&&y(n.value[0])}function y(e){const l=[];e.sheetData.forEach((e=>{if(i.includes(e.__rowNum__))for(const t in e)t.includes("EMPTY")&&l.push(e[t])})),console.log("学生姓名和对应的课时数据",l);const t={};l.forEach(((e,a)=>{a%2==0&&(t[e]?t[e].classHours.push(l[a+1]):t[e]={name:e,classHours:[l[a+1]],sum:0})}));let a=0;for(const i in t)t[i].classHours.forEach((e=>{t[i].sum+=e})),a+=t[i].sum;console.log("按照学生姓名分组的课时数据",t),console.log("所有学生的合计课时数据",a);const n=Object.values(t).map(((e,l)=>{const t={"序号":String(l+1),"姓名":e.name,"总计":e.sum};return e.classHours.forEach(((e,l)=>{t[`第${l+1}节`]=e})),t})),o={"序号":"","姓名":"","总计":a};n.push(o),console.log("下载的数据格式",n),function(e,l){const t=`${l}.xlsx`,a="Sheet 1",n=j.book_new(),o=j.json_to_sheet(e);j.book_append_sheet(n,o,a),N(n,t)}(n,e.sheetName)}return(e,t)=>{const i=_,x=E,C=I;return o(),f("div",P,[d(x,{class:"card"},{default:s((()=>[d(i,{type:"primary",onClick:c},{default:s((()=>[u("上传文件")])),_:1}),r(n).length>1?(o(),f("p",U,"检测到存在多个Sheet页，请选择一个下载")):h("",!0),r(n).length>1?(o(),f("ul",$,[(o(!0),f(p,null,m(r(n),(e=>(o(),f("li",{key:e.sheetName,class:"sheet-item",onClick:l=>y(e)},g(e.sheetName),9,A)))),128))])):h("",!0)])),_:1}),d(C,{dialogVisible:r(l),accept:".xls,.xlsx",loading:r(a),onOnConfirm:b,onOnCancel:v},null,8,["dialogVisible","loading"])])}}});e("default",H(F,[["__scopeId","data-v-403fb5f1"]]))}}}));
