import {
  fetchGetTrending,
  fetchGenreMovieList,
  // fetchGetMovieDetails,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../../services/tmdb-api';
import { refs } from '../../general/refs';

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
    console.log(genreMovie);

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
          <p></p>
        </div>
      </li>
    `
  }).join('');

  refs.galleryTrendingMovies.insertAdjacentHTML('beforeend', markup);
};

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

// console.log(getGenreMovie(27));










// fetchGetMovieDetails(5648)
//   .then(({ genres }) => {
//     console.log(genres ? genres.map(({ name }) => name).join(', ') : []);
//     // return genres ? genres.map(({ name }) => name).join(', ') : [];    
//   })
//   .catch((error) => console.log(error));  