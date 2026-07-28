/* ================================
   1. BACA NAMA TAMU DARI URL
   ================================ */
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
document.getElementById('guestName').innerText = guest ? guest : "Tamu Undangan";

/* ================================
   2. BUKA UNDANGAN & MUSIK
   ================================ */
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = musicBtn.querySelector('i');
let isPlaying = false;
let isInvitationOpen = false;

function openInvitation() {
    document.getElementById('cover-page').style.top = '-100vh';
    document.body.style.overflow = 'auto';
    document.getElementById('main-content').style.display = 'block';
    isInvitationOpen = true; 

    setTimeout(() => {
        document.getElementById('cover-page').style.display = 'none';
        musicBtn.style.display = 'flex';
    }, 1000);

    playMusic();
}

function playMusic() {
    music.play().then(() => {
        isPlaying = true;
        musicIcon.classList.add('fa-spin');
    }).catch(e => console.log("Autoplay dicegah browser"));
}

function toggleMusic() {
    if(isPlaying) {
        music.pause();
        musicIcon.classList.remove('fa-spin', 'fa-compact-disc');
        musicIcon.classList.add('fa-volume-mute');
    } else {
        music.play();
        musicIcon.classList.add('fa-spin', 'fa-compact-disc');
        musicIcon.classList.remove('fa-volume-mute');
    }
    isPlaying = !isPlaying;
}

/* ================================
   3. SCROLL MENU BAWAH & VISIBILITY (TAB)
   ================================ */
const bottomNav = document.getElementById('bottom-nav');

window.addEventListener('scroll', function() {
    if (isInvitationOpen && window.scrollY > 100) {
        bottomNav.classList.add('show');
    } else {
        bottomNav.classList.remove('show');
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) { music.pause(); } 
    else if (isPlaying) { music.play(); }
});

/* ================================
   4. LIGHTBOX GALERI (POP-UP)
   ================================ */
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('show');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== document.getElementById('lightbox-img')) closeLightbox();
});

/* ================================
   5. COUNTDOWN TIMER
   ================================ */
const weddingDate = new Date("2026-08-11T08:00:00+08:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.countdown').innerHTML = "<h3>Acara Sedang Berlangsung / Selesai</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60Normally I can help with things like this, but I don't seem to have access to that content. You can try again or ask me for something else.
