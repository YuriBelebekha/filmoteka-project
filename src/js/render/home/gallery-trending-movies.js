import {
  fetchGetTrending,
  fetchGenreMovieList,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../../services/tmdb-api';
import { refs } from '../../general/refs';

// Fetching and rendering trending movies
fetchGetTrending()
  .then(({results}) => {
    if (!results) {
      return noGalleryTrendingMoviesMarkup();
    };

    if (results) {
      createGalleryTrendingMovies(results);
    };
  })
  .catch(error => console.error(error));

function noGalleryTrendingMoviesMarkup() {
  refs.galleryTrendingMovies.innerHTML = '<li>Something went wrong... Please, try again later.</li>';
};

function createGalleryTrendingMovies(data) {
  const markup = data.map(({ genre_ids, id, title, poster_path, release_date }) => {
    let genreMovie = [];
    genre_ids.map((genre) => { genreMovie.push(getGenreMovie(genre)) });
    let normalizedStringGenreMovie = genreMovie.join(', ');    
    
    let releaseYear = release_date ? release_date.slice(0, 4) : 'N/A';

    return `
      <li class="gallery-trending-movies__item">
        <img
          class="gallery-trending-movies__poster"
          src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
          alt="${title}"
          width="${posterWidth}"
          height="${posterHeight}"
          loading="lazy"
        />
        <div class="gallery-trending-movies__description">
          <h2 class="gallery-trending-movies__title">${title}</h2>
          <p>${normalizedStringGenreMovie} | ${releaseYear}</p>
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