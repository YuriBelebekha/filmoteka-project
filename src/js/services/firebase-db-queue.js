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
        console.log(response);
      });
  };
};