export class Watched {
  static async create(watchedMovieIdList) {
    return fetch('https://filmoteka-project-goit-default-rtdb.europe-west1.firebasedatabase.app/watched.json', {
      method: 'POST',
      body: JSON.stringify(watchedMovieIdList),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };
};