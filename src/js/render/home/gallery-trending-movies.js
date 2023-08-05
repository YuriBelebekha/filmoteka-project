import { fetchGetTrending } from '../../services/tmdb-api';
import { refs } from '../../general/refs';

fetchGetTrending()
  .then(({results}) => {
    if (!results) {
      return noGalleryTrendingMoviesMarkup();
    };

    if (results) {
      return createGalleryTrendingMovies(results);
    };
  })
  .catch(error => console.error(error));

function noGalleryTrendingMoviesMarkup() {
  refs.galleryTrendingMovies.innerHTML = '<li>Something went wrong... Please, try again later.</li>';
};

function createGalleryTrendingMovies(data) {
  const markup = data.map(({ id, title, poster_path }) => {    
    return `
      <li class="gallery-trending-movies__item">
        <img
          class="gallery-trending-movies__poster"
          src="${BASE_URL}${poster_path}"
          alt=""
          loading="lazy"
        />
        <div class="gallery-trending-movies__description">
          <h2 class="gallery-trending-movies__title">${title}</h2>
          <p class="gallery-trending-movies__subtitle">
            ${genresMovie}${' | ' + releaseDate}
          </p>          
        </div>
      </li>
    `
  }).join('');

  refs.galleryPhoto.insertAdjacentHTML('beforeend', markup);
};