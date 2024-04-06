import{b as e,C as a,r as l,o as t,c as s,w as o,d as n,a as i,D as c,u,g as d,F as r,h as p,t as m,i as f,G as g,H as h,I as _,J as b,L as v,M as y,p as x,e as k,N as C,O as w,P as S,Q as N}from"./.pnpm-DGulWNm0.js";import{_ as j}from"./index-CdCvfhrn.js";const H=(e=>(x("data-v-d1d46af9"),e=e(),k(),e))((()=>n("p",null,"将文件拖到此处或点击上传",-1))),V={key:0,class:"file-list"},B={class:"dialog-footer"},E=j(Object.assign({name:"UploadDialog"},{__name:"UploadDialog",props:{dialogVisible:{type:Boolean,default:!1},width:{type:[String,Number],default:"500"},title:{type:String,default:"上传"},modal:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!0},limit:{type:Number,default:3},accept:{type:[String,Array],default:".xls,.xlsx"},loading:{type:Boolean,default:!1}},emits:["on-confirm","on-cancel"],setup(x,{emit:k}){const C=x,w=k,S=e(!1),N=e([]),j=e(!1);function E(e){return N.value.length<C.limit?N.value.push(e):h.warning("最多允许上传".concat(C.limit,"个文件")),!1}function O(){w("on-cancel"),N.value=[]}function D(){0===N.value.length?h.error("请选择要上传的文件"):w("on-confirm",N.value)}return a((()=>C.dialogVisible),(e=>{S.value=e}),{immediate:!0}),(e,a)=>{const h=l("upload-filled"),k=_,C=b,w=l("CircleClose"),I=v,P=y;return t(),s(P,{modelValue:u(S),"onUpdate:modelValue":a[0]||(a[0]=e=>g(S)?S.value=e:null),title:x.title,width:x.width,modal:x.modal,draggable:x.draggable,"before-close":O},{footer:o((()=>[n("div",B,[i(I,{onClick:O},{default:o((()=>[c("取消")])),_:1}),i(I,{type:"primary",loading:x.loading,onClick:D},{default:o((()=>[c("确定")])),_:1},8,["loading"])])])),default:o((()=>[i(C,{multiple:x.multiple,limit:x.limit,drag:"",action:"",accept:x.accept,"before-upload":E,disabled:u(j)},{default:o((()=>[i(k,{class:"el-icon--upload"},{default:o((()=>[i(h)])),_:1}),H])),_:1},8,["multiple","limit","accept","disabled"]),u(N).length>0?(t(),d("ul",V,[(t(!0),d(r,null,p(u(N),(e=>(t(),d("li",{key:e.uid,class:"file-box"},[n("span",null,m(e.name),1),i(k,{class:"icon-del",size:"16px",onClick:a=>function(e){const a=N.value.findIndex((a=>a.uid===e.uid));-1!==a&&N.value.splice(a,1)}(e)},{default:o((()=>[i(w)])),_:2},1032,["onClick"])])))),128))])):f("",!0)])),_:1},8,["modelValue","title","width","modal","draggable"])}}}),[["__scopeId","data-v-d1d46af9"]]),O={class:"base-container container"},D={key:0,class:"tip"},I={key:1,class:"sheet-list"},P=["onClick"],U=j(Object.assign({name:"StudentClassHours"},{__name:"studentClassHours",setup(a){const l=e(!1),s=e(!1),n=e([]),g=[3,4,5,6,7,8,11,12,13,14,15,16,19,20,21,22,23,24,27,28,29,30,31,32,35,36,37,38,39,40,43,44,45,46,47,48];function h(){l.value=!0}function _(){l.value=!1}async function b(e){var a;s.value=!0,n.value=await(a=e[0],new Promise((e=>{const l=new FileReader;l.onload=a=>{const l=a.target.result,t=C(l,{type:"binary"});console.log("excel原始数据",t);const s=[];t.SheetNames.forEach((e=>{const a={sheetName:e,sheetData:w.sheet_to_json(t.Sheets[e])};s.push(a)})),console.log("json序列化后的excel数据",s),e(s)},l.readAsBinaryString(a)}))),s.value=!1,l.value=!1,1===n.value.length&&y(n.value[0])}function y(e){const a=[];e.sheetData.forEach((e=>{if(g.includes(e.__rowNum__))for(const l in e)l.includes("EMPTY")&&a.push(e[l])})),console.log("学生姓名和对应的课时数据",a);const l={};a.forEach(((e,t)=>{t%2==0&&(l[e]?l[e].classHours.push(a[t+1]):l[e]={name:e,classHours:[a[t+1]],sum:0})}));let t=0;for(const n in l)l[n].classHours.forEach((e=>{l[n].sum+=e})),t+=l[n].sum;console.log("按照学生姓名分组的课时数据",l),console.log("所有学生的合计课时数据",t);const s=Object.values(l).map(((e,a)=>{const l={"序号":String(a+1),"姓名":e.name,"总计":e.sum};return e.classHours.forEach(((e,a)=>{l["第".concat(a+1,"节")]=e})),l})),o={"序号":"","姓名":"","总计":t};s.push(o),console.log("下载的数据格式",s),function(e,a){const l="".concat(a,".xlsx"),t="Sheet 1",s=w.book_new(),o=w.json_to_sheet(e);w.book_append_sheet(s,o,t),S(s,l)}(s,e.sheetName)}return(e,a)=>{const g=v,x=N,k=E;return t(),d("div",O,[i(x,{class:"card"},{default:o((()=>[i(g,{type:"primary",onClick:h},{default:o((()=>[c("上传文件")])),_:1}),u(n).length>1?(t(),d("p",D,"检测到存在多个Sheet页，请选择一个下载")):f("",!0),u(n).length>1?(t(),d("ul",I,[(t(!0),d(r,null,p(u(n),(e=>(t(),d("li",{key:e.sheetName,class:"sheet-item",onClick:a=>y(e)},m(e.sheetName),9,P)))),128))])):f("",!0)])),_:1}),i(k,{dialogVisible:u(l),accept:".xls,.xlsx",loading:u(s),onOnConfirm:b,onOnCancel:_},null,8,["dialogVisible","loading"])])}}}),[["__scopeId","data-v-403fb5f1"]]);export{U as default};
