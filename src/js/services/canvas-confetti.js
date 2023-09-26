import confetti from 'canvas-confetti';

export default function showConfetti() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  });

  const defaults = {
    origin: { x: 0.5, y: 1 },
    spread: 180,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FF6B08', 'FF001B']
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
  setTimeout(shoot, 800);
  setTimeout(shoot, 1200);
};