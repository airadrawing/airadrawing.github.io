/* ================================
   0. BACA NAMA TAMU DARI URL
   ================================ */
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
const guestNameElement = document.getElementById('guestName');

if (guest) {
    guestNameElement.innerText = guest;
} else {
    guestNameElement.innerText = "Tamu Undangan"; 
}

/* ================================
   1. KONTROL UNDANGAN & MUSIK
   ================================ */
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = musicBtn.querySelector('i');
let isPlaying = false;
let isInvitationOpen = false;

function openInvitation() {
    const cover = document.getElementById('cover-page');
    cover.style.top = '-100vh';
    
    document.body.style.overflow = 'auto';
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';
    isInvitationOpen = true; // Tandai bahwa undangan sudah dibuka

    setTimeout(() => {
        cover.style.display = 'none';
        musicBtn.style.display = 'flex';
        // BOTTOM NAV TIDAK DIMUNCULKAN DI SINI (Menunggu Scroll)
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
   2. SCROLL UNTUK MUNCULKAN MENU (BARU)
   ================================ */
const bottomNav = document.getElementById('bottom-nav');

window.addEventListener('scroll', function() {
    // Jika undangan sudah dibuka dan user men-scroll lebih dari 100px ke bawah
    if (isInvitationOpen && window.scrollY > 100) {
        bottomNav.classList.add('show');
    } else {
        bottomNav.classList.remove('show');
    }
});

/* ================================
   3. VISIBILITY API (MATIKAN MUSIK SAAT PINDAH TAB)
   ================================ */
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        music.pause();
    } else {
        if (isPlaying) { music.play(); }
    }
});

/* ================================
   4. LIGHTBOX GALERI
   ================================ */
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('show');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('show'); }
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== document.getElementById('lightbox-img')) { closeLightbox(); }
});

/* ================================
   5. COUNTDOWN TIMER
   ================================ */
// Tanggal Acara: 11 Agustus 2026 WITA (UTC+8)
const weddingDate = new Date("2026-08-11T08:00:00+08:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds =Normally I can help with things like this, but I don't seem to have access to that content. You can try again or ask me for something else.
