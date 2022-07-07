import '../scss/style.scss'
import Swiper, { Pagination } from 'swiper'
Swiper.use([Pagination])

const dropdownButton = document.querySelectorAll('.dropdown')
const hidableBlock = [
  document.querySelectorAll('.about__description')[0],
  document.querySelector('.cards__brands'),
  document.querySelector('.cards__repair')
]

const baseBlockHeight = [
  hidableBlock[0].clientHeight,
  hidableBlock[1].clientHeight,
  hidableBlock[2].clientHeight
]

const hiddenBlockHeight = []
baseBlockHeight.forEach((elem) => {
  hiddenBlockHeight.push(elem / 3)
})

hidableBlock[0].style.height = hiddenBlockHeight[0] + 'px'
for (var i = 0; i < dropdownButton.length; i++) {
  toggleHeight(
    dropdownButton[i],
    hidableBlock[i],
    baseBlockHeight[i],
    hiddenBlockHeight[i]
  )
}

window.onload = () => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      spaceBetween: 20,
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      init: true
    })
  } else {
    for (i = 1; i < hidableBlock.length; i++) {
      hidableBlock[i].style.height = hiddenBlockHeight[i] + 'px'
    }
  }
}

const links = document.getElementsByClassName('navigation__link')
const language = document.getElementsByClassName('language-select__language')

const menu = document.getElementsByClassName('menu')[0]
const modal = document.getElementsByClassName('modal')[0]
const overlay = document.getElementsByClassName('overlay')[0]
const warning = document.getElementsByClassName('warning')[0]

const feedbackMessage = document.getElementById('feedback-message')
const requiestCall = document.getElementById('request-call')

overlay.addEventListener('click', (e) => {
  forceAction('')
})

for (var a = 0; a < links.length; a++) {
  links[a].addEventListener('click', (e) => {
    switchSelectionMenuItem(links, e.target)
  })
}

function switchSelectionMenuItem(allElements, pickedElement) {
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].classList.remove('navigation__link--active')
  }
  pickedElement.classList.add('navigation__link--active')
}

for (var i = 0; i < language.length; i++) {
  language[i].addEventListener('click', (e) => {
    switchSelectionLanguage(language, e.target)
  })
}

function switchSelectionLanguage(allElements, pickedElement) {
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].classList.remove('language-select__language--active')
  }
  pickedElement.classList.add('language-select__language--active')
}

var icons = document.getElementsByClassName('icon')

for (var i = 0; i < icons.length; i++) {
  if (icons[i].dataset.forceaction != undefined) {
    icons[i].addEventListener('click', (e) => {
      forceAction(e.target.dataset.forceaction, e.target.dataset.modaltype)
    })
  }
}

function forceAction(action, modalType) {
  switch (action) {
    case 'open menu':
      menu.classList.add('menu--active')
      overlay.classList.add('overlay--active')
      return
    case 'close menu':
      menu.classList.remove('menu--active')
      overlay.classList.remove('overlay--active')
      return
    case 'open modal':
      if (modalType == 'request call') {
        requiestCall.classList.add('form--active')
        feedbackMessage.classList.remove('form--active')
        requiestCall.getElementsByClassName('form__input')[0].focus();
      }
      if (modalType == 'feedback message') {
        requiestCall.classList.remove('form--active')
        feedbackMessage.classList.add('form--active')
        feedbackMessage.getElementsByClassName('form__input')[0].focus();
      }
      menu.classList.remove('menu--active')
      modal.classList.add('modal--active')
      overlay.classList.add('overlay--active')
      return
    case 'close modal':
      menu.classList.remove('menu--active')
      overlay.classList.remove('overlay--active')
    default:
      menu.classList.remove('menu--active')
      modal.classList.remove('modal--active')
      overlay.classList.remove('overlay--active')
  }
}

window.addEventListener(
  `resize`,
  () => {
    if (
      menu.classList.contains('menu--active') ||
      modal.classList.contains('modal--active') ||
      overlay.classList.contains('overlay--active')
    ) {
      menu.classList.remove('menu--active')
      modal.classList.remove('modal--active')
      overlay.classList.remove('overlay--active')
      warning.classList.add('warning--active')
      setTimeout(() => {
        warning.classList.remove('warning--active')
      }, 3000)
    }
  },
  false
)

function toggleHeight(button, block, blockHeight, hiddenBlockHeight) {
  const innerText = button.innerHTML
  button.addEventListener('click', (e) => {
    e.target.classList.toggle('dropdown--active')
    if (e.target.classList.contains('dropdown--active')) {
      block.style.height = blockHeight + 'px'
      e.target.innerHTML = 'Скрыть'
    } else {
      block.style.height = hiddenBlockHeight + 'px'
      e.target.innerHTML = innerText
    }
  })
}
