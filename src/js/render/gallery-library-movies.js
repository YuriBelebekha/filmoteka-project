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
    
    refs.galleryLibraryList.insertAdjacentHTML('beforeend', markup());
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
      <li class="gallery-library__item" data-movie-id="${id}">
        <div class="gallery-library__poster-box">
          <img
            class="gallery-library__poster"
            src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
            alt="${title}"
            width="${posterWidth}"
            height="${posterHeight}"
            loading="lazy"
          />
        </div>

        <div class="gallery-library__description">
          <h2 class="gallery-library__name">${title}</h2>
          <p class="gallery-library__genre">
            ${normalizedStringGenreMovie.length ? normalizedStringGenreMovie : 'N/A'} | ${releaseYear}
          </p>
        </div>
      </li>
    `    
  };

  refs.galleryLibraryList.insertAdjacentHTML('beforeend', markup());
};

///////////////////////////////////////////////////////
let movieId = 0;

refs.galleryLibraryList.addEventListener('click', function (e) {
  const clickedElement = e.target.closest('[data-movie-id]');  

  if (clickedElement !== null) {
    movieId = Number(clickedElement.dataset.movieId);
    
    fetchGetMovieDetails(movieId)
      .then((data) => {
        if (!data) {
          return;
        };
        
        if (data) {
          refs.playBtn.classList.remove('is-hidden');          
          createMovieCard(data);
        }; 
      })
      .catch(error => console.log(error))
      .finally(() => {        
        // addOrRemoveMovieIdToList(movieId);     
      });
  };
});

function createMovieCard(data) {
  const {
    id,
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
    movieId: id,
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
    movieId,
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
    <div class="movie-card" data-movie-id="${movieId}">
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
          <button class="movie-card__btn-queue queue-btn" data-btn='queue' type="button">Add to queue</button>
          <button class="movie-card__btn-watched watched-btn" data-btn='watched' type="button">Add to watched</button>
        </div>
      </div>
    </div>
  `;

  refs.modalContainer.forEach(item => item.insertAdjacentHTML('beforeend', markup));  
};

function getMovieGenres(genres) {
  let movieGenres = []
  genres.map(({ name }) => { movieGenres.push(name) });
  return movieGenres.join(', ');
};

function getFullMoviePosterPath(posterPathData, baseApiUrlForPosterData, posterMissingData) {
  return posterPathData ? baseApiUrlForPosterData.concat(posterPathData) : posterMissingData;
};