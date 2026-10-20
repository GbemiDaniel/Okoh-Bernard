/**
 * First-visit loader, refined from the previous portfolio's PremiumLoader:
 * the name in wide mono, letters resolving out of a blur, a typed role line
 * and a 1px progress line. Server HTML and an inline script, so it shows at
 * first paint and types before React hydrates. Progress follows real steps
 * (painted, loaded, hologram drawn) and the hologram's first frame closes it
 * through window.__boot. CSS removes it after 6s whatever happens.
 */
const NAME = "Onyedikachi Bernard";
// The three orbits on the homepage.
const ROLES = ["CLOUD SECURITY", "DEVSECOPS", "AI SECURITY"];

const script = `(function(){try{
var b=document.getElementById("boot");
if(sessionStorage.getItem("kb:boot")){b.remove();return}
sessionStorage.setItem("kb:boot","1");
b.setAttribute("data-on","");
var t0=performance.now(),closed=0,R=${JSON.stringify(ROLES)},el=b.querySelector(".boot-type"),i=0,n=0,del=0,timer;
function p(v){b.style.setProperty("--p",v)}
p(.18);
function type(){var w=R[i%R.length];
if(!del){n++;el.textContent=w.slice(0,n);if(n===w.length){del=1;timer=setTimeout(type,900);return}timer=setTimeout(type,48)}
else{n--;el.textContent=w.slice(0,n);if(!n){del=0;i++}timer=setTimeout(type,24)}}
timer=setTimeout(type,700);
function end(){closed=1;clearTimeout(timer);b.remove()}
document.addEventListener("DOMContentLoaded",function(){p(.42)});
addEventListener("load",function(){p(.74)});
window.__boot={done:function(){if(closed)return;p(1);
if(getComputedStyle(b).opacity==="0"){end();return}
var wait=Math.max(0,1500-(performance.now()-t0));
setTimeout(function(){b.setAttribute("data-done","");setTimeout(end,520)},wait+260)}};
setTimeout(function(){if(!closed)window.__boot.done()},6000);
}catch(e){}})()`;

let k = 0;
const letters = (word: string) => [...word].map((ch) => `<i style="--i:${k++}">${ch}</i>`).join("");
const [first, last] = NAME.split(" ");
const markup =
  `<div id="boot" class="boot" role="status" aria-label="Loading">` +
  `<span class="boot-ring" aria-hidden="true"><i></i></span>` +
  `<p class="boot-name" aria-hidden="true"><span>${letters(first)}</span><span class="boot-last">${letters(last)}</span></p>` +
  `<p class="boot-role" aria-hidden="true"><span class="boot-type"></span><b></b></p>` +
  `<span class="boot-line" aria-hidden="true"></span></div>`;

// Handed to React as raw HTML: the script types into it and removes it before
// hydration, and React never compares inner HTML it was given, so the loader
// isn't re-rendered. On a client-side visit the script doesn't run and the
// loader stays hidden (display: none without data-on).
export function BootLoader() {
  return <div dangerouslySetInnerHTML={{ __html: `${markup}<script>${script}</script>` }} />;
}
