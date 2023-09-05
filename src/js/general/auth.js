import { refs } from './refs';

refs.loginForm.addEventListener('submit', loginFormHandler);
refs.signupForm.addEventListener('submit', signupFormHandler);

function loginFormHandler(e) {
  e.preventDefault();  
  const loginFormEmail = e.target.querySelector('#login-form-email').value;
  const loginFormPassword = e.target.querySelector('#login-form-password').value;

  authWithEmailAndPassword(loginFormEmail, loginFormPassword)
    .then(token => {
      // console.log(token);
    });
};

function signupFormHandler(e) {
  e.preventDefault();  
  const signupFormEmail = e.target.querySelector('#signup-form-email').value;
  const signupFormPassword = e.target.querySelector('#signup-form-password').value;
  const signupFormPasswordConfirm = e.target.querySelector('#signup-form-password-confirm').value;

  if (signupFormPassword === signupFormPasswordConfirm) {
    signupWithEmailAndPassword(signupFormEmail, signupFormPassword)
      .then(data => {
        // console.log(data);
      });
  } else {
    console.log('Password and confirm password are not the same');
  };  
};

export async function authWithEmailAndPassword(email, password) {
  const firebaseApiKey = 'AIzaSyAHGbBOiPDqY-b9zziWypxtvX7jQuePvI8';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(response => response.json())
    .then(data => data.idToken);
};

export async function signupWithEmailAndPassword(email, password) {
  const firebaseApiKey = 'AIzaSyAHGbBOiPDqY-b9zziWypxtvX7jQuePvI8';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(response => response.json())
    .then(data => data.idToken);
};