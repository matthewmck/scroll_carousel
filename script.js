const sliderTransitionDelay = 500
let slidesNumber = $('.slider').children().length

// SCROLL TRIGGER
gsap.registerPlugin(ScrollTrigger)

let controller = ScrollTrigger.create({
  trigger: ".slider",
  start: "bottom 80%",
  end: "bottom 0%",
  markers: true,
  pin: ".slider",
  pinSpacing: true,
  onUpdate: (self) => scrollToSlide(self.progress),
})

function scrollToSlide(progress) {
  const slideIndex = Math.floor(progress * slidesNumber);
  if (slideIndex == slidesNumber) return
  goToSlide(slideIndex)
}

// SLICK CAROUSEL
$('.slider').slick({
  infinite: false,
  arrows: false,
  dots: false,
  vertical: true,
})

// Creating Prev and Next buttons
$('.slider').append('<div class="slider__buttons"><button class="slider__prev">Prev</button><button class="slider__next">Next</button></div>')

// Creating the dots buttons
$('.slider').append('<ul class="slider__dots"></ul>');
for (let i = 0; i < slidesNumber; i++) {
  let dot = '<li><button class="slider__dot" data-slide-index="' + i + '">' + i + '</button></li>'
  $('.slider__dots').append(dot)
}

// Dot click actions
$('.slider__dots button').click(function(e) {
  const slideIndex = $(e.target).attr('data-slide-index');
  scroll(slideIndex)
})

// Next button actions
$('.slider__next').click(() => nextSlide())

// Prev button actions
$('.slider__prev').click(() => prevSlide())

// Remove animation classes after slide has changed
$('.slider').on('afterChange', (event, slick, direction) => {
  $('.slider__content').find('.slider__content--copy')
    .removeClass('animate-next-out animate-next-in animate-prev-out animate-prev-in')
  $('.slider__content').find('.slider__content--img')
  .removeClass('fade-in fade-out')
  $('.slider__content').removeClass('hidden')
})

const nextSlide = () => handleSlide(1)
const prevSlide = () => handleSlide(-1)

function handleSlide(num) {
  // Get current index
  let index = $('.slider').slick('slickCurrentSlide')

  // Exit if no remaining slides
  if (num > 0 && index == slidesNumber - 1) {
    return
  } else if (num < 0 && index == 0) {
    return
  }

  let slideIndex = index + num
  scroll(slideIndex)
}

function scroll(slideIndex) {
  let progress = slideIndex / (slidesNumber - 1); 
  if (progress == 1) progress = 0.9
  const scrollTo = controller.start + progress * (controller.end - controller.start);
  controller.scroll(scrollTo);
}

function goToSlide(slideIndex) {
  // Get current index
  let index = $('.slider').slick('slickCurrentSlide')

  // Exit if selected slide is current slide
  if (index == Number(slideIndex)) return

  // Hide all other slides
  $('.slider__content').each(i => {
    if (i == index || i == Number(slideIndex)) return
    const $slides = $('.slider__content')
    $($slides[i]).addClass('hidden')
  })

  // Get Slides
  let currentSlide = $('.slider .slick-slide[data-slick-index="' + index + '"]')
  let nextSlide = $('.slider .slick-slide[data-slick-index="' + slideIndex + '"]')

  // Animate current slide out
  if (index < Number(slideIndex)) {
    currentSlide.find('.slider__content--copy').addClass('animate-next-out')
  } else {
    currentSlide.find('.slider__content--copy').addClass('animate-prev-out')
  }
  currentSlide.find('.slider__content--img').addClass('fade-out')

  // Delay until the slide is changed
  setTimeout( () => {
    // Animate next slide In
    if (index < Number(slideIndex)) {
      nextSlide.find('.slider__content--copy').addClass('animate-next-in')
    } else {
      nextSlide.find('.slider__content--copy').addClass('animate-prev-in')
    }
    nextSlide.find('.slider__content--img').addClass('fade-in')

    // Go to slide
    $('.slider').slick('slickGoTo', slideIndex);
  }, sliderTransitionDelay)
}