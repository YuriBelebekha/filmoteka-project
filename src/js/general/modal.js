import { refs } from './refs';

refs.closeModalBtn.addEventListener('click', closeModal, { passive: true });

refs.backdrop.addEventListener('click', (e) => {
  const click = e.composedPath()[0];

  if (click === refs.backdrop) {
    closeModal();
  };
}, { passive: true });

refs.galleryHome.addEventListener('click', function (e) {
  
  const galleryHomeClassName = refs.galleryHome.className;
  const emptyArea = e.target.className === galleryHomeClassName;
  const clickedElement = e.target.closest('[data-modal-open-path]');

  if (emptyArea) {
    return;
  };

  if (clickedElement) {
    let target = clickedElement.dataset.modalOpenPath;
    let modalContainer = document.querySelector(`[data-modal-open-target="${target}"]`);

    refs.body.forEach(target => target.classList.add('no-scroll'));
    modalContainer.classList.add('is-open');
    refs.modal.classList.remove('is-hidden');
    return;
  };
}, { passive: true });

document.addEventListener('keydown', (e) => {   
  if (e.code === 'Escape') {   
    closeModal();
  };
}, { passive: true });

function closeModal() {
  refs.body.forEach(target => target.classList.remove('no-scroll'));
  refs.modalContainer.forEach(item => { item.classList.remove('is-open') });
  refs.modal.classList.add('is-hidden');
  refs.modalContainer.forEach(item => item.innerHTML = '');
  refs.playBtn.classList.add('is-hidden');
};