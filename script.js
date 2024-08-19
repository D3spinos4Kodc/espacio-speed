const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height, halfWidth, halfHeight;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    halfWidth = width / 2;
    halfHeight = height / 2;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const points = [];
const numPoints = 5;
const waveHeight = 150;

for (let i = 0; i < numPoints; i++) {
    const x = i * (width / (numPoints - 1));
    const y = halfHeight;
    points.push({ x, y, originY: y });
}

function drawWave() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
        const cx = (points[i].x + points[i + 1].x) / 2;
        const cy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
    }

    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = '#00FFFF';
    ctx.fill();
}

function animateWave() {
    gsap.to(points, {
        duration: 2,
        y: i => points[i].originY + Math.sin(i * 0.3 + performance.now() / 1000) * waveHeight,
        ease: 'power1.inOut',
        onUpdate: drawWave,
        onComplete: animateWave
    });
}

animateWave();