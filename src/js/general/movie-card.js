import {
  fetchGetMovieDetails,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../services/tmdb-api';
import { refs } from './refs';

let movieId = 0;

refs.galleryHome.addEventListener('click', function (e) {
  const clickedElement = e.target.closest('[data-movie-id]');
  
  if (clickedElement) {
    movieId = Number(clickedElement.dataset.movieId);

    fetchGetMovieDetails(movieId)
      .then((data) => {        
        if (!data) {          
          return noGalleryTrendingMoviesMarkup();
        };        
        
        if (data) {
          refs.playBtn.classList.remove('is-hidden');
          return createMovieCard(data);
        };        
      })
      .catch(error => console.error(error));
  };
});

function createMovieCard(data) {
  const {
    original_title,
    overview,
    genres,
    popularity,
    poster_path,
    title,
    vote_average,
    vote_count,
  } = data;

  const movieCardDetails = {
    movieOriginalTitle: original_title,
    movieOverview: overview,
    movieGenres: getMovieGenres(genres),
    moviePopularity: popularity.toFixed(1),
    movieFullPosterPath: getFullMoviePosterPath(poster_path, baseApiUrlForPoster, posterMissing),
    movieTitle: title,
    movieVoteAverage: vote_average.toFixed(1),
    movieVoteCount: vote_count,
  };
  const {
    movieOriginalTitle,
    movieOverview,
    movieGenres,
    moviePopularity,
    movieFullPosterPath,
    movieTitle,
    movieVoteAverage,
    movieVoteCount,
  } = movieCardDetails;
  
  const markup = `
      <div class="movie-card">
        <div class="movie-card__poster-box">
          <img
            class="movie-card__poster"
            src="${movieFullPosterPath}"
            alt="${movieTitle}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>

        <div class="movie-card__description">
          <h2 class="movie-card__name">${movieTitle}</h2>
          
          <ul class="movie-card__info-list list">
            <li class="movie-card__info-item">
              <div class="movie-card__info-name">Vote / Votes</div>  
              <div class="movie-card__info-value">
                <span class="movie-card__vote">${movieVoteAverage}</span> /
                <span class="movie-card__vote-count">${movieVoteCount}</span>
              </div>
            </li>
            <li class="movie-card__info-item">
              <div class="movie-card__info-name">Popularity</div>
              <div class="movie-card__info-value">${moviePopularity}</div>
            </li>
            <li class="movie-card__info-item">
              <div class="movie-card__info-name">Original Title</div>
              <div class="movie-card__info-value">${movieOriginalTitle}</div>
            </li>
            <li class="movie-card__info-item">
              <div class="movie-card__info-name">Genre</div>
              <div class="movie-card__info-value">${movieGenres}</div>
            </li>
          </ul>

          <div class="movie-card__review-box">
            <p class="movie-card__review-title">About</p>
            <p class="movie-card__review-text">${movieOverview}</p>
          </div>

          <div class="movie-card__btn-box">
            <button class="movie-card__btn-watched">Add to Watched</button>
            <button class="movie-card__btn-queue">Add to queue</button>
          </div>
        </div>
      </div>
    `
  ; 

  refs.modalContainer.forEach(item => item.insertAdjacentHTML('beforeend', markup));
};

function getMovieGenres(data) {
  let movieGenres = []
  data.map(({ name }) => { movieGenres.push(name) });
  return movieGenres.join(', ');
};

function getFullMoviePosterPath(posterPathData, baseApiUrlForPosterData, posterMissingData) {
  return posterPathData ? baseApiUrlForPosterData.concat(posterPathData) : posterMissingData;
};