const target = new Date("2026-11-09T23:59:59+08:00").getTime();
const fields = {days:document.querySelector("#days"),hours:document.querySelector("#hours"),minutes:document.querySelector("#minutes"),seconds:document.querySelector("#seconds")};
function updateCountdown(){
  const gap = target-Date.now();
  if(gap<=0){Object.values(fields).forEach(el=>el.textContent="00");document.querySelector("#count-status").textContent="Registration and submission are now closed.";return;}
  fields.days.textContent=String(Math.floor(gap/86400000)).padStart(2,"0");
  fields.hours.textContent=String(Math.floor(gap/3600000)%24).padStart(2,"0");
  fields.minutes.textContent=String(Math.floor(gap/60000)%60).padStart(2,"0");
  fields.seconds.textContent=String(Math.floor(gap/1000)%60).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);
const menu=document.querySelector(".menu-button"),nav=document.querySelector("#site-nav");
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav.classList.toggle("open",!open)});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
