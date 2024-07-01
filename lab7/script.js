document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const ballCountInput = document.getElementById('ballCount');
    const ballCountValue = document.getElementById('ballCountValue');
    const maxDistanceInput = document.getElementById('maxDistance');
    const forceStrengthInput = document.getElementById('forceStrength');
    const forceStrengthValue = document.getElementById('forceStrengthValue');

    let balls = [];
    let animationId;
    let mousePos = { x: 0, y: 0 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Ball {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.radius = 5;

            canvas.addEventListener('click', (e) => {
                if (Math.hypot(e.offsetX - this.x, e.offsetY - this.y) < this.radius) {
                    this.split();
                }
            });
        }

        split() {
            balls = balls.filter(ball => ball !== this);
            balls.push(new Ball(random(0, canvas.width), random(0, canvas.height), random(-2, 2), random(-2, 2)));
            balls.push(new Ball(random(0, canvas.width), random(0, canvas.height), random(-2, 2), random(-2, 2)));
        }

        move() {
            const dist = Math.hypot(this.x - mousePos.x, this.y - mousePos.y);
            const forceStrength = parseFloat(forceStrengthInput.value);

            if (dist < 100) {
                const angle = Math.atan2(this.y - mousePos.y, this.x - mousePos.x);
                this.vx += (forceStrength / dist) * Math.cos(angle);
                this.vy += (forceStrength / dist) * Math.sin(angle);
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgb(0, 214, 143, 0.8)';
            ctx.fill();
        }
    }

    function drawLine(ball1, ball2) {
        ctx.beginPath();
        ctx.moveTo(ball1.x, ball1.y);
        ctx.lineTo(ball2.x, ball2.y);
        ctx.strokeStyle = 'rgb(0, 214, 143, 0.4)';
        ctx.stroke();
    }

    function createBalls(count) {
        balls = [];
        for (let i = 0; i < count; i++) {
            const x = random(0, canvas.width);
            const y = random(0, canvas.height);
            const vx = random(-2, 2);
            const vy = random(-2, 2);
            balls.push(new Ball(x, y, vx, vy));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const maxDistance = (maxDistanceInput.value / 100) * canvas.width;

        balls.forEach(ball => ball.move());
        balls.forEach(ball => ball.draw());

        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const dist = Math.hypot(balls[i].x - balls[j].x, balls[i].y - balls[j].y);
                if (dist < maxDistance) {
                    drawLine(balls[i], balls[j]);
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    ballCountInput.addEventListener('input', () => {
        ballCountValue.textContent = ballCountInput.value;
    });

    forceStrengthInput.addEventListener('input', () => {
        forceStrengthValue.textContent = forceStrengthInput.value;
    });

    startBtn.addEventListener('click', () => {
        if (animationId) cancelAnimationFrame(animationId);
        createBalls(parseInt(ballCountInput.value, 10));
        animate();
    });

    resetBtn.addEventListener('click', () => {
        if (animationId) cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    canvas.addEventListener('mousemove', (e) => {
        mousePos = { x: e.offsetX, y: e.offsetY };
    });

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
});
