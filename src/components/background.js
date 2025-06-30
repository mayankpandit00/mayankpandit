export default function initMatrixRain() {
    const bgCanvas = document.getElementById('backgroundCanvas');
    const ctx = bgCanvas.getContext('2d');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'.split('');
    const fontSize = window.innerWidth <= 480 ? 6 : 10;
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    let columns, drops;

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        bgCanvas.width = width * dpr;
        bgCanvas.height = height * dpr;
        bgCanvas.style.width = width + 'px';
        bgCanvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Math.floor(bgCanvas.width / dpr / fontSize) + 2;

        if (window.innerWidth <= 480) {
            columns = Math.floor(columns * 1.5);
        }

        drops = new Float32Array(columns);
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * (bgCanvas.height / fontSize);
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getRandomLetter = () => letters[(Math.random() * letters.length) | 0];

    function draw() {
        ctx.fillStyle = 'rgba(20, 20, 20, .1)';
        ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

        for (let i = 0; i < drops.length; i++) {
            const text = getRandomLetter();
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = '#00CC00';
            ctx.fillText(text, x, y);

            if (y > bgCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        }
    }

    const targetFPS = 16;
    const frameDelay = 1000 / targetFPS;
    let lastFrame = 0;

    function loop(timestamp) {
        if (timestamp - lastFrame > frameDelay) {
            draw();
            lastFrame = timestamp;
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}
