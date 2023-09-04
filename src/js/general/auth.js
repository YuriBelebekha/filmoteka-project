import { refs } from './refs';

refs.loginForm.addEventListener('submit', authFormHandler);

function authFormHandler(e) {
  e.preventDefault();

  
  const loginFormEmail = e.target.querySelector('#login-form-email').value;
  const loginFormPassword = e.target.querySelector('#login-form-password').value;

  console.log(loginFormEmail);
  console.log(loginFormPassword);
};


// loginFormEmail:            document.querySelector('#login-form-email'),
//   loginFormPassword:         document.querySelector('#login-form-password'),
//   signupFormEmail:           document.querySelector('#signup-form-email'),
//   signupFormPassword:        document.querySelector('#signup-form-password'),
//   signupFormPasswordConfirm: document.querySelector('#signup-form-password-confirm'),