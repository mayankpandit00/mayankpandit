import { bouncy } from 'ldrs';

function setResponsiveBouncySize() {
  const bouncy = document.getElementById('bouncy');
  const size = getComputedStyle(document.documentElement)
    .getPropertyValue('--bouncy-size')
    .trim();
  bouncy.setAttribute('size', size);
}

export default function initLoader() {
  bouncy.register();

  setResponsiveBouncySize();
  window.addEventListener('resize', setResponsiveBouncySize);

  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('mainContent');

    setTimeout(() => {
      loader.classList.add('fade-out');

      setTimeout(() => {
        loader.style.display = 'none';
        content.classList.remove('hidden');
        content.classList.add('visible');
      }, 800);
    }, 1500);
  });
}
