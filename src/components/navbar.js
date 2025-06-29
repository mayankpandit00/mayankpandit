import { lenis } from './scroller.js';

export default function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll(".section");
    const navButtons = document.querySelectorAll(".nav-button")
    const homeSection = document.getElementById('home');

    const navVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                navbar.classList.add('nav-visible');
            } else {
                navbar.classList.remove('nav-visible');
            }
        });
    }, { threshold: 0.9 });

    if (homeSection) navVisibilityObserver.observe(homeSection);

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navButtons.forEach((btn) => {
                    btn.classList.toggle("active", btn.dataset.target === targetId);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    const original = "MAYANK PANDIT";
    const shift = 4;
    const holdTime = 2000;
    const animationTime = 1000;
    const container = document.getElementById("cipher");

    function caesarShiftChar(char, amount) {
        if (char === ' ') return char;
        const base = 'A'.charCodeAt(0);
        const charCode = char.charCodeAt(0) - base;
        return String.fromCharCode(((charCode + amount + 26) % 26) + base);
    }

    function getCycleChars(fromChar, toChar) {
        if (fromChar === ' ') return [' '];
        const base = 'A'.charCodeAt(0);
        let fromCode = fromChar.charCodeAt(0) - base;
        const toCode = toChar.charCodeAt(0) - base;
        const chars = [];
        let steps = (toCode - fromCode + 26) % 26;
        for (let i = 0; i <= steps; i++) {
            chars.push(String.fromCharCode(((fromCode + i) % 26) + base));
        }
        return chars;
    }

    function getCycleCharsBackward(fromChar, toChar) {
        if (fromChar === ' ') return [' '];
        const base = 'A'.charCodeAt(0);
        let fromCode = fromChar.charCodeAt(0) - base;
        const toCode = toChar.charCodeAt(0) - base;
        const chars = [];

        let steps = (fromCode - toCode + 26) % 26;
        for (let i = 0; i <= steps; i++) {
            chars.push(String.fromCharCode(((fromCode - i + 26) % 26) + base));
        }
        return chars;
    }

    function showText(text) {
        container.innerHTML = '';
        for (const ch of text) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            container.appendChild(span);
        }
    }

    function showText(text) {
        const fragment = document.createDocumentFragment();

        for (const ch of text) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            fragment.appendChild(span);
        }

        container.replaceChildren(fragment);
    }

    async function animateCycle(cycleArrays, onFinish) {
        container.innerHTML = '';
        const spans = [];

        for (let i = 0; i < cycleArrays.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = cycleArrays[i][0] === ' ' ? '\u00A0' : cycleArrays[i][0];
            container.appendChild(span);
            spans.push(span);
        }

        const maxStartDelay = 300;
        const promises = spans.map((span, i) => {
            const chars = cycleArrays[i];
            if (chars.length === 1) return Promise.resolve();

            const steps = chars.length;
            const delayPerStep = (animationTime - maxStartDelay) / steps;
            const startDelay = Math.random() * maxStartDelay;

            return new Promise(resolve => {
                setTimeout(() => {
                    let stepIndex = 0;
                    const interval = setInterval(() => {
                        span.textContent = chars[stepIndex] === ' ' ? '\u00A0' : chars[stepIndex];
                        stepIndex++;
                        if (stepIndex >= steps) {
                            clearInterval(interval);
                            resolve();
                        }
                    }, delayPerStep);
                }, startDelay);
            });
        });

        await Promise.all(promises);
        onFinish && onFinish();
    }

    async function loop() {
        while (true) {
            showText(original);
            await sleep(holdTime);

            const forwardCycles = [];
            for (let i = 0; i < original.length; i++) {
                forwardCycles.push(getCycleChars(original[i], caesarShiftChar(original[i], shift)));
            }
            await animateCycle(forwardCycles);

            showText(createCiphered(original, shift));
            await sleep(holdTime);

            const backwardCycles = [];
            for (let i = 0; i < original.length; i++) {
                backwardCycles.push(getCycleCharsBackward(createCiphered(original, shift)[i], original[i]));
            }
            await animateCycle(backwardCycles);
        }
    }

    function createCiphered(str, amount) {
        return str.split('').map(c => caesarShiftChar(c, amount)).join('');
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loop();

    document.querySelectorAll('.nav-button[data-target], .home-buttons-button[data-target]').forEach(btn => {
        btn.addEventListener('click', function () {
            const target = document.getElementById(this.getAttribute('data-target'));
            if (target) lenis.scrollTo(target);
        });
    });
}
