import {
  fetchGetTrending,
  fetchGenreMovieList,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../services/tmdb-api';
import 'paginationjs';
import { refs } from '../general/refs';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

let numPages = 500;
let arrayPageNumbers = [];
let pageNumber = 0;

$('[js-pagination-trending-movies]').pagination({
  dataSource: getArrayPageNumbers(),
  pageSize: 1,
  pageRange: 1,
  showGoInput: true,
  showGoButton: true,
  goButtonText: 'Go to page',

  callback: function (data, _pagination) {
    pageNumber = data[0];    
    
    fetchGetTrending(pageNumber)
      .then(({ results }) => {
        if (!results) {
          return noGalleryTrendingMoviesMarkup();
        };
        
        NProgress.start();
        refs.loaderHomeBox.classList.remove('hidden');

        if (results) {
          fetchGenreMovieList()
            .then(({ genres }) => {
              saveGenresListToLocalStorage(genres);
            })
            .then(() => {
              clearGalleryList();
              createGalleryTrendingMovies(results);
            })
            .finally(() => {
              NProgress.done();
            });          
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

function clearGalleryList() {
  refs.galleryList.innerHTML = '';
};

function noGalleryTrendingMoviesMarkup() {
  refs.galleryList.innerHTML = '<li>Something went wrong... Please, try again later.</li>';
};

function createGalleryTrendingMovies(data) {
  const markup = data.map(({ id, genre_ids, title, poster_path, release_date }) => {
    let genreMovie = [];
    genre_ids.map((genre) => { genreMovie.push(getGenreMovie(genre)) });
    let normalizedStringGenreMovie = genreMovie.join(', ');
    
    let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

    const queueLocalStorageList = localStorage.getItem('queue');
    const watchedLocalStorageList = localStorage.getItem('watched');
    
    if (!queueLocalStorageList && !watchedLocalStorageList) {
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
    
    if (queueLocalStorageList && queueLocalStorageList.includes(id)) {
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

          <div class="library-flag">
            <ul>
              <li><p>Q</p><b>ueue</b></li>
            </ul>
          </div>
        </li>
      `
    };
    
    if (watchedLocalStorageList && watchedLocalStorageList.includes(id)) {
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

          <div class="library-flag">
            <ul>
              <li><p>W</p><b>atched</b></li>
            </ul>
          </div>
        </li>
      `
    };

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
  }).join('');

  refs.galleryList.insertAdjacentHTML('beforeend', markup);
};

// Converting genre id to genre name text
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