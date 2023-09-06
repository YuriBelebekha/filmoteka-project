import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';

refs.loginForm.addEventListener('submit', loginFormHandler);
refs.signupForm.addEventListener('submit', signupFormHandler);

function loginFormHandler(e) {
  e.preventDefault();  
  const loginFormEmail = e.target.querySelector('#login-form-email').value;
  const loginFormPassword = e.target.querySelector('#login-form-password').value;

  authWithEmailAndPassword(loginFormEmail, loginFormPassword)
    .then(token => {
      if (token) {
        Notify.success(`Login successful. Email: ${loginFormEmail}`);
      } else {
        Notify.failure('Incorrect login or password');
      };      
    });
  
  refs.loginInput.forEach(item => item.value = '');
};

function signupFormHandler(e) {
  e.preventDefault();  
  const signupFormEmail = e.target.querySelector('#signup-form-email').value;
  const signupFormPassword = e.target.querySelector('#signup-form-password').value;
  const signupFormPasswordConfirm = e.target.querySelector('#signup-form-password-confirm').value;

  if (signupFormPassword === signupFormPasswordConfirm) {
    signupWithEmailAndPassword(signupFormEmail, signupFormPassword)
      .then(data => {
        if (data) {
          Notify.success(`Successful registration with email: ${signupFormEmail}`);          
        } else {
          Notify.failure('This email is already registered');
        };
      });
    refs.signupInput.forEach(item => item.value = '');
  } else {
    Notify.failure('Password and confirm password are not the same');
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