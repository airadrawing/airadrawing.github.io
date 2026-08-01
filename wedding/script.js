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

setInterval(() => {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if(distance < 0){
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    document.getElementById("days").innerText =
        Math.floor(distance/(1000*60*60*24));

    document.getElementById("hours").innerText =
        Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    document.getElementById("minutes").innerText =
        Math.floor((distance%(1000*60*60))/(1000*60));

    document.getElementById("seconds").innerText =
        Math.floor((distance%(1000*60))/1000);

},1000);

function copyText(text){

    navigator.clipboard.writeText(text);

    alert("Berhasil disalin");
}

const form = document.getElementById("rsvpForm");
const commentsList = document.getElementById("commentsList");

form.addEventListener("submit",function(e){

    e.preventDefault();

    const nama = document.getElementById("name").value;
    const hadir = document.getElementById("attendance").value;
    const pesan = document.getElementById("message").value;

    commentsList.innerHTML += `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-name">${nama}</span>
                <span class="comment-badge ${hadir=="Tidak Hadir"?"absent":""}">
                    ${hadir}
                </span>
            </div>
            <div class="comment-text">${pesan}</div>
        </div>
    `;

    form.reset();

});

document.querySelectorAll(".bottom-nav a").forEach(item=>{

item.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});
const guest = decodeURIComponent(urlParams.get("to") || "Tamu Undangan");
