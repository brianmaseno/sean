const revealElements = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -6% 0px",
  }
);

revealElements.forEach((element) => observer.observe(element));

const sparks = document.querySelectorAll(".spark");
window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  sparks.forEach((spark, index) => {
    const shift = (index + 1) * 6;
    spark.style.transform = `translate(${x * shift}px, ${y * shift}px)`;
  });
});

// ── Background Audio ──────────────────────────────────────────
const bgAudio = document.getElementById("bg-audio");
bgAudio.volume = 0.65;

// Always try to play on load and on visibility change (for refresh)
function tryPlayAudio() {
  bgAudio.currentTime = 0;
  bgAudio.play().catch(() => {});
}
window.addEventListener("DOMContentLoaded", tryPlayAudio);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") tryPlayAudio();
});

// Also play on first user interaction as fallback
["click", "touchstart", "scroll", "keydown", "mousemove"].forEach((e) => {
  document.addEventListener(e, tryPlayAudio, { once: true, passive: true });
});
