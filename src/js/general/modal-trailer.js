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
          // console.log(results); /////////// delete
          return noMovieTrailer();
        };

        if (results) {
          // window.scrollTo({ bottom: 0, behavior: 'smooth' });
          return createMovieTrailerBox(results);
        };        
      })
      .catch((error) => { console.log(error) });
  };
};

function createMovieTrailerBox(results) { 
  // console.table(results); ////////////////////// delete
  
  const markup = results.map(({ name, key, type }) => {    
    const normalizedType = type.toLowerCase().trim();
    console.log(name, key, type)
    
    // Розібратись чому не підтягує всі відео з Type === 'Trailer'!!!!!!!!!!!!!!!!!!!!!!
    // Спробувати створити новий масив з доданими за Type === 'Trailer' даними і вже з нього рендерити трейлери з назвами
    
    if (normalizedType === 'trailer') {
      return `        
        <div class="movie-trailer">
          <p class="movie-trailer__name">${name}</p>
          
          <iframe
            width="240"
            src="https://www.youtube-nocookie.com/embed/${key}?enablejsapi=1&modestbranding=1"
            title="${name}"
            frameborder="0"
            allowfullscreen
          </iframe>
        </div>
      `
    };  
  }).join('');

  refs.modalContainer.forEach(item => item.insertAdjacentHTML('beforeend', markup));
};

function noMovieTrailer() {  
  const markup = `<p class="movie-trailer__message">Unfortunately, we don't have any trailer</p>`;
  refs.modalContainer.forEach(item => item.insertAdjacentHTML('beforeend', markup));
};