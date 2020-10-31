const mapLink = document.querySelector('.contacts__map');
const mapModal = document.querySelector('.map-modal');
const mapModalClose = document.querySelector('.map-modal--close');

const writeUsLink = document.querySelector('.contacts__link');
const writeUsModal = document.querySelector('.write-us');
const writeUsClose = document.querySelector('.write-us--close');

const userName = document.querySelector('[name=write-us-name]');
const userEmail = document.querySelector('[name=write-us-email]');
const userText = document.querySelector('[name=write-us-text]');

const writeUsForm = document.querySelector('.write-us__form');
const storageUserName = localStorage.getItem('user-name');

const isStorageSupport = true;
let storage = '';

let promoSliderItems = document.querySelectorAll('.slider__item');
let sliderControls = document.querySelector('.slider__controls');
let promoSliderToggles = document.querySelectorAll('.slider__toggle');

let sliderButton = document.querySelector('.slider__button');
let promoSliderButtonPrev = document.querySelector('.slider__button--prev');
let promoSliderButtonNext = document.querySelector('.slider__button--next');


let serviceSliderItems = document.querySelectorAll('.service-slider__item');
let serviceSliderButtons = document.querySelectorAll('.service-slider__button');

let serviceSliderItem = document.querySelectorAll('.service-slider__item');


let serviceSliderNav = document.querySelector('.service-slider__nav');


let cart = document.querySelector('.cart');
let addCartButtons = document.querySelectorAll('.button-add-cart');
let modalMessageAddCart = document.querySelector('.message-add-cart');
let messageAddCartClose = document.querySelector('.message-add-cart--close');
let messageAddCartContinue = document.querySelector('.message-add-cart__continue');
let cartValue = document.querySelector('.cart__value');
let cartValueCounter = cartValue.textContent;

let addBookmarsButtons = document.querySelectorAll('.button-add-bookmarks');
let modalMessageAddBookmars = document.querySelector('.message-add-bookmarks');
let messageAddBookmarksClose = document.querySelector('.message-add-bookmarks--close');
let messageAddBookmarksContinue = document.querySelector('.message-add-bookmarks__continue');
let bookmarksValue = document.querySelector('.bookmarks__value');
let bookmarksValueCounter = bookmarksValue.textContent;

let loginButton = document.querySelector('.autorization__login');
let autorization = document.querySelector('.autorization');
let logoutButton = document.querySelector('.user__logout');

// для логина

loginButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  autorization.classList.add('autorization--active');
});

logoutButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  autorization.classList.remove('autorization--active');
});


// для закладок
if (addBookmarsButtons) {
  for (let addBookmarsButton of addBookmarsButtons) {
    addBookmarsButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddBookmars.classList.add('modal-show');
      bookmarksValueCounter++;
      bookmarksValue.textContent = bookmarksValueCounter;
    })
    messageAddBookmarksClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddBookmars.classList.remove('modal-show');
    });

    messageAddBookmarksContinue.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddBookmars.classList.remove('modal-show');
    });
  }
}


// для корзины
if (addCartButtons) {
  for (let addCartButton of addCartButtons) {
    addCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddCart.classList.add('modal-show');
      cartValueCounter++;
      cartValue.textContent = cartValueCounter;
      cart.classList.add('cart--active');
    })
    messageAddCartClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddCart.classList.remove('modal-show');
    });

    messageAddCartContinue.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalMessageAddCart.classList.remove('modal-show');
    });
  }
}

// для карты
if (mapLink) {
  mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    mapModal.classList.add('modal-show');
  });

  mapModalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    mapModal.classList.remove('modal-show');
  });
}

// для формы обратной связи

try {
  storage = localStorage.getItem('user-name');
} catch (err) {
  isStorageSupport = false;
}
if (writeUsLink) {
  writeUsLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    writeUsModal.classList.add('modal-show');
    if (storageUserName) {
      userName.value = storageUserName;
      userEmail.focus();
    } else {
      userName.focus();
    }
  });

  writeUsClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    writeUsModal.classList.remove('modal-show');
    writeUsModal.classList.remove('modal-error');
  });

  writeUsForm.addEventListener('submit', function (evt) {
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
}

// сервис слайдер

if (serviceSliderNav) {
  serviceSliderNav.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('service-slider__button')) {
      evt.preventDefault();
      let array = Array.from(serviceSliderButtons);
      let target = evt.target;
      let index = array.indexOf(target);

      array.forEach(function (item, i, arr) {
        if (i === index) {
          item.classList.add('service-slider__button--active');
          serviceSliderItems[i].classList.add('service-slider__item--active');
        } else {
          item.classList.remove('service-slider__button--active');
          serviceSliderItems[i].classList.remove('service-slider__item--active');
        }
      });
    }
  });
}

if (sliderControls) {
  /*обработчик клика на блоке с кнопками в первом слайде*/
  sliderControls.addEventListener('click', function (evt) {
    let promoSliderToggle = Array.from(promoSliderToggles);
    let target = evt.target;
    let index = promoSliderToggle.indexOf(target);

    currentSlide(index + 1);
  });

  /* Устанавливаем индекс слайда по умолчанию */
  let slideIndex = 2;
  showSlides(slideIndex);

  /* Увеличиваем индекс на 1 — показываем следующий слайд*/
  promoSliderButtonNext.addEventListener('click', function nextSlide() {
    showSlides(slideIndex += 1);
    addActiveClass(slideIndex);
  });

  /* Уменьшает индекс на 1 — показываем предыдущий слайд*/
  promoSliderButtonPrev.addEventListener('click', function previousSlide() {
    showSlides(slideIndex -= 1);
    addActiveClass(slideIndex);
  });

  /* Устанавливаем текущий слайд */
  function currentSlide(n) {
    showSlides(slideIndex = n);
    addActiveClass(slideIndex);
  }

  currentSlide(slideIndex);

  /* Функция добавления класса на активный слайд */
  function addActiveClass(n) {
    let promoSliderToggle = document.getElementsByClassName('slider__toggle');

    for (let button of promoSliderToggle) {
      button.classList.remove('slider__toggle--active');
    }
    promoSliderToggle[slideIndex - 1].classList.add('slider__toggle--active');
  }

  /* Функция перелистывания */
  function showSlides(n) {
    if (n > promoSliderItems.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = promoSliderItems.length
    }

    /* Проходим по каждому слайду в цикле for */
    for (let slide of promoSliderItems) {
      slide.classList.remove('slider__item--active');
    }
    promoSliderItems[slideIndex - 1].classList.add('slider__item--active');
  }
}
