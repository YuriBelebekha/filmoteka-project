export const refs = {
  // HOME PAGE
  galleryHome:               document.querySelectorAll('.gallery-home'),
  galleryHomeList:           document.querySelector('.gallery-home__list'),
  loaderHomeBox:             document.querySelector('.loader-box'),
  paginationTrendingMovies:  document.querySelector('.pagination-trending-movies'),
  paginationSearchMovies:    document.querySelector('.pagination-search-movies'),
  searchFormBtn:             document.querySelector('#search-form'),
  searchFormNotification:    document.querySelector('.search-form__notification'),

  // MODALS
  modal:           document.querySelector('[data-modal]'),
  closeModalBtn:   document.querySelector('[data-modal-close]'),
  backdrop:        document.querySelector('.backdrop'),
  modalContainer:  document.querySelectorAll('[data-modal-open-target]'),
  body:            document.querySelectorAll('body'),
  playBtn:         document.querySelector('.play-trailer'),
  movieTrailer:    document.getElementsByClassName('#movie-trailer'),
  
  // THEME SWITCHER
  radiosThemeSwitcher: document.getElementsByName('theme'),

  // HEADER LIBRARY
  header:          document.querySelector('.header'),
  libraryBtnList:  document.querySelector('.library-btn-list'),
  libraryPageLink: document.querySelector('#library-page-link'),
  homePageLink:    document.querySelector('#home-page-link'),

  // AUTH FORM
  loginForm:   document.querySelector('form.login'),
  signupForm:   document.querySelector('form.signup'),
  loginBtn:    document.querySelector('label.login'),
  signupBtn:   document.querySelector('label.signup'),
  signupLink:  document.querySelector('.signup-link'),
  // fieldBtn:    document.querySelector('.field__btn'),
  formWrapper: document.querySelector('.form-wrapper'),
};