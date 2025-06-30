import {
  Chart,
  RadarController,       
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function initHome() {
    function getFontSize() {
        if (window.innerWidth <= 412) return 10;
        if (window.innerWidth <= 768) return 12;
        if (window.innerWidth <= 1024) return 14;
        return 16;
    }

    function initRadarChart() {
        const canvas = document.getElementById('skillsRadar');
        if (!canvas) return;

        const radarCtx = canvas.getContext('2d');

        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: [
                    ['Programming'],
                    ['Defensive', 'Security'],
                    ['Strategic', 'Thinking'],
                    ['Networking'],
                    ['Continuous', 'Learning'],
                    ['Offensive', 'Security']
                ],
                datasets: [{
                    data: [9.3, 9.4, 9.2, 9.1, 9.0, 9.4],
                    fill: true,
                    backgroundColor: 'rgba(50, 205, 50, 0.3)',
                    borderColor: '#00cc00',
                    pointBackgroundColor: '#00cc00',
                    pointBorderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 10,
                        angleLines: { color: 'gray' },
                        grid: { color: 'gray' },
                        pointLabels: {
                            color: 'white',
                            font: {
                                size: getFontSize(),
                                family: "'Courier New', monospace"
                            }
                        },
                        ticks: {
                            stepSize: 2,
                            color: 'lightgray',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    function animateCircles() {
        const circles = document.querySelectorAll('.circle');
        if (!circles.length) return;

        circles.forEach(circle => {
            const percent = parseInt(circle.dataset.percent);
            const countTo = parseInt(circle.dataset.count);
            const suffix = circle.dataset.suffix || '';
            const progress = circle.querySelector('.progress');
            const number = circle.querySelector('.number');

            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (percent / 100) * circumference;
            progress.style.strokeDashoffset = circumference;

            setTimeout(() => {
                progress.style.transition = 'stroke-dashoffset 2s ease';
                progress.style.strokeDashoffset = offset;
            }, 500);

            setTimeout(() => {
                let count = 0;
                const step = Math.ceil(countTo / 50);
                const interval = setInterval(() => {
                    count += step;
                    if (count >= countTo) {
                        count = countTo;
                        clearInterval(interval);
                    }
                    number.textContent = count + suffix;
                }, 50);
            }, 500);
        });
    }
    
    setTimeout(() => {
        initRadarChart();
    animateCircles();
    }, 2500);
}
