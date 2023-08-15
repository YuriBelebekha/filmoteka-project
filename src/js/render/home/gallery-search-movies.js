import {
  fetchSearchMovies,
  fetchGenreMovieList,
} from '../../services/tmdb-api';
import { refs } from '../../general/refs';

// console.log(fetchSearchMovies('transformers'));

const notifications = {
  emptySearchInput: 'Your query is empty, please enter movie name to search.',
  clearNotificationBox: '',
};
const { emptySearchInput, clearNotification } = notifications;

let normalizedSearchQuery = '';
refs.searchFormBtn.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  normalizedSearchQuery = e.currentTarget.searchQuery.value.trim();
   
  if (normalizedSearchQuery === '') {    
    return inputFormNotification(emptySearchInput);    
  };

  if (normalizedSearchQuery) {
    getFoundMovies();
  };

  
  
  // page = 1;
  // limitReached = true;

  // fetchPhotos(normalizedSearchQuery, page)
  //   .then(({ hits, totalHits }) => {
  //     if (totalHits === 0) {
  //       clearPhotoGalleryMarkup();
  //       return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  //     };
      
  //     if (totalHits > 0) {
  //       clearPhotoGalleryMarkup();
  //       Notify.success(`Hooray! We found ${totalHits} images.`);
  //       createMarkupForPhotoGallery(hits);
  //       lightbox.refresh();
        
  //       if (totalHits > per_page) {
  //         limitReached = false;
  //         observer.observe(refs.guard); 
  //       };        
  //     };      
  //   })    
  //   .catch(error => console.error(error));      
};

function getFoundMovies() {

  fetchSearchMovies(normalizedSearchQuery)
    .then(({ page, results, total_pages: totalPages, total_results: totalResults }) => {
      // console.log('page: ', page);
      // console.log('results: ', results);
      // console.log('totalPages: ', totalPages);
      // console.log('totalResults: ', totalResults);
      let arrayPageNumbers = [];

      function getArrayPageNumbers() {
        for (let i = 1; i <= totalPages; i += 1) {
          arrayPageNumbers.push(i);
        };
        return arrayPageNumbers;
      };

      console.log(getArrayPageNumbers())
      
      $('[js-pagination-search-movies]').pagination({
        dataSource: getArrayPageNumbers(),
        pageSize: 1,
        pageRange: 1,
        showGoInput: true,
        showGoButton: true,

        callback: function (data, _pagination) {
          pageNumber = data[0];

          // Stopped here     




        },    
      });

      // if (!results) {
      //   // return noGalleryTrendingMoviesMarkup();
      // };

      // refs.loaderHomeBox.classList.remove('hidden');
      // if (results) {
        // clearGalleryTrendingMoviesMarkup();
        // createGalleryTrendingMovies(results);
      // };
    })
    .catch(error => console.error(error))
    .finally(() => {
      // refs.loaderHomeBox.classList.add('hidden');
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    });



  
};

function createGalleryTrendingMovies(data) {
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
          <p class="gallery-home__genre">${normalizedStringGenreMovie} | ${releaseYear}</p>
        </div>
      </li>
    `
  }).join('');

  refs.galleryHome.insertAdjacentHTML('beforeend', markup);
};

// function getArrayPageNumbers() {
//   for (let i = 1; i <= numPages; i += 1) {
//     arrayPageNumbers.push(i);
//   };

//   return arrayPageNumbers;
// };

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