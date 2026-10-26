// ==========================================
// Romantic Proposal Interaction for Zariya ❤️
// ==========================================

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtnText = document.getElementById('noBtnText');
const questionCard = document.getElementById('questionCard');
const celebrationCard = document.getElementById('celebrationCard');
const teaseBox = document.getElementById('teaseBox');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicText = document.getElementById('musicText');
const replayConfettiBtn = document.getElementById('replayConfettiBtn');
const screenshotTipBtn = document.getElementById('screenshotTipBtn');

let noAttempts = 0;
let yesScale = 1;

// Playful teasing prompts when she tries to click "No"
const teaseMessages = [
  "Wait, are you sure? 🥺",
  "Think again, my misty madam! 🌸",
  "Error 404: 'No' is unavailable! 😜",
  "You cannot escape my love, Zariya! 💖",
  "Look how big the YES button is getting! 👉",
  "Pretty please with roses on top? 🌹",
  "No is permanently out of service! 🙈",
  "Destiny has already chosen YES! 💍✨",
  "Just surrender to love! 🥰",
  "Forever yours, no other choice! ❤️"
];

const noButtonLabels = [
  "No?",
  "Really?",
  "Think twice!",
  "Try again!",
  "Nope! 😜",
  "Nice try!",
  "Almost! 🏃‍♂️",
  "Can't touch this!",
  "YES is better! 👉",
  "Give up! ❤️"
];

// ------------------------------------------
// Web Audio API Synthesizer (Zero broken audio URLs)
// ------------------------------------------
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle romantic chime / note
function playTone(freq, duration = 0.3, type = 'sine', gainVal = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(gainVal, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// Playful pop sound when 'No' runs away
function playBoingSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(260 + Math.random() * 80, now);
  osc.frequency.exponentialRampToValueAtTime(540, now + 0.18);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(now + 0.18);
}

// Romantic music melody loop (Canon / Romantic Music Box)
const romanticMelody = [
  { f: 523.25, d: 0.4 }, // C5
  { f: 659.25, d: 0.4 }, // E5
  { f: 783.99, d: 0.4 }, // G5
  { f: 659.25, d: 0.4 }, // E5
  { f: 880.00, d: 0.6 }, // A5
  { f: 783.99, d: 0.4 }, // G5
  { f: 659.25, d: 0.6 }, // E5
  { f: 587.33, d: 0.4 }, // D5
  { f: 523.25, d: 0.6 }, // C5
  { f: 587.33, d: 0.4 }, // D5
  { f: 659.25, d: 0.8 }, // E5
  { f: 523.25, d: 0.8 }, // C5
];

let melodyStep = 0;
function playNextMelodyNote() {
  if (!isMusicPlaying) return;
  const note = romanticMelody[melodyStep % romanticMelody.length];
  playTone(note.f, note.d * 1.5, 'sine', 0.12);
  melodyStep++;
}

function startRomanticMusic() {
  getAudioContext();
  isMusicPlaying = true;
  musicToggleBtn.classList.add('playing');
  musicText.textContent = "Music: Playing 💖";
  if (musicInterval) clearInterval(musicInterval);
  playNextMelodyNote();
  musicInterval = setInterval(playNextMelodyNote, 550);
}

function stopRomanticMusic() {
  isMusicPlaying = false;
  musicToggleBtn.classList.remove('playing');
  musicText.textContent = "Play Music 🎵";
  if (musicInterval) clearInterval(musicInterval);
}

musicToggleBtn.addEventListener('click', () => {
  if (isMusicPlaying) {
    stopRomanticMusic();
  } else {
    startRomanticMusic();
  }
});

// ------------------------------------------
// Runaway "No" Button Logic
// ------------------------------------------
function moveNoButton(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  noAttempts++;
  playBoingSound();

  // Make sure it has moving class
  if (!noBtn.classList.contains('is-moving')) {
    noBtn.classList.add('is-moving');
  }

  // Calculate safe boundary inside viewport
  const btnWidth = noBtn.offsetWidth || 120;
  const btnHeight = noBtn.offsetHeight || 50;
  const padding = 25;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Scale up the Yes button with each attempt
  yesScale += 0.08;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Update Tease text
  const messageIdx = Math.min(noAttempts - 1, teaseMessages.length - 1);
  teaseBox.textContent = teaseMessages[messageIdx];
  teaseBox.classList.add('visible');

  // Update button text
  const labelIdx = Math.min(noAttempts - 1, noButtonLabels.length - 1);
  noBtnText.textContent = noButtonLabels[labelIdx];

  // Spawn mini hearts at the old position
  spawnFloatingHeart(randomX + btnWidth / 2, randomY + btnHeight / 2);
}

// Multiple events so it runs away on hover, touch, or click
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton, { passive: false });
noBtn.addEventListener('pointerdown', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// ------------------------------------------
// "YES!" Button Celebration
// ------------------------------------------
yesBtn.addEventListener('click', () => {
  // Hide question card, show celebration
  questionCard.classList.add('hidden');
  celebrationCard.classList.remove('hidden');

  // Hide the runaway button completely if it was displaced
  noBtn.style.display = 'none';

  // Start romantic music if not already playing
  if (!isMusicPlaying) {
    startRomanticMusic();
  }

  // Grand celebration confetti explosion
  launchCelebrationConfetti();
});

// Confetti waves
function launchCelebrationConfetti() {
  if (typeof confetti !== 'function') return;

  // Wave 1: Immediate big heart explosion
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff4b72', '#ff809b', '#ffccd7', '#ffd700', '#ffffff'],
    scalar: 1.2
  });

  // Wave 2: Left and right cannons
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: ['#ff416c', '#ff4b72', '#ffffff']
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: ['#ff416c', '#ff4b72', '#ffffff']
    });
  }, 250);

  // Wave 3: Continuous gentle rainfall of sparkles
  const end = Date.now() + 2500;
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 80,
      origin: { x: Math.random(), y: 0 },
      colors: ['#ff4b72', '#ffaec0', '#ffd700']
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

replayConfettiBtn.addEventListener('click', () => {
  launchCelebrationConfetti();
});

screenshotTipBtn.addEventListener('click', () => {
  launchCelebrationConfetti();
  alert("Take a screenshot or screen recording right now and send it to your special someone! 💍❤️");
});

// ------------------------------------------
// Floating Hearts Canvas Background
// ------------------------------------------
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingHeart {
  constructor(x, y, size, speed, opacity) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || canvas.height + Math.random() * 50;
    this.size = size || Math.random() * 16 + 10;
    this.speed = speed || Math.random() * 1.2 + 0.6;
    this.opacity = opacity || Math.random() * 0.5 + 0.2;
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.03 + 0.01;
    this.angle = 0;
  }

  update() {
    this.y -= this.speed;
    this.angle += this.swingSpeed;
    this.x += Math.sin(this.angle) * this.swing;

    if (this.y < -30) {
      this.y = canvas.height + 20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff4b72';

    // Draw heart path
    ctx.beginPath();
    const d = this.size;
    ctx.moveTo(0, -d / 4);
    ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d);
    ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 4);
    ctx.fill();
    ctx.restore();
  }
}

// Initialize particles
for (let i = 0; i < 28; i++) {
  hearts.push(new FloatingHeart(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  ));
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Spawn interactive heart on click anywhere
function spawnFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'interactive-heart';
  heart.textContent = '💖';
  heart.style.position = 'fixed';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${Math.random() * 16 + 20}px`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '99999';
  heart.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
  heart.style.transform = 'translate(-50%, -50%) scale(1)';
  heart.style.opacity = '1';

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(-50%, -${80 + Math.random() * 60}px) scale(1.4) rotate(${Math.random() * 40 - 20}deg)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => heart.remove(), 1000);
}

window.addEventListener('click', (e) => {
  // Avoid duplicate if clicking buttons directly
  if (e.target.tagName !== 'BUTTON') {
    spawnFloatingHeart(e.clientX, e.clientY);
  }
});
