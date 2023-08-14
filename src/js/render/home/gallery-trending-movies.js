import {
  fetchGetTrending,
  fetchGenreMovieList,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../../services/tmdb-api';
import { refs } from '../../general/refs';
import 'paginationjs';

let numPages = 200;
let arrayPageNumbers = [];
let pageNumber = 0;

$('[js-pagination-home-gallery]').pagination({
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
          clearGalleryTrendingMoviesMarkup();
          createGalleryTrendingMovies(results);          
        };
      })
      .catch(error => console.error(error))
      .finally(() => {
        refs.loaderHomeBox.classList.add('hidden');
        window.scrollTo({ top: 200, behavior: 'smooth' });
      });
  },
});

function getArrayPageNumbers() {
  for (let i = 1; i <= numPages; i += 1) {
    arrayPageNumbers.push(i);
  };

  return arrayPageNumbers;
};

function clearGalleryTrendingMoviesMarkup() {
  refs.galleryTrendingMovies.innerHTML = '';
};

function noGalleryTrendingMoviesMarkup() {
  refs.galleryTrendingMovies.innerHTML = '<li>Something went wrong... Please, try again later.</li>';
};

function createGalleryTrendingMovies(data) {
  const markup = data.map(({ genre_ids, title, poster_path, release_date }) => {
    let genreMovie = [];
    genre_ids.map((genre) => { genreMovie.push(getGenreMovie(genre)) });
    let normalizedStringGenreMovie = genreMovie.join(', ');    
    
    let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

    return `
      <li class="gallery-trending-movies__item">
        <div class="gallery-trending-movies__poster-box">
          <img
            class="gallery-trending-movies__poster"
            src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
            alt="${title}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>
        <div class="gallery-trending-movies__description">
          <h2 class="gallery-trending-movies__name">${title}</h2>
          <p class="gallery-trending-movies__genre">${normalizedStringGenreMovie} | ${releaseYear}</p>
        </div>
      </li>
    `
  }).join('');

  refs.galleryTrendingMovies.insertAdjacentHTML('beforeend', markup);
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