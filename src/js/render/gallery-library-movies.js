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

function createQueueGallery() {
  const queueList = JSON.parse(localStorage.getItem('queue'));  

  if (!queueList || queueList.length === 0) {
    const markup = () => '<p>There is no list of movies to watch.</br> <strong>Choose something interesting from trending movies or use the search on the Home page.</strong></p>';
    
    refs.galleryList.insertAdjacentHTML('beforeend', markup());
  };

  if (queueList) {
    queueList.map((id) => {
      fetchGetMovieDetails(id)
        .then((data) => {
          createQueueList(data);
        });
    });
  };
};

function createQueueList(data) {
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

function clearGalleryList() {
  refs.galleryList.innerHTML = '';
};