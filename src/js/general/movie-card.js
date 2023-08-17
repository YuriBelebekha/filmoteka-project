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
          createMovieCard(data);
        };
      })
      .catch(error => console.error(error));      
  };
});

function createMovieCard(data) {
  // console.log(data);

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
  
  console.log(movieOriginalTitle);
  console.log(movieOverview);
  console.log(movieGenres);
  console.log(moviePopularity);
  console.log(movieFullPosterPath);
  console.log(movieTitle);
  console.log(movieVoteAverage);
  console.log(movieVoteCount);

  
  
  // const markup = data.map(({ id, genre_ids, title, poster_path }) => { 

  //   return `
  //     <li class="gallery-home__item" data-movie-id="${id}">
  //       <div class="gallery-home__poster-box">
  //         <img
  //           class="gallery-home__poster"
  //           src="${poster_path ? baseApiUrlForPoster.concat(poster_path) : posterMissing}"
  //           alt="${title}"
  //           width="${posterWidth}"
  //           height="${posterHeight}"
  //           loading="lazy"
  //         />
  //       </div>
  //       <div class="gallery-home__description">
  //         <h2 class="gallery-home__name">${title}</h2>
  //         <p class="gallery-home__genre">
  //           ${normalizedStringGenreMovie.length ? normalizedStringGenreMovie : 'N/A'} | ${releaseYear}
  //         </p>
  //       </div>
  //     </li>
  //   `
  // }).join('');

  // refs.modal.insertAdjacentHTML('beforeend', markup);
};

function getMovieGenres(data) {
  let movieGenres = []
  data.map(({ name }) => { movieGenres.push(name) });
  return movieGenres.join(', ');
};

function getFullMoviePosterPath(posterPathData, baseApiUrlForPosterData, posterMissingData) {
  return posterPathData ? baseApiUrlForPosterData.concat(posterPathData) : posterMissingData;
};