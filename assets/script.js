const heroSlider=document.querySelector(".hero-slider");
const heroSlides=Array.from(document.querySelectorAll(".hero-slide"));
const sliderDots=Array.from(document.querySelectorAll(".slider-dot"));
const previousSlideButton=document.querySelector(".slider-previous");
const nextSlideButton=document.querySelector(".slider-next");
let currentSlide=0;
let sliderTimer;

function showSlide(index){
  currentSlide=(index+heroSlides.length)%heroSlides.length;
  heroSlides.forEach((slide,slideIndex)=>slide.classList.toggle("is-active",slideIndex===currentSlide));
  sliderDots.forEach((dot,dotIndex)=>{
    const active=dotIndex===currentSlide;
    dot.classList.toggle("is-active",active);
    dot.setAttribute("aria-selected",String(active));
  });
}

function stopAutoSlider(){clearInterval(sliderTimer)}
function startAutoSlider(){
  stopAutoSlider();
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    sliderTimer=setInterval(()=>showSlide(currentSlide+1),5000);
  }
}

previousSlideButton.addEventListener("click",()=>{showSlide(currentSlide-1);startAutoSlider()});
nextSlideButton.addEventListener("click",()=>{showSlide(currentSlide+1);startAutoSlider()});
sliderDots.forEach((dot,index)=>dot.addEventListener("click",()=>{showSlide(index);startAutoSlider()}));
heroSlider.addEventListener("mouseenter",stopAutoSlider);
heroSlider.addEventListener("mouseleave",startAutoSlider);
heroSlider.addEventListener("focusin",stopAutoSlider);
heroSlider.addEventListener("focusout",startAutoSlider);
document.addEventListener("visibilitychange",()=>document.hidden?stopAutoSlider():startAutoSlider());
showSlide(0);
startAutoSlider();

const countdownTarget=new Date("2026-11-09T23:59:59+08:00").getTime();
const countdownFields={
  days:document.getElementById("days"),
  hours:document.getElementById("hours"),
  minutes:document.getElementById("minutes"),
  seconds:document.getElementById("seconds")
};

function updateCountdown(){
  const remaining=countdownTarget-Date.now();
  if(remaining<=0){
    Object.values(countdownFields).forEach(field=>field.textContent="00");
    document.getElementById("count-status").textContent="Registration and submissions are now closed.";
    return;
  }
  countdownFields.days.textContent=String(Math.floor(remaining/86400000)).padStart(2,"0");
  countdownFields.hours.textContent=String(Math.floor(remaining/3600000)%24).padStart(2,"0");
  countdownFields.minutes.textContent=String(Math.floor(remaining/60000)%60).padStart(2,"0");
  countdownFields.seconds.textContent=String(Math.floor(remaining/1000)%60).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);
const menu=document.querySelector(".menu-button"),nav=document.querySelector("#site-nav");
menu.addEventListener("click",()=>{
  const open=menu.getAttribute("aria-expanded")==="true";
  menu.setAttribute("aria-expanded",String(!open));
  menu.setAttribute("aria-label",open?"Open navigation menu":"Close navigation menu");
  nav.classList.toggle("open",!open);
});
function closeMobileMenu(){
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded","false");
  menu.setAttribute("aria-label","Open navigation menu");
}
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMobileMenu));

const headerBrand=document.querySelector(".site-header .brand");
headerBrand.addEventListener("click",event=>{
  event.preventDefault();
  closeMobileMenu();
  document.getElementById("home").scrollIntoView({behavior:"smooth",block:"start"});
});

const mobileTopButton=document.getElementById("mobile-top-button");
function updateMobileTopButton(){
  mobileTopButton.classList.toggle("is-visible",window.scrollY>200);
}
updateMobileTopButton();
window.addEventListener("scroll",updateMobileTopButton,{passive:true});
