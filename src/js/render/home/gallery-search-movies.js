import {
  fetchSearchMovies,
  fetchGenreMovieList,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../../services/tmdb-api';
import { refs } from '../../general/refs';

const notifications = {
  emptySearchInput: 'Your query is empty, please enter movie name to search.',
  wrongQuery: 'Nothing similar was found. Try to change your request, or choose something interesting from trending movies on home page.',
  foundMovies: 'Yeah! We found movies :)',
};
const {
  emptySearchInput,
  wrongQuery,
  foundMovies,
} = notifications;

let normalizedSearchQuery = '';
refs.searchFormBtn.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();
  normalizedSearchQuery = e.currentTarget.searchQuery.value.trim();
   
  if (normalizedSearchQuery === '') {    
    return inputFormNotification(emptySearchInput);    
  };

  if (normalizedSearchQuery) {
    e.currentTarget.searchQuery.value = '';
    getFoundMovies();
  };
};

function getFoundMovies() {
  const page = 1;
  let pageNumber = 0;

  fetchSearchMovies(normalizedSearchQuery, page)
    .then(({ total_pages: totalPages }) => {
      let arrayPageNumbers = [];

      function getArrayPageNumbers() {
        for (let i = 1; i <= totalPages; i += 1) {
          arrayPageNumbers.push(i);
        };
        return arrayPageNumbers;
      };
      
      $('[js-pagination-search-movies]').pagination({
        dataSource: getArrayPageNumbers(),
        pageSize: 1,
        pageRange: 1,
        showGoInput: true,
        showGoButton: true,

        callback: function (data, _pagination) {
          pageNumber = data[0];

          fetchSearchMovies(normalizedSearchQuery, pageNumber)
            .then(({ results }) => {
              if (!results) {
                return;
              };

              if (results.length === 0) {
                inputFormNotification(wrongQuery);
                return clearPaginationSearchMovies();
              };
              
              if (results) {
                clearGalleryHome();
                clearPaginationTrendingMovies();
                createGallerySearchingMovies(results);
                return inputFormNotification(foundMovies);
              };
            })
            .catch(error => console.error(error))
            .finally(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
      });
    })
    .catch(error => {
      console.error(error);
      inputFormNotification(error);
      clearPaginationSearchMovies();
    });  
};

function clearGalleryHome() {
  refs.galleryHome.innerHTML = '';
};

function clearPaginationTrendingMovies() {
  refs.paginationTrendingMovies.innerHTML = '';
};

function clearPaginationSearchMovies() {
  refs.paginationSearchMovies.innerHTML = '';
};

function createGallerySearchingMovies(data) {
  const markup = data.map(({ genre_ids, title, poster_path, release_date }) => {    
    let genreMovie = [];
    genre_ids.map((genre) => { genreMovie.push(getGenreMovie(genre)) });
    let normalizedStringGenreMovie = genreMovie.join(', ');
    
    let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

    return `
      <li class="gallery-home__item">
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

  refs.galleryHome.insertAdjacentHTML('beforeend', markup);
};

function inputFormNotification(notification) {
  refs.searchFormNotification.innerHTML = `<p>${notification}</p>`;
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