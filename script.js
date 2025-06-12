// Love Counter
const ourAnniversary = new Date('2024-08-09T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - ourAnniversary;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days-counter').textContent = days;
    document.getElementById('hours-counter').textContent = hours;
    document.getElementById('minutes-counter').textContent = minutes;
    document.getElementById('seconds-counter').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// Music Player
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        isPlaying = false;
    } else {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        isPlaying = true;
    }
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

function updateDuration() {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    durationSpan.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

playBtn.addEventListener('click', togglePlay);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', () => {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    isPlaying = false;
    progressBar.style.width = '0%';
});

// Floating Hearts Animation
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const colors = ['#fecaca', '#fda4af', '#fb7185', '#f43f5e'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        const size = Math.random() * 20 + 10;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        
        heart.style.left = `${left}%`;
        heart.style.color = colors[colorIndex];
        heart.style.fontSize = `${size}px`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
});