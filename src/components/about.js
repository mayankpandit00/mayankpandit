import { gsap } from "gsap";

export default function initAbout() {
  const terminal = document.querySelector("#about .terminal-container");
  const section = document.querySelector("#about");

  if (!terminal || !section) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(terminal, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        gsap.to(terminal, {
          scale: 0.2,
          opacity: 0.3,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
}
