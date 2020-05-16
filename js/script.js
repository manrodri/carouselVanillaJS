const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right');
const previousBtn = document.querySelector('.carousel__button--left');
const dotsNavs = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNavs.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrage the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};

// move the slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  const amountToMove = targetSlide.style.left;
  track.style.transform = `translateX(-${amountToMove})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowBtn = (slides, previousBtn, nextBtn, targetIndex) => {
  if (!targetIndex) {
    previousBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    previousBtn.classList.remove('is-hidden');
    nextBtn.classList.add('is-hidden');
  } else {
    previousBtn.classList.remove('is-hidden');
    nextBtn.classList.remove('is-hidden');
  }
};

slides.forEach(setSlidePosition);

// when I click left -> move slide to the left
previousBtn.addEventListener('click', function () {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNavs.querySelector('.current-slide');
  const previousDot = currentDot.previousElementSibling;
  const prevSlideIndex = slides.findIndex((slide) => slide === prevSlide);
  hideShowBtn(slides, previousBtn, nextBtn, prevSlideIndex);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, previousDot);
});

// when I click right -> move slide to the eright
nextBtn.addEventListener('click', (e) => {
  // set values
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNavs.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextSlideIndex = slides.findIndex((slide) => slide === nextSlide);
  hideShowBtn(slides, previousBtn, nextBtn, nextSlideIndex);

  // move the slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

// when I click the nav indicators, move to that slide
dotsNavs.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  // what indicatior was clicked
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNavs.querySelector('.current-slide');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  console.log(targetIndex);
  hideShowBtn(slides, previousBtn, nextBtn, targetIndex);
});
