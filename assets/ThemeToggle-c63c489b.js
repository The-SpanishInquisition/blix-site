import{S as C,i as I,s as N,e as g,F as W,a as h,t as i,b as f,c as w,k as E,l as _,G as d,H as T,n as v,d as j,I as k,o as z}from"./index-b49a336c.js";function A(o){let e,l,a,m=(o[6]===o[0]?o[2]:o[1])+"",u,r,c;return{c(){e=g("div"),l=g("button"),a=g("span"),u=W(m),h(a,"class","material-symbols-outlined svelte-ocwjzv"),h(l,"class","svelte-ocwjzv"),h(e,"class","controls-wrapper svelte-ocwjzv"),i(e,"SW",o[3]==="SW"),i(e,"NE",o[3]==="NE"),i(e,"SE",o[3]==="SE"),i(e,"NW",o[3]==="NW"),f(e,"--prop-theme-toggle-color",o[4]),f(e,"--prop-theme-toggle-text-color",o[5])},m(n,s){w(n,e,s),E(e,l),E(l,a),E(a,u),r||(c=[_(l,"mousedown",d(o[7])),_(l,"touchstart",d(o[7]),{passive:!0})],r=!0)},p(n,[s]){s&71&&m!==(m=(n[6]===n[0]?n[2]:n[1])+"")&&T(u,m),s&8&&i(e,"SW",n[3]==="SW"),s&8&&i(e,"NE",n[3]==="NE"),s&8&&i(e,"SE",n[3]==="SE"),s&8&&i(e,"NW",n[3]==="NW"),s&16&&f(e,"--prop-theme-toggle-color",n[4]),s&32&&f(e,"--prop-theme-toggle-text-color",n[5])},i:v,o:v,d(n){n&&j(e),r=!1,k(c)}}}function q(o,e,l){let{main:a="light"}=e,{alt:m="dark"}=e,{mainIcon:u="light_mode"}=e,{altIcon:r="dark_mode"}=e,{corner:c="NE"}=e,{bgColor:n=null}=e,{iconColor:s=null}=e,b=a;function S(){const t=document.documentElement.getAttribute("svelvet-theme");if(!t)return;l(6,b=t===a?m:a),document.documentElement.setAttribute("svelvet-theme",t===a?m:a)}return z(()=>{document.documentElement.setAttribute("svelvet-theme",a)}),o.$$set=t=>{"main"in t&&l(0,a=t.main),"alt"in t&&l(8,m=t.alt),"mainIcon"in t&&l(1,u=t.mainIcon),"altIcon"in t&&l(2,r=t.altIcon),"corner"in t&&l(3,c=t.corner),"bgColor"in t&&l(4,n=t.bgColor),"iconColor"in t&&l(5,s=t.iconColor)},[a,u,r,c,n,s,b,S,m]}class H extends C{constructor(e){super(),I(this,e,q,A,N,{main:0,alt:8,mainIcon:1,altIcon:2,corner:3,bgColor:4,iconColor:5})}}export{H as default};