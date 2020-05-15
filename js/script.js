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

slides.forEach(setSlidePosition);

// when I click left -> move slide to the left
previousBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNavs.querySelector('.current-slide');
  const previousDot = currentDot.previousElementSibling;

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

  // move the slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

// when I click the nav indicators, move to that slide
dotsNavs.addEventListener('click', (e) => {
  // what indicatior was clicked
  const targetDot = e.target.closest('button');
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNavs.querySelector('.current-slide');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  console.log(targetIndex);
  if (!targetDot) return;
});
