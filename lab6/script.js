const ball = document.getElementById('ball');
const hole = document.getElementById('hole');
const startButton = document.getElementById('startButton');
const timerDisplay = document.getElementById('timer');
const recordsDisplay = document.getElementById('records');

let ballX = 140, ballY = 140;
let holeX, holeY;
let startTime, endTime;
let isGameActive = false;
let records = [];

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}

function startGame() {
  holeX = randomPosition(270);
  holeY = randomPosition(270);
  hole.style.left = `${holeX}px`;
  hole.style.top = `${holeY}px`;

  ballX = 140;
  ballY = 140;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  isGameActive = true;
  startTime = performance.now();
  timerDisplay.textContent = "Time: 0s";

  window.addEventListener('deviceorientation', handleOrientation);

  requestAnimationFrame(updateGame);
}

function handleOrientation(event) {
  if (!isGameActive) return;
  const { beta, gamma } = event;
  const maxTilt = 45;

  ballX += (gamma / maxTilt) * 2;
  ballY += (beta / maxTilt) * 2;

  if (ballX < 0) ballX = 0;
  if (ballX > 280) ballX = 280;
  if (ballY < 0) ballY = 0;
  if (ballY > 280) ballY = 280;

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

function updateGame() {
  if (!isGameActive) return;

  const currentTime = performance.now();
  const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
  timerDisplay.textContent = `Time: ${elapsedTime}s`;

  if (isCollision()) {
    isGameActive = false;
    endTime = performance.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    records.push(timeTaken);
    recordsDisplay.textContent = `Records: ${records.join(', ')}s`;
    window.removeEventListener('deviceorientation', handleOrientation);
  } else {
    requestAnimationFrame(updateGame);
  }
}

function isCollision() {
  const dx = ballX - holeX;
  const dy = ballY - holeY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 25;
}

startButton.addEventListener('click', startGame);
