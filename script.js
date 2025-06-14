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

// Configuração do Audio Player
let audioPlayer;
let isPlaying = false;
let currentTime = 0;
let duration = 0;

// Informações da música
const songInfo = {
    title: 'Nossa Música Especial',
    artist: 'Para você ❤️'
};

// Remover loading screen imediatamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    // Remover loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Reduzido para 1 segundo
    }
    
    // Inicializar contador
    updateCounter();
    setInterval(updateCounter, 1000);
    
    // Inicializar o player de áudio
    initializeAudioPlayer();
    
    // Player controls
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', playPause);
        console.log('Event listener do play adicionado');
    }
    
    // Progress bar click
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            if (audioPlayer && duration > 0) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const seekTime = duration * percentage;
                audioPlayer.currentTime = seekTime;
            }
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Photo modal
    initPhotoModal();
    
    // Memory modal
    initMemoryModal();
    
    // Back to top button
    initBackToTop();
    
    // Share and print buttons
    const shareBtn = document.getElementById('share-btn');
    const printBtn = document.getElementById('print-btn');
    if (shareBtn) shareBtn.addEventListener('click', shareContent);
    if (printBtn) printBtn.addEventListener('click', printContent);
    
    // Heart click effect
    const mainHeart = document.getElementById('main-heart');
    if (mainHeart) {
        mainHeart.addEventListener('click', createHeartBurst);
    }
    
    // Smooth scrolling
    initSmoothScrolling();

    // Floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        const container = document.getElementById('hearts-container');
        if (container) {
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 25000);
        }
    }
    
    setInterval(createHeart, 3000);
});

function initializeAudioPlayer() {
    // Criar elemento de áudio
    audioPlayer = new Audio('musica.mp3');
    audioPlayer.preload = 'metadata';
    
    // Event listeners do áudio
    audioPlayer.addEventListener('loadedmetadata', function() {
        duration = audioPlayer.duration;
        updateSongInfo();
        updateTimeDisplay();
        console.log('Áudio carregado, duração:', duration);
    });
    
    audioPlayer.addEventListener('timeupdate', function() {
        currentTime = audioPlayer.currentTime;
        updateTimeDisplay();
    });
    
    audioPlayer.addEventListener('play', function() {
        isPlaying = true;
        document.getElementById('play-icon').className = 'fas fa-pause';
        console.log('Música tocando');
    });
    
    audioPlayer.addEventListener('pause', function() {
        isPlaying = false;
        document.getElementById('play-icon').className = 'fas fa-play';
        console.log('Música pausada');
    });
    
    audioPlayer.addEventListener('ended', function() {
        isPlaying = false;
        document.getElementById('play-icon').className = 'fas fa-play';
        audioPlayer.currentTime = 0;
        console.log('Música terminou');
    });
    
    audioPlayer.addEventListener('error', function(e) {
        console.error('Erro ao carregar o áudio:', e);
        alert('Erro ao carregar a música. Verifique se o arquivo musica.mp3 existe na pasta.');
    });
}

function updateSongInfo() {
    document.getElementById('song-title').textContent = songInfo.title;
    document.getElementById('song-artist').textContent = songInfo.artist;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
    document.getElementById('current-time').textContent = formatTime(currentTime);
    document.getElementById('duration').textContent = formatTime(duration);
    
    if (duration > 0) {
        const progress = (currentTime / duration) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }
}

function playPause() {
    console.log('Botão play/pause clicado');
    
    if (!audioPlayer) {
        console.log('Player não está disponível');
        alert('Player não está disponível. Recarregue a página.');
        return;
    }
    
    try {
        if (isPlaying) {
            audioPlayer.pause();
            console.log('Tentando pausar');
        } else {
            audioPlayer.play().catch(function(error) {
                console.error('Erro ao tocar:', error);
                alert('Erro ao tocar a música. Talvez seja necessário interagir com a página primeiro.');
            });
            console.log('Tentando tocar');
        }
    } catch (error) {
        console.error('Erro ao controlar o player:', error);
    }
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#theme-toggle i');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Photo modal
function initPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo');
    const photos = document.querySelectorAll('.photo-frame');
    
    if (!modal || !modalImg || photos.length === 0) return;
    
    const closeBtn = modal.querySelector('.close');
    let currentPhotoIndex = 0;
    
    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            currentPhotoIndex = index;
            showPhoto(index);
            modal.style.display = 'flex';
        });
    });
    
    function showPhoto(index) {
        const img = photos[index].querySelector('img');
        if (img) {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        }
    }
    
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            showPhoto(currentPhotoIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            showPhoto(currentPhotoIndex);
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// Memory modal
function initMemoryModal() {
    const modal = document.getElementById('memory-modal');
    const content = document.getElementById('memory-content');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    if (!modal || !content) return;
    
    const closeBtn = modal.querySelector('.close');
    
    const memories = {
        1: {
            title: 'Nosso Primeiro Beijo',
            content: 'Foi em uma tarde de domingo, depois de muito papo e risadas. O momento foi tão natural e especial que ainda sinto borboletas no estômago quando lembro. Você estava linda naquele dia, e quando nossos olhos se encontraram, soube que era a hora. Foi perfeito, doce e cheio de amor.'
        },
        2: {
            title: 'Nossas Risadas',
            content: 'Lembro de todas as vezes que rimos juntos até a barriga doer. Seja por causa de uma piada boba, um meme engraçado ou simplesmente pela alegria de estarmos juntos. Sua risada é contagiante e sempre consegue alegrar meu dia, mesmo nos momentos mais difíceis.'
        },
        3: {
            title: 'Nosso Apoio',
            content: 'Nos momentos em que a vida se tornou mais desafiadora, você sempre esteve lá. Seja com uma palavra de conforto, um abraço apertado ou simplesmente sua presença silenciosa. Juntos somos mais fortes, e sei que posso contar com você para tudo.'
        }
    };
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const memoryCard = e.target.closest('.memory-card');
            const memoryId = memoryCard.dataset.memory;
            const memory = memories[memoryId];
            
            if (memory) {
                content.innerHTML = `
                    <h2>${memory.title}</h2>
                    <p>${memory.content}</p>
                `;
                
                modal.style.display = 'flex';
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// Back to top
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Share content
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Nosso Amor - Dia dos Namorados',
            text: 'Uma declaração de amor especial',
            url: window.location.href
        });
    } else {
        // Copiar URL para clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Print content
function printContent() {
    window.print();
}

// Heart burst effect
function createHeartBurst() {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'burst-heart';
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const mainHeart = document.getElementById('main-heart');
        if (mainHeart) {
            const rect = mainHeart.getBoundingClientRect();
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(heart);
            
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 100;
            
            heart.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                heart.remove();
            };
        }
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
    }
}