import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '008c8606747b1b5922ba109cd86c2637';

export const {
  media_type,
  time_window,
  language,
  page,
  include_adult,
  baseApiUrlForPoster,
  posterWidth,
  posterHeight,
  posterMissing,
  profilePhotoMissing,
} = {
  'media_type': 'movie',
  'time_window': 'day',
  'language': 'en-US',
  'page': 1,
  'include_adult': false,
  'baseApiUrlForPoster': 'https://image.tmdb.org/t/p/w500/',
  'posterWidth': 280,
  'posterHeight': 420,
  'posterMissing': 'https://i.pinimg.com/564x/6f/8c/f1/6f8cf13bd79b8be7d50cced5552eb99f.jpg',
  'profilePhotoMissing': 'https://i.pinimg.com/564x/6d/88/40/6d8840c2c2a29dca141b53754787c944.jpg',
};

// The Movie Database API docs for "get-trending":
// https://developers.themoviedb.org/3/trending/get-trending

export async function fetchGetTrending() {
  const { data } = await axios.get(`
    ${BASE_URL}/trending/${media_type}/${time_window}?api_key=${API_KEY}
  `);
  return await data;
};

// The Movie Database API docs for "search-movies":
// https://developers.themoviedb.org/3/search/search-movies

export async function fetchSearchMovies(query) {
  const { data } = await axios.get(`
    ${BASE_URL}/search/${media_type}?api_key=${API_KEY}&language=${language}&page=${page}&include_adult=${include_adult}&query=${query}
  `);
  return await data;
};

// The Movie Database API docs for "get-movie-details":
// https://developers.themoviedb.org/3/movies/get-movie-details

export async function fetchGetMovieDetails(id) {
  const { data } = await axios.get(`
    ${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}&language=${language}
  `);
  return await data;
};

// The Movie Database API docs for "get-movie-videos":
// https://developers.themoviedb.org/3/movies/get-movie-videos

export async function fetchGetMovieVideos(id) {
  const { data } = await axios.get(`
    ${BASE_URL}/${media_type}/${id}/videos?api_key=${API_KEY}&language=${language}
  `);
  return await data;
};

// ADDITIONAL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// The Movie Database API docs for "get-movie-credits":
// https://developers.themoviedb.org/3/movies/get-movie-credits

export async function fetchGetMovieCredits(id) {
  const { data } = await axios.get(`
    ${BASE_URL}/${media_type}/${id}/credits?api_key=${API_KEY}&language=${language}
  `);
  return await data;
};

// The Movie Database API docs "get-movie-reviews":
// https://developers.themoviedb.org/3/movies/get-movie-reviews

export async function fetchGetMovieReviews(id) {
  const { data } = await axios.get(`
    ${BASE_URL}/${media_type}/${id}/reviews?api_key=${API_KEY}&language=${language}
  `);
  return await data;
};

// The Movie Database API docs "get-genre-movie-list":
// https://developer.themoviedb.org/reference/genre-movie-list

const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDhjODYwNjc0N2IxYjU5MjJiYTEwOWNkODZjMjYzNyIsInN1YiI6IjY0MGNkMWU4ZTE4ZTNmMDdkMDUzY2U5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q4Y9rol-68rzXEWhzawY0S5XJGrnpOI0c479Q6-bmps'
  }
};

export async function fetchGenreMovieList() {
  const { data } = await axios.get(`
    ${BASE_URL}/genre/${media_type}/list?language=${language}
  `, options);
  return await data;
};
