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

if (accBtn) {
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

const links = document.querySelectorAll('[href^="#"');

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
  link.addEventListener('click', smoothScroll);
  // if (link.classList.contains('hoop-accordion-button')) {
  //   link.addEventListener('focus', smoothScroll);
  // }
});