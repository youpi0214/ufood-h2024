import confetti from "canvas-confetti";

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 },
  });
}
