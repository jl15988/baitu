!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Baitu=t():e.Baitu=t()}(self,(()=>(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{default:()=>u});const r=new class{date(){return new Date}dateTime(){return new a}now(){return Date.now()}formatNow(){return this.format(new Date)}formatToDate(){return this.format(new Date,"yyyy-MM-dd")}parse(e){if(!e)return new a;if("string"==typeof e){const t=/年|月|日|点|时|分|秒/g,r=!/年/g.test(e)&&/时|点|:/g.test(e);let n=e.replace(t,"").trim();const s=n.length;let o="",u="",i="",c="",h="",l="";if(r){n=n.replace(/:/g,"");for(let e=1;e<=n.length;e++){const t=n[e-1];e<=2?c+=t:e<=4?h+=t:e<=6&&(l+=t)}return new a(1970,0,1,Number(c),Number(h),Number(l))}if(14===s||12===s||8===s||t.test(e)&&(10===s||6===s)){for(let e=1;e<=n.length;e++){const t=n[e-1];e<=4?o+=t:e<=6?u+=t:e<=8?i+=t:e<=10?c+=t:e<=12?h+=t:e<=14&&(l+=t)}return new a(Number(o),""===u?0:Number(u)-1,Number(i)||1,Number(c),Number(h),Number(l))}return n=e.replace(/日|秒/g,"").trim(),n=n.replace(/年|月/g,"/").trim(),n=n.replace(/点|时|分/g,":").trim(),!/^\d+$/.test(n.trim())||13!==s&&10!==s?n.includes("-")&&!n.includes("T")?new a(n.replace(/-/g,"/")):new a(n):new a(10===s?1e3*Number(n):Number(n))}return new a(e)}toDateTime(e){return new a(this.parse(e))}format(e,t){t||(t="yyyy-MM-dd HH:mm:ss");const r=this.parse(e),n={"M+":r.getMonth()+1,"d+":r.getDate(),"H+":r.getHours(),"m+":r.getMinutes(),"s+":r.getSeconds(),"q+":Math.floor((r.getMonth()+3)/3),S:r.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(r.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in n)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[e]:("00"+n[e]).substr((""+n[e]).length)));return t}};var n,s;!function(e){e.YEAR="year",e.MONTH="month",e.DAY="day",e.WEEK="week",e.HOURS="hours",e.MINUTES="minutes",e.SECONDS="seconds"}(n||(n={})),function(e){e[e.SUN=0]="SUN",e[e.MON=1]="MON",e[e.TUE=2]="TUE",e[e.WED=3]="WED",e[e.THUR=4]="THUR",e[e.FRI=5]="FRI",e[e.SAT=6]="SAT"}(s||(s={}));class o extends Date{constructor(){super(...arguments),this.firstWeek=0}static create(...e){switch(e.length){case 1:return new o(e[0]);case 2:return new o(e[0],e[1]);case 3:return new o(e[0],e[1],e[2]);case 4:return new o(e[0],e[1],e[2],e[3]);case 5:return new o(e[0],e[1],e[2],e[3],e[4]);case 6:return new o(e[0],e[1],e[2],e[3],e[4],e[5]);default:return new o}}objectValues(){return{year:this.getFullYear(),month:this.getMonth(),day:this.getDate(),week:this.getDay(),hours:this.getHours(),minutes:this.getMinutes(),seconds:this.getSeconds()}}toDate(){const e=this.objectValues();return new o(e.year,e.month,e.day)}format(e){return r.format(this,e)}formatDate(){return this.format("yyyy-MM-dd")}formatDateTime(){return this.format("yyyy-MM-dd HH:mm:ss")}beginOfDay(){const e=this.objectValues();return new o(e.year,e.month,e.day,0,0,0)}endOfDay(){const e=this.objectValues();return new o(e.year,e.month,e.day,23,59,59)}beginOfWeek(){const e=this.objectValues(),t=this.firstWeek||0;return new o(e.year,e.month,e.day-e.week+t,0,0,0)}endOfWeek(){const e=this.objectValues(),t=this.firstWeek||0;return new o(e.year,e.month,e.day+(6-e.week+t),23,59,59)}beginOfMonth(){const e=this.getFullYear(),t=this.getMonth();return new o(e,t,1,0,0,0)}endOfMonth(){const e=this.getFullYear(),t=this.getMonth()+1;return new o(e,t,0,23,59,59)}beginOfYear(){const e=this.getFullYear();return new o(e,0,1,0,0,0)}endOfYear(){const e=this.getFullYear();return new o(e+1,0,0,23,59,59)}setFirstWeek(e){this.firstWeek=e}offset(e,t){if(!e)return this;const r=new o(this),s=r.objectValues();if(t=t||0,n.YEAR===e)r.setFullYear(s.year+Number(t));else if(n.MONTH===e){const e=new o(r);e.setMonth(s.month+Number(t)),e.getMonth()!==r.getMonth()-1?r.setDate(0):r.setMonth(s.month+Number(t))}else n.DAY===e?r.setDate(s.day+Number(t)):n.WEEK===e?r.setDate(s.day+7*t):n.HOURS===e?r.setHours(s.hours=Number(t)):n.MINUTES===e?r.setMinutes(s.minutes=Number(t)):r.setSeconds(s.seconds=Number(t));return r}}o.DateField=n,o.WeekDay=s;const a=o;window&&(window.DateTime=a,window.DateField=n,window.WeekDay=s,window.DateUtil=r);const u=new class{constructor(){this.DateTime=a,this.DateUtil=r,this.DateField=n,this.WeekDay=s}};return t.default})()));