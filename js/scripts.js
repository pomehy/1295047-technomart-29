const mapLink = document.querySelector('.contacts__map');
const mapModal = document.querySelector('.map-modal');
const mapModalClose = document.querySelector('.map-modal--close');

const writeUsLink = document.querySelector('.contacts__link');
const writeUsModal = document.querySelector('.write-us');
const writeUsClose = document.querySelector('.write-us--close');

const userName = writeUsModal.querySelector('[name=user-name]');
const userEmail = writeUsModal.querySelector('[name=user-email]');
const userText = writeUsModal.querySelector('[name=user-text]');

const writeUsForm = writeUsModal.querySelector('form');
const storageUserName = localStorage.getItem('user-name');

const isStorageSupport = true;
let storage = '';



let promoSliderItems = document.querySelectorAll('.slider__item');
let sliderControls = document.querySelector('.slider__controls');
let promoSliderToggles = document.querySelectorAll('.slider__toggle');

let sliderButtons = document.querySelectorAll('.slider__button');
let promoSliderButtonPrev = document.querySelector('.slider__button--prev');
let promoSliderButtonNext = document.querySelector('.slider__button--next');


let serviceSliderItems = document.querySelectorAll('.service-slider__item');
let serviceSliderButtons = document.querySelectorAll('.service-slider__button');

let serviceSliderItem = document.querySelectorAll('.service-slider__item');


let serviceSliderNav = document.querySelector('.service-slider__nav');



// для карты

mapLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  mapModal.classList.add('modal-show');
});

mapModalClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  mapModal.classList.remove('modal-show');
});


// для формы обратной связи

try {
  storage = localStorage.getItem('user-name');
} catch (err) {
  isStorageSupport = false;
}

writeUsLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  writeUsModal.classList.add('modal-show');
  if (storageUserName) {
    userName.value = storageUserName;
    userEmail.focus();
  } else {
    userName.focus();
  }
});

writeUsClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  writeUsModal.classList.remove('modal-show');
  writeUsModal.classList.remove('modal-error');
});

writeUsForm.addEventListener('submit', function(evt) {
  if (!userName.value || !userEmail.value || !userText.value) {
    evt.preventDefault();
    writeUsModal.classList.remove('modal-error');
    writeUsModal.offsetWidth = writeUsModal.offsetWidth;
    writeUsModal.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('user-name', userName.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (mapModal.classList.contains('modal-show')) {
      evt.preventDefault();
      mapModal.classList.remove('modal-show');
    } else if (writeUsModal.classList.contains('modal-show')) {
      evt.preventDefault();
      writeUsModal.classList.remove('modal-show');
      writeUsModal.classList.remove('modal-error');
    }
  }
});



// промо слайдер

sliderControls.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('slider__toggle')) {
    let array = Array.from(promoSliderToggles);
    let target = evt.target;
    let index = array.indexOf(target);

    array.forEach(function(item, i, arr) {
      if(i === index) {
        item.classList.add('slider__toggle--active');
        promoSliderItems[i].classList.add('slider__item--active');
      } else {
        item.classList.remove('slider__toggle--active');
        promoSliderItems[i].classList.remove('slider__item--active');
      }
    });
  }
});


// сервис слайдер

serviceSliderNav.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('service-slider__button')) {
    event.preventDefault();
    let array = Array.from(serviceSliderButtons);
    let target = evt.target;
    let index = array.indexOf(target);

    array.forEach(function(item, i, arr) {
      if(i === index) {
        item.classList.add('service-slider__button--active');
        serviceSliderItems[i].classList.add('service-slider__item--active');
      } else {
        item.classList.remove('service-slider__button--active');
        serviceSliderItems[i].classList.remove('service-slider__item--active');
      }
    });
  }
});
