export const refs = {
  // HOME PAGE
  galleryHome:               document.querySelector('.gallery-home__list'),
  loaderHomeBox:             document.querySelector('.loader-box'),
  paginationTrendingMovies:  document.querySelector('.pagination-trending-movies'),
  paginationSearchMovies:    document.querySelector('.pagination-search-movies'),
  searchFormBtn:             document.querySelector('#search-form'),
  searchFormNotification:    document.querySelector('.search-form__notification'),

  // MODALS
  modal:          document.querySelector('[data-modal]'),
  closeModalBtn:  document.querySelector('[data-modal-close]'),
  backdrop:       document.querySelector('.backdrop'),
  modalContainer: document.querySelectorAll('[data-modal-open-target]'),
  body:           document.querySelectorAll('body'),
};