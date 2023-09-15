// import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class Queue {
  static async create(queueMovieIdList) {
    return fetch('https://filmoteka-project-goit-default-rtdb.europe-west1.firebasedatabase.app/queue.json', {
      method: 'POST',
      body: JSON.stringify(queueMovieIdList),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        queueMovieIdList.id = response.name;

        return queueMovieIdList;
      });
  };

  static async fetch(token) {
    const response = await fetch(`https://filmoteka-project-goit-default-rtdb.europe-west1.firebasedatabase.app/queue.json?auth=${token}`);
    const userMovieId = await response.json();

    console.log('User movie IDs', userMovieId); /////// delete
  };
};