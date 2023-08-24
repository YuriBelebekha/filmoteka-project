import {
  fetchGetMovieVideos,
} from '../services/tmdb-api';
import { refs } from './refs';

refs.playBtn.addEventListener('click', getMovieTrailer);

function getMovieTrailer() {
  const movieId = Number(refs.modalContainer[0].childNodes[1].dataset.movieId);  
  
  if (!movieId) {
    return;
  };

  if (movieId) {
    fetchGetMovieVideos(movieId)
      .then(({ results }) => {        
        if (results.length === 0) {
          refs.playBtn.classList.add('is-hidden');        
          return noMovieTrailer();
        };

        if (results) {          
          refs.playBtn.classList.add('is-hidden');
          return createMovieTrailerBox(results);
        };
      })
      .catch((error) => { console.log(error) });
  };
};

function createMovieTrailerBox(results) {   
  const markup = results
    .filter(({ type }) => type.toLowerCase().trim() === 'trailer')
    .map(({ name, key }) => {
      return `        
        <div class="movie-trailer">
          <p class="movie-trailer__name">${name}</p>          
          <iframe
            width="240"
            src="https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&modestbranding=1"
            title="${name}"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
        </div>
      `
    })
    .join('');

  refs.modalContainer.forEach(item => item.insertAdjacentHTML('afterbegin', markup));
};

function noMovieTrailer() {  
  const markup = `<p class="movie-trailer__message">Unfortunately, we don't have any trailer</p>`;
  refs.modalContainer.forEach(item => item.insertAdjacentHTML('afterbegin', markup));
};