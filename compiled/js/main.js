const body = document.querySelector('body');
const masthead = document.querySelector('.masthead');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = Array.from(document.querySelectorAll('.nav > ul > li > a'));
const toTop = document.querySelector('.to-top');

body.classList.remove('no-js');

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const accBtn = document.querySelectorAll('.hoop-accordion-button');

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openAccordion(target, e) {
  const content = target.nextElementSibling;
  const contentHeight = content.firstElementChild.offsetHeight;

  if (content.classList.contains('open')) {
    if (e) {
      e.preventDefault();
    }
    content.classList.remove('open');
    content.removeAttribute('style');

  } else {

    Array.from(accBtn).forEach(btn => {
      btn.nextElementSibling.classList.remove('open');
      btn.nextElementSibling.removeAttribute('style');
    });

    content.classList.toggle('open');
    content.setAttribute('style', `max-height: ${contentHeight}px`);
    target.focus();
  }
}

function handleAccBtnClick(e) {
  const target = e.currentTarget;
  openAccordion(target, e);
}

if (accBtn.length > 0) {
  const id = window.location.hash;

  if (id) {
    const visitedEl = document.querySelector(id);
    console.log(visitedEl.firstElementChild)
    openAccordion(visitedEl.firstElementChild);
  }

  accBtn.forEach(btn => {
    btn.addEventListener('click', handleAccBtnClick);
    // btn.addEventListener('focus', handleAccBtnClick);
  });

}

// Smooth Scroll

const links = document.querySelectorAll('[href^="#"]:not(.nav-toggle):not(.skip-link)');

async function smoothScroll(e) {
  e.preventDefault();
  const ref = e.currentTarget.getAttribute('href');
  if (e.currentTarget.classList.contains('hoop-accordion-button')) {
    await wait(201);
  }
  const targetEl = document.querySelector(ref);
  const winOffset = targetEl.getBoundingClientRect().top;
  window.scrollBy({ top: winOffset - 20, left: 0, behavior: 'smooth' });
  window.history.pushState('', '', ref);
}

links && links.forEach(link => {
  console.log(link)
  link.addEventListener('click', smoothScroll);
  // if (link.classList.contains('hoop-accordion-button')) {
  //   link.addEventListener('focus', smoothScroll);
  // }
});

// Toggle Nav

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function openNav() {
  masthead.classList.add('open');
  navToggle.classList.add('nav-toggle-transition');
  setTimeout(async function () {
    navToggle.querySelector('.middle').style.display = 'none';
    navToggle.classList.add('nav-toggle-open');
    navToggle.classList.remove('nav-toggle-transition');
    asyncForEach(navLinks, async (num) => {
      await wait(50);
      num.classList.add('transitioned');
    })
  }, 200)
}

function closeNav() {
  navToggle.classList.add('nav-toggle-transition');
  navToggle.classList.remove('nav-toggle-open');
  navLinks.forEach(link => {
    link.classList.remove('transitioned');
  });
  setTimeout(() => {
    navToggle.classList.remove('nav-toggle-transition');
    navToggle.querySelector('.middle').removeAttribute('style');
    masthead.classList.remove('open');
  }, 200)
}

function handleNavToggle(e) {
  e.preventDefault();
  if (masthead.classList.contains('open')) {
    closeNav()
  } else {
    openNav()
  }

}

navToggle && navToggle.addEventListener('click', handleNavToggle);

// Sticky Nav

function stickyNav(e) {
  if (window.pageYOffset >= 50) {
    masthead.classList.add('sticky');
    toTop.classList.add('sticky');
  } else {
    masthead.classList.remove('sticky');
    toTop.classList.remove('sticky');
  }
}

window.addEventListener('scroll', stickyNav);
stickyNav();

// Framework Interaction

const fwLinks = Array.from(document.querySelectorAll('.hoop-list a'));
const fwHoops = Array.from(document.querySelectorAll('[id*="fw-hoop"]'));
const fwWrap = document.querySelector('.framework-structure-wrap');

function highlightHoop(e) {
  const ref = `#fw-${e.currentTarget.classList[0]}`;
  const hoop = document.querySelector(ref);
  hoop.classList.add('hoop-hovered');
  fwWrap.classList.add('engaged');
}

function unhighlightHoop(e) {
  const ref = `#fw-${e.currentTarget.classList[0]}`;
  const hoop = document.querySelector(ref);
  hoop.classList.remove('hoop-hovered')
  fwWrap.classList.remove('engaged');
}

function highlightHoopLink(e) {
  const ref = e.currentTarget.classList[0];
  const link = document.querySelector(`.hoop-list .${ref}`);
  link.classList.add('hoop-hovered');
}

function unhighlightHoopLink(e) {
  const ref = e.currentTarget.classList[0];
  const link = document.querySelector(`.hoop-list .${ref}`);
  link.classList.remove('hoop-hovered')
}

function navigateHoop(e) {
  const ref = e.currentTarget.classList[0];
  window.location.href = `/${ref}`;
}

fwLinks.forEach(link => {
  link.addEventListener('mouseover', highlightHoop);
  link.addEventListener('mouseout', unhighlightHoop);
  link.addEventListener('focusin', highlightHoop);
  link.addEventListener('focusout', unhighlightHoop);
})

fwHoops.forEach(link => {
  link.addEventListener('mouseover', highlightHoopLink);
  link.addEventListener('mouseout', unhighlightHoopLink);
  link.addEventListener('click', navigateHoop);
})
