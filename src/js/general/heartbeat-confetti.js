import { refs } from './refs';
import showConfetti from '../services/canvas-confetti';

refs.heartbeatConfetti.addEventListener('click', onClickHeartToShowConfetti);

function onClickHeartToShowConfetti() {
  showConfetti();
};