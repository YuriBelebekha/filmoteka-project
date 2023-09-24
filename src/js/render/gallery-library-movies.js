import {
  fetchGetMovieDetails,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../services/tmdb-api';
import 'paginationjs';
import { refs } from '../general/refs';

refs.libraryPageLink.addEventListener('click', createQueueGallery, { once: true });
refs.queueBtnFilter.addEventListener('click', createQueueGallery);
refs.watchedBtnFilter.addEventListener('click', createWatchedGallery);

// QUEUE BTN
export function createQueueGallery() {
  const queueList = JSON.parse(localStorage.getItem('queue'));

  if (refs.galleryQueueList.hasChildNodes()) {
    return;
  };

  if (!queueList || queueList.length === 0) {
    clearGalleryWatchedList();

    const markup = () => '<li><p>There is no list</br> of movies to watch.</br> <strong>Choose something interesting from trending movies or use the search on the </br><a class="link" href="./index.html">Home page</a></strong></p></li>';
    
    refs.galleryQueueList.insertAdjacentHTML('beforeend', markup());
  };  

  if (queueList) {
    queueList.map((id) => {      
      fetchGetMovieDetails(id)
        .then((data) => {
          clearGalleryWatchedList();
          createQueueList(data);
        });
    });
  };

  refs.watchedBtnFilter.classList.remove('active');
  refs.queueBtnFilter.classList.add('active');
};

export function createQueueList(data) {
  const { id, genres, title, poster_path, release_date } = data;
  let genreMovie = [];

  genres.map(({name}) => { genreMovie.push(name) });
  let normalizedStringGenreMovie = genreMovie.join(', ');
  
  let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';
  
  const markup = () => {
    return `
      <li class="gallery__item" data-movie-id="${id}">
        <div class="gallery__poster-box">
          <img
            class="gallery__poster"
            src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
            alt="${title}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>

        <div class="gallery__description">
          <h2 class="gallery__name">${title}</h2>
          <p class="gallery__genre">
            ${normalizedStringGenreMovie.length ? normalizedStringGenreMovie : 'N/A'} | ${releaseYear}
          </p>
        </div>
      </li>
    `    
  };

  refs.galleryQueueList.insertAdjacentHTML('beforeend', markup());
};

export function clearGalleryQueueList() {  
  refs.galleryQueueList.innerHTML = '';
};

// WATCHED BTN
export function createWatchedGallery() {
  const watchedList = JSON.parse(localStorage.getItem('watched'));

  if (refs.galleryWatchedList.hasChildNodes()) {
    return;
  };

  if (!watchedList || watchedList.length === 0) {
    clearGalleryQueueList();

    const markup = () => '<li><p>There is no list</br> of watched movies.</br> <strong>Choose something interesting from trending movies or use the search on the </br><a class="link" href="./index.html">Home page</a></strong></p></li>';
    
    refs.galleryWatchedList.insertAdjacentHTML('beforeend', markup());
  };

  if (watchedList) {
    watchedList.map((id) => {      
      fetchGetMovieDetails(id)
        .then((data) => {
          clearGalleryQueueList();
          createWatchedList(data);
        });
    });
  };

  refs.watchedBtnFilter.classList.add('active');
  refs.queueBtnFilter.classList.remove('active');
};

export function createWatchedList(data) {
  const { id, genres, title, poster_path, release_date } = data;
  let genreMovie = [];

  genres.map(({name}) => { genreMovie.push(name) });
  let normalizedStringGenreMovie = genreMovie.join(', ');
  
  let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';
  
  const markup = () => {
    return `
      <li class="gallery__item" data-movie-id="${id}">
        <div class="gallery__poster-box">
          <img
            class="gallery__poster"
            src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
            alt="${title}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>

        <div class="gallery__description">
          <h2 class="gallery__name">${title}</h2>
          <p class="gallery__genre">
            ${normalizedStringGenreMovie.length ? normalizedStringGenreMovie : 'N/A'} | ${releaseYear}
          </p>
        </div>
      </li>
    `    
  };

  refs.galleryWatchedList.insertAdjacentHTML('beforeend', markup());
};

export function clearGalleryWatchedList() {  
  refs.galleryWatchedList.innerHTML = '';
};