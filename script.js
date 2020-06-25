let hamburger = document.querySelector('.nav__hamburger');
let mobileNav = document.querySelector('.mob-nav');
let mockup = document.querySelector('.intro__mockup');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  mockup.classList.toggle('close');
});
