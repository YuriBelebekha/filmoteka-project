export const refs = {
  // HOME PAGE
  gallery:                   document.querySelectorAll('.gallery'),
  galleryTrending:           document.querySelector('.gallery.trending-movies'),
  gallerySearch:             document.querySelector('.gallery.search-movies'),
  galleryList:               document.querySelector('.gallery__list'),
  galleryListAll:            document.querySelectorAll('.gallery__list'),
  galleryTrendingList:       document.querySelector('.gallery__list.gallery__trending-list'),
  gallerySearchList:         document.querySelector('.gallery__list.gallery__search-list'),
  galleryQueueList:          document.querySelector('.gallery__list.gallery__queue-list'),
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

  // HEADER
  header:          document.querySelector('.header'),
  libraryBtnList:  document.querySelector('.library-btn-list'),
  libraryPageLink: document.querySelector('#library-page-link'),
  homePageLink:    document.querySelector('#home-page-link'),
};