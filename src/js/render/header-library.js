import { refs } from '../general/refs';

refs.libraryPageLink.addEventListener('click', clickLibraryPage);

function clickLibraryPage() {
  refs.libraryBtnList.classList.remove('visually-hidden');
  refs.homePageLink.classList.remove('current');
  refs.libraryPageLink.classList.add('current');
  refs.searchFormBtn.classList.add('visually-hidden');
  refs.searchFormNotification.classList.add('visually-hidden');
  refs.galleryHome.forEach(item => item.classList.add('visually-hidden'));
  refs.header.classList.add('header-library');
  // refs.formWrapper.classList.remove('visually-hidden');
};