import { gsap } from "gsap";

export default function initContact() {
    function handleFormSubmission(event) {
        event.preventDefault();

        const form = event.target;
        const successBox = document.getElementById("successMessage");
        const failureBox = document.getElementById("failureMessage");

        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                form.reset();
                showMessage(successBox);
            } else {
                showMessage(failureBox);
            }
        }).catch(() => {
            showMessage(failureBox);
        });
    }

    function showMessage(box) {
        const contactForm = document.querySelector(".contact-form");

        box.classList.add("show");
        contactForm.classList.add("blur");

        setTimeout(() => {
            box.classList.remove("show");
            contactForm.classList.remove("blur");
        }, 3000);
    }

    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmission);
    }

    const leftFields = document.querySelectorAll("#contact .form-div.left");
    const rightFields = document.querySelectorAll("#contact .form-div.right");
    const contactSection = document.querySelector("#contact");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(leftFields, {
                    x: "0%",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1
                });

                gsap.to(rightFields, {
                    x: "0%",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1
                });
            } else {
                gsap.to(leftFields, {
                    x: "-60%",
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.inOut"
                });

                gsap.to(rightFields, {
                    x: "60%",
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.inOut"
                });
            }
        });
    }, { threshold: 0.4 });

    observer.observe(contactSection);
}