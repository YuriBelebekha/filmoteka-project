import { refs } from './refs';

refs.signupBtn.onclick = (() => {
  refs.loginForm.style.marginLeft = "-50%";
});

refs.loginBtn.onclick = (() => {
  refs.loginForm.style.marginLeft = "0%";
});

refs.signupLink.onclick = (() => {
  refs.signupBtn.click();
  return false;
});