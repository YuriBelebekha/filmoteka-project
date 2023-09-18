import {
  fetchGetMovieDetails,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
} from '../services/tmdb-api';
import { refs } from './refs';

let movieId = 0;

refs.galleryHomeList.addEventListener('click', function (e) {
  const clickedElement = e.target.closest('[data-movie-id]');  

  if (clickedElement !== null) {
    movieId = Number(clickedElement.dataset.movieId);
    
    fetchGetMovieDetails(movieId)
      .then((data) => {
        if (!data) {
          return noGalleryTrendingMoviesMarkup();
        };
        
        if (data) {
          refs.playBtn.classList.remove('is-hidden');
          createMovieCard(data);     
        };        
      })
      .catch(error => console.log(error))
      .finally(() => {        
        addOrRemoveMovieIdToList(movieId);     
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

function getMovieGenres(data) {
  let movieGenres = []
  data.map(({ name }) => { movieGenres.push(name) });
  return movieGenres.join(', ');
};

function getFullMoviePosterPath(posterPathData, baseApiUrlForPosterData, posterMissingData) {
  return posterPathData ? baseApiUrlForPosterData.concat(posterPathData) : posterMissingData;
};

// Add/remove movieId to/from queue and watched
function addOrRemoveMovieIdToList(movieId) {
  const dataBtn = document.querySelectorAll('[data-btn]');
  const dataBtnQueue = document.querySelector('[data-btn="queue"]');
  const dataBtnWatched = document.querySelector('[data-btn="watched"]');

  dataBtn.forEach(item => {
    const btnDataName = item.dataset.btn;
    
    if (getMovieIdFromLocalStorage('queue').includes(movieId)) {
      dataBtnQueue.classList.add('active');
      dataBtnQueue.textContent = 'Remove from queue';
      dataBtnWatched.disabled = true;
    };

    if (getMovieIdFromLocalStorage('watched').includes(movieId)) {
      dataBtnWatched.classList.add('active');
      dataBtnWatched.textContent = 'Remove from watched';
      dataBtnQueue.disabled = true;
    };

    item.addEventListener('click', () => {
      const idList = getMovieIdFromLocalStorage(btnDataName);
      const movieIdIndex = idList.indexOf(movieId);
      
      if (btnDataName === 'queue') {
        if (movieIdIndex === -1) {
          addMovieIdToLocalStorage(movieId, btnDataName);

          dataBtnQueue.classList.add('active');
          dataBtnQueue.textContent = 'Remove from queue';
          dataBtnWatched.disabled = true;
        };

        if (movieIdIndex !== -1) {          
          removeMovieIdFromLocalStorage(movieId, btnDataName);

          dataBtnQueue.classList.remove('active');
          dataBtnQueue.textContent = 'Add to queue';
          dataBtnWatched.disabled = false;
        };
      };
      
      if (btnDataName === 'watched') {
        if (movieIdIndex === -1) {
          addMovieIdToLocalStorage(movieId, btnDataName);

          dataBtnWatched.classList.add('active');
          dataBtnWatched.textContent = 'Remove from watched';
          dataBtnQueue.disabled = true;
        };

        if (movieIdIndex !== -1) {          
          removeMovieIdFromLocalStorage(movieId, btnDataName);

          dataBtnWatched.classList.remove('active');
          dataBtnWatched.textContent = 'Add to queue';
          dataBtnQueue.disabled = false;
        };
      };     
    });
  });
};

function addMovieIdToLocalStorage(movieId, btnDataName) {
  const allMovieIdFromLocalStorage = getMovieIdFromLocalStorage(btnDataName);

  if (!JSON.stringify(allMovieIdFromLocalStorage).includes(movieId)) {
    allMovieIdFromLocalStorage.push(movieId);  
    localStorage.setItem(`${btnDataName}`, JSON.stringify(allMovieIdFromLocalStorage));
  };
};

function getMovieIdFromLocalStorage(btnDataName) {
  return JSON.parse(localStorage.getItem(`${btnDataName}`) || '[]');
};

function removeMovieIdFromLocalStorage(movieId, btnDataName) {
  const idList = getMovieIdFromLocalStorage(btnDataName);
  const movieIdIndex = idList.indexOf(movieId);
  
  idList.splice(movieIdIndex, 1);

  localStorage.setItem(`${btnDataName}`, JSON.stringify(idList));
};