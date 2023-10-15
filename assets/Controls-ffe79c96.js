import{S as x,i as ee,s as oe,J as ne,e as N,a as C,t as g,c as K,K as te,L as se,M as le,q as h,r as S,d as L,v as E,f as I,j as F,z as A,b as G,k as w,A as B,l as b,G as O,m as re,p as ae,D as V,I as ie,N as P,O as Q,P as ue,n as ce,Q as fe}from"./index-7c8bf774.js";import{I as q}from"./Icon-dfab328a.js";const me=o=>({}),T=o=>({zoomIn:o[12],zoomOut:o[13],fitView:o[14],lock:o[15],unhideAll:o[11]});function H(o){let e,t,i,c,u;return t=new q({props:{icon:"visibility_off"}}),{c(){e=N("button"),A(t.$$.fragment),C(e,"class","unhide svelte-c7gea0")},m(n,r){K(n,e,r),B(t,e,null),i=!0,c||(u=b(e,"mousedown",O(o[11])),c=!0)},p:ce,i(n){i||(h(t.$$.fragment,n),i=!0)},o(n){S(t.$$.fragment,n),i=!1},d(n){n&&L(e),V(t),c=!1,u()}}}function _e(o){let e,t,i,c,u,n,r,j,d,f,W,p,m,k,z,v,a=o[5].size>0&&H(o);return c=new q({props:{icon:"zoom_in"}}),r=new q({props:{icon:"zoom_out"}}),f=new q({props:{icon:"filter_center_focus"}}),m=new q({props:{icon:o[4]?"lock_open":"lock"}}),{c(){e=N("div"),a&&a.c(),t=F(),i=N("button"),A(c.$$.fragment),u=F(),n=N("button"),A(r.$$.fragment),j=F(),d=N("button"),A(f.$$.fragment),W=F(),p=N("button"),A(m.$$.fragment),C(i,"class","zoom-in svelte-c7gea0"),C(n,"class","zoom-out svelte-c7gea0"),C(d,"class","reset svelte-c7gea0"),C(p,"class","lock svelte-c7gea0"),C(e,"class","controls-wrapper svelte-c7gea0"),g(e,"horizontal",o[0]),G(e,"--prop-controls-background-color",o[1]),G(e,"--prop-controls-text-color",o[2])},m(s,_){K(s,e,_),a&&a.m(e,null),w(e,t),w(e,i),B(c,i,null),w(e,u),w(e,n),B(r,n,null),w(e,j),w(e,d),B(f,d,null),w(e,W),w(e,p),B(m,p,null),k=!0,z||(v=[b(i,"mousedown",O(o[12])),b(i,"touchstart",o[12],{passive:!0}),b(n,"mousedown",O(o[13])),b(n,"touchstart",o[13],{passive:!0}),b(d,"mousedown",O(o[14])),b(d,"touchstart",o[14],{passive:!0}),b(p,"mousedown",O(o[15])),b(p,"touchstart",o[15],{passive:!0})],z=!0)},p(s,_){s[5].size>0?a?(a.p(s,_),_&32&&h(a,1)):(a=H(s),a.c(),h(a,1),a.m(e,t)):a&&(re(),S(a,1,1,()=>{a=null}),ae());const D={};_&16&&(D.icon=s[4]?"lock_open":"lock"),m.$set(D),(!k||_&1)&&g(e,"horizontal",s[0]),_&2&&G(e,"--prop-controls-background-color",s[1]),_&4&&G(e,"--prop-controls-text-color",s[2])},i(s){k||(h(a),h(c.$$.fragment,s),h(r.$$.fragment,s),h(f.$$.fragment,s),h(m.$$.fragment,s),k=!0)},o(s){S(a),S(c.$$.fragment,s),S(r.$$.fragment,s),S(f.$$.fragment,s),S(m.$$.fragment,s),k=!1},d(s){s&&L(e),a&&a.d(),V(c),V(r),V(f),V(m),z=!1,ie(v)}}}function ge(o){let e,t;const i=o[18].default,c=ne(i,o,o[17],T),u=c||_e(o);return{c(){e=N("nav"),u&&u.c(),C(e,"class","graph-controls svelte-c7gea0"),C(e,"aria-label","navigation"),g(e,"SW",o[3]==="SW"),g(e,"NE",o[3]==="NE"),g(e,"SE",o[3]==="SE"),g(e,"NW",o[3]==="NW")},m(n,r){K(n,e,r),u&&u.m(e,null),t=!0},p(n,[r]){c?c.p&&(!t||r&131072)&&te(c,i,n,n[17],t?le(i,n[17],r,me):se(n[17]),T):u&&u.p&&(!t||r&55)&&u.p(n,t?r:-1),(!t||r&8)&&g(e,"SW",n[3]==="SW"),(!t||r&8)&&g(e,"NE",n[3]==="NE"),(!t||r&8)&&g(e,"SE",n[3]==="SE"),(!t||r&8)&&g(e,"NW",n[3]==="NW")},i(n){t||(h(u,n),t=!0)},o(n){S(u,n),t=!1},d(n){n&&L(e),u&&u.d(n)}}}function de(o,e,t){let i,c,u,n,r,{$$slots:j={},$$scope:d}=e,{increment:f=.1}=e,{horizontal:W=!1}=e,{bgColor:p=null}=e,{iconColor:m=null}=e,{corner:k="SW"}=e;const z=E("transforms"),v=E("dimensions");I(o,v,l=>t(20,u=l));const a=E("locked");I(o,a,l=>t(4,i=l));const s=E("groups");I(o,s,l=>t(21,n=l));const _=E("bounds"),{translation:D}=z,J=n.hidden.nodes;I(o,J,l=>t(5,r=l));const M=_.nodeBounds;I(o,M,l=>t(19,c=l));function R(){J.set(new Set)}function U(){P(-1,v,z,f)}function X(){P(1,v,z,f)}function Y(){Q.set(!0);const{x:l,y,scale:$}=fe(u,c);D.set({x:l||0,y:y||0}),z.scale.set($||1),Q.set(!1)}function Z(){ue(a,i=!i,i)}return o.$$set=l=>{"increment"in l&&t(16,f=l.increment),"horizontal"in l&&t(0,W=l.horizontal),"bgColor"in l&&t(1,p=l.bgColor),"iconColor"in l&&t(2,m=l.iconColor),"corner"in l&&t(3,k=l.corner),"$$scope"in l&&t(17,d=l.$$scope)},[W,p,m,k,i,r,v,a,s,J,M,R,U,X,Y,Z,f,d,j]}class he extends x{constructor(e){super(),ee(this,e,de,ge,oe,{increment:16,horizontal:0,bgColor:1,iconColor:2,corner:3})}}export{he as default};
