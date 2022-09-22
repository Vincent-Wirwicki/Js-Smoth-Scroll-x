const container = document.querySelector(".scroll");
const scrollWrapFirst = document.querySelector(".scroll__wrap__first");
const progressBar = document.querySelector(".progress__bar__inner");
const progressBarTxt = document.querySelector(".progress__bar__txt");
const images = [...document.querySelectorAll(".scroll__wrap__img")];
const titles = ["Architecture", "Sport", "Nature", "Street"];
const counter__wrap = document.querySelector(".counter__wrap");

let current = 0;
let target = 0;
let ease = 0.075;
let scrollProgress = 0;

const lerp = (start, end, t) => start * (1 - t) + end * t;

const createSpanCounterTxt = () => {
  const maxItemsTxt = document.querySelector(".counter__max__items");
  maxItemsTxt.innerText = images.length;
  for (let i = 0; i < images.length; i++) {
    const span = document.createElement("span");
    span.classList.add("counter__pos");
    span.innerText = i + 1;
    counter__wrap.appendChild(span);
  }
};

const initAnimation = () => {
  document.body.style.height = `${
    scrollWrapFirst.getBoundingClientRect().width * 1.3
  }px`;
};

const smoothScroll = () => {
  current = lerp(current, target, ease);
  target = window.scrollY;
  let skewDiff = ((target - current) * 0.025).toFixed(3);
  scrollWrapFirst.style.transform = `translate3d(${
    -current | 0
  }px,0,0) skewX(${skewDiff}deg)`;
  displayScrollProgress();
};

const getScrollProgress = () => {
  scrollProgress =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
};

const displayScrollProgress = () => {
  progressBarTxt.innerHTML = `${scrollProgress | 0} %`;
  progressBar.style.width = `${scrollProgress}%`;
};

const onWheel = () => {
  getScrollProgress();
};

const addEvents = () => {
  window.addEventListener("resize", initAnimation);
  window.addEventListener("wheel", onWheel);
};

const raf = () => {
  smoothScroll();
  requestAnimationFrame(raf);
};

const app = () => {
  createSpanCounterTxt();
  initAnimation();
  addEvents();
  raf();
};

app();
