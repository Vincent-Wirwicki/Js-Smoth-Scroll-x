const container = document.querySelector(".scroll");
const scrollWrap = document.querySelector(".scroll__wrap");
const cross = document.querySelector(".cross");
const progressBar = document.querySelector(".progress__bar__inner");
const progressBarTxt = document.querySelector(".progress__bar__txt");
const images = [...document.querySelectorAll(".scroll__wrap__img")];

let isFullScreen = false;
let scrollProgress = 0;
let target = 0;
let current = 0;
let direction;
let ease = 0.075;
let itemsHeight =
  container.getBoundingClientRect().height / (images.length / 2);

const lerp = (start, end, t) => start * (1 - t) + end * t;

const addImagesToDom = () =>
  images.forEach(
    (image, i) => (image.style.backgroundImage = `url(./images/${i + 1}.jpg)`)
  );

const initAnimation = () => {
  document.body.style.height = `${container.getBoundingClientRect().width}px`;
};

const smoothScroll = () => {
  current = lerp(current, target, ease);
  target = window.scrollY;
  let skewDiff = (target - current) * 0.025;
  scrollWrap.style.transform = `translate3d(${
    -current | 0
  }px,0,0) skewX(${skewDiff}deg)`;
};

const getScrollProgress = () => {
  scrollProgress =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  displayScrollProgress();
};

const displayScrollProgress = () => {
  progressBarTxt.innerHTML = `${scrollProgress | 0} %`;
  progressBar.style.width = `${scrollProgress}%`;
};

const addEvents = () => {
  window.addEventListener("resize", initAnimation);
  window.addEventListener("wheel", getScrollProgress);
};

const raf = () => {
  smoothScroll();
  requestAnimationFrame(raf);
};

const app = () => {
  addImagesToDom();
  initAnimation();
  addEvents();
  raf();
};

app();

// window.scrollY / (document.body.scrollHeight - window.innerHeight);

//test stuff

// let observer = new IntersectionObserver(
//   function (entries) {
//     console.log("im here");
//   },
//   { root: cross, threshold: [0, 0.5, 1] }
// );

// observer.observe(images);

// const config = {
//   attributes: true,
//   //   childList: true,
// };

// const mutObserver = new MutationObserver(entries => console.log(entries));

// mutObserver.observe(scrollWrap, config);

//   (document.body.scrollTop /
//     (document.documentElement.scrollHeight -
//       document.documentElement.clientHeight)) *
//     100;

//  images.forEach(
//    image =>
//      (image.style.transform = `scaleX(${
//        Math.abs(skewDiff) < 1 ? (skewDiff = 1) : skewDiff
//      })`)
//  );

// const multipliedScroll = this.scroll.current * 1.5;
// const multipliedIndex = (multipliedScroll / this.sliderBounds.width) * 2;
// this.multiplier = Math.floor(multipliedIndex);

// this.sliderFirst.style.transform = `translateX(${
//   -multipliedScroll + (this.multiplier * this.sliderBounds.width) / 2
// }px)`;
//   const r = current * 1.5;
//   const ri = (r / width) * 2;
//   let m = Math.floor(ri);
//   let skewDiff = (target - current) * 0.015;
//   scrollWrap.style.transform = `translate3d(${
//     -current + (m * width) / 2
//   }px,0,0) skewX(${skewDiff}deg) `;
// this.sliderSecond.style.transform = `translateX(${
//   -multipliedScroll + (this.multiplier * this.sliderBounds.width) / 2
// }px)`;
