import {
  fetchGetTrending,
  fetchGenreMovieList,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../services/tmdb-api';
import { refs } from '../general/refs';
import 'paginationjs';

let numPages = 500;
let arrayPageNumbers = [];
let pageNumber = 0;

$('[js-pagination-trending-movies]').pagination({
  dataSource: getArrayPageNumbers(),
  pageSize: 1,
  pageRange: 1,
  showGoInput: true,
  showGoButton: true,

  callback: function (data, _pagination) {
    pageNumber = data[0];

    fetchGetTrending(pageNumber)
      .then(({ results }) => {
        if (!results) {
          return noGalleryTrendingMoviesMarkup();
        };

        refs.loaderHomeBox.classList.remove('hidden');
        if (results) {
          clearGalleryHomeList();
          createGalleryTrendingMovies(results);
        };
      })
      .catch(error => console.error(error))
      .finally(() => {
        refs.loaderHomeBox.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  },
});

function getArrayPageNumbers() {
  for (let i = 1; i <= numPages; i += 1) {
    arrayPageNumbers.push(i);
  };

  return arrayPageNumbers;
};

function clearGalleryHomeList() {
  refs.galleryHomeList.innerHTML = '';
};

function noGalleryTrendingMoviesMarkup() {
  refs.galleryHomeList.innerHTML = '<li>Something went wrong... Please, try again later.</li>';
};

function createGalleryTrendingMovies(data) {
  const markup = data.map(({ id, genre_ids, title, poster_path, release_date }) => {
    let genreMovie = [];
    genre_ids.map((genre) => { genreMovie.push(getGenreMovie(genre)) });
    let normalizedStringGenreMovie = genreMovie.join(', ');    
    
    let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

    return `
      <li class="gallery-home__item" data-movie-id="${id}">
        <div class="gallery-home__poster-box">
          <img
            class="gallery-home__poster"
            src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
            alt="${title}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>
        <div class="gallery-home__description">
          <h2 class="gallery-home__name">${title}</h2>
          <p class="gallery-home__genre">
            ${normalizedStringGenreMovie.length ? normalizedStringGenreMovie : 'N/A'} | ${releaseYear}
          </p>
        </div>
      </li>
    `
  }).join('');

  refs.galleryHomeList.insertAdjacentHTML('beforeend', markup);
};

// Fetching and converting genre id to genre name text
fetchGenreMovieList()
  .then(({ genres }) => saveGenresListToLocalStorage(genres));

function saveGenresListToLocalStorage(data) {
  localStorage.setItem('genres', JSON.stringify(data));
};

function getGenreMovie(genreId) {
  let result = localStorage.getItem('genres');

  for (const elem of JSON.parse(result)) {
    if (elem.id === genreId) {
      return elem.name;
    };
  };
};