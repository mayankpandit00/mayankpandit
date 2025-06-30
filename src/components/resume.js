import { gsap } from "gsap";

export default function initResume() {
    const resumeSection = document.getElementById("resume");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(resumeSection, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.inOut"
                });
            } else {
                gsap.to(resumeSection, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.inOut"
                });
            }
        });
    }, { threshold: 0.1 });

    observer.observe(resumeSection);

    const gallery = document.querySelector('.resume-section-gallery-middle-top');
    const certImages = gallery.querySelectorAll('img');
    const leftBtn = document.querySelector('.resume-section-gallery-left span');
    const rightBtn = document.querySelector('.resume-section-gallery-right span');
    const thumbnails = document.querySelectorAll('.resume-section-gallery-middle-bottom img');

    let currentIndex = 0;
    const imageWidth = () => certImages[0]?.offsetWidth || 0;


    function updateActiveThumbnail(index) {
        currentIndex = (index + certImages.length) % certImages.length;

        certImages.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('selected', i === currentIndex);
        });
    }

    function scrollToIndex(index) {
        currentIndex = (index + certImages.length) % certImages.length;
        gallery.scrollTo({
            left: currentIndex * imageWidth(),
            behavior: 'smooth'
        });

        certImages.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('selected', i === currentIndex);
        })
    }

    rightBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex + 1);
    });

    leftBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex - 1);
    });

    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            scrollToIndex(i);
        });
    });

    gallery.addEventListener('scroll', () => {
        const scrollLeft = gallery.scrollLeft;
        const index = Math.round(scrollLeft / imageWidth());
        updateActiveThumbnail(index);
    });

    scrollToIndex(currentIndex);
}