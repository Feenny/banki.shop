const leftBtn = document.querySelector(".slider__left");
const rightBtn = document.querySelector(".slider__right");
const mainSlide = document.querySelector(".picture-wrapper");
// const slidesCount = mainSlide.querySelectorAll("div").length;
const slidesCount = 2;
const width = slidesCount.clientWidth;
let activeSlideIndex = 0;

console.log(rightBtn);
leftBtn.addEventListener("click", () => {
  changeSlide("left");
});

rightBtn.addEventListener("click", () => {
  changeSlide("right");
});
function changeSlide(direction) {
  if (direction === "right") {
    activeSlideIndex++;
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  } else if (direction === "left") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }
  mainSlide.style.transform = `translateX(-${activeSlideIndex * width}px)`;
}
