gsap.registerPlugin(ScrollTrigger)

gsap.to('.square', {
  x: 700,
  duration: 3,
  scrollTrigger: {
    trigger: '.square2',
    start: "top 80%",
    end: "top 30%",
    scrub: 4,
    pin: ".square",
    pinSpacing: true,
    toggleActions: "restart none none none",
    // play pause resume reverse restart reset complete none
    // onEnter onLeave onEnterBack onLeaveBack
    markers: true,
    toggleClass: "red",
  },
})