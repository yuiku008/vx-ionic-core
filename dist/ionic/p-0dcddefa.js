const t=t=>{try{if(t instanceof r)return t.value;if(!s()||"string"!=typeof t||""===t)return t;const e=document.createDocumentFragment(),i=document.createElement("div");e.appendChild(i),i.innerHTML=t,c.forEach(t=>{const s=e.querySelectorAll(t);for(let c=s.length-1;c>=0;c--){const t=s[c];t.parentNode?t.parentNode.removeChild(t):e.removeChild(t);const r=o(t);for(let o=0;o<r.length;o++)n(r[o])}});const l=o(e);for(let t=0;t<l.length;t++)n(l[t]);const u=document.createElement("div");u.appendChild(e);const a=u.querySelector("div");return null!==a?a.innerHTML:u.innerHTML}catch(e){return console.error(e),""}},n=t=>{if(t.nodeType&&1!==t.nodeType)return;for(let n=t.attributes.length-1;n>=0;n--){const o=t.attributes.item(n),s=o.name;if(!e.includes(s.toLowerCase())){t.removeAttribute(s);continue}const c=o.value;null!=c&&c.toLowerCase().includes("javascript:")&&t.removeAttribute(s)}const s=o(t);for(let o=0;o<s.length;o++)n(s[o])},o=t=>null!=t.children?t.children:t.childNodes,s=()=>{const t=window,n=t&&t.Ionic&&t.Ionic.config;return!n||(n.get?n.get("sanitizerEnabled",!0):!0===n.sanitizerEnabled||void 0===n.sanitizerEnabled)},e=["class","id","href","src","name","slot"],c=["script","style","iframe","meta","link","object","embed"];class r{constructor(t){this.value=t}}export{r as I,t as s}