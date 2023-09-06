// 'https://filmoteka-project-goit-default-rtdb.europe-west1.firebasedatabase.app/'

// stopped here
// https://www.youtube.com/watch?v=KS2ngnRAKlg 46:15

export class Queue {
  static async create(queueMovieId) {
    return fetch('https://filmoteka-project-goit-default-rtdb.europe-west1.firebasedatabase.app/', {
      method: 'POST',
      body: JSON.stringify(queueMovieId),
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