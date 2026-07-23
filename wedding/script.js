/* ================================
   1. KONTROL UNDANGAN & MUSIK
   ================================ */
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = musicBtn.querySelector('i');
const bottomNav = document.getElementById('bottom-nav');
let isPlaying = false;

function openInvitation() {
    const cover = document.getElementById('cover-page');
    cover.style.top = '-100vh';
    
    document.body.style.overflow = 'auto';
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';

    setTimeout(() => {
        cover.style.display = 'none';
        musicBtn.style.display = 'flex';
        bottomNav.classList.add('show');
    }, 1000);

    playMusic();
}

function playMusic() {
    music.play().then(() => {
        isPlaying = true;
        musicIcon.classList.add('fa-spin');
    }).catch(e => console.log("Autoplay dicegah oleh browser"));
}

function toggleMusic() {
    if(isPlaying) {
        music.pause();
        musicIcon.classList.remove('fa-spin');
        musicIcon.classList.remove('fa-compact-disc');
        musicIcon.classList.add('fa-volume-mute');
    } else {
        music.play();
        musicIcon.classList.add('fa-spin');
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-compact-disc');
    }
    isPlaying = !isPlaying;
}


/* ================================
   2. LIGHTBOX GALERI
   ================================ */
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('show');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}

document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target !== document.getElementById('lightbox-img')) {
        closeLightbox();
    }
});


/* ================================
   3. COUNTDOWN TIMER
   ================================ */
const weddingDate = new Date("Jul 11, 2026 08:00:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    
    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.countdown').innerHTML = "<h3>Acara Sedang Berlangsung / Selesai</h3>";
    }
}, 1000);


/* ================================
   4. COPY TO CLIPBOARD (KADO)
   ================================ */
function copyText(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Berhasil disalin: " + textToCopy);
    }).catch(err => {
        alert("Gagal menyalin text!");
    });
}


/* ================================
   5. RSVP GOOGLE SHEETS
   ================================ */
// ⚠️ GANTI URL DI BAWAH INI DENGAN URL WEB APP DARI GOOGLE SCRIPT ANDA
const scriptURL = 'URL_WEB_APP_GOOGLE_SCRIPT_ANDA_PASTE_DISINI'; 

const form = document.getElementById('rsvpForm');
const btnSubmit = document.querySelector('.btn-submit');
const commentsList = document.getElementById('commentsList');

window.addEventListener('DOMContentLoaded', loadComments);

function loadComments() {
    commentsList.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Memuat ucapan... <i class="fas fa-spinner fa-spin"></i></p>';
    
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            commentsList.innerHTML = '';
            if(data.length === 0) {
                commentsList.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Belum ada ucapan. Jadilah yang pertama!</p>';
                return;
            }
            data.forEach(item => {
                const badgeClass = item.kehadiran === 'Hadir' ? 'comment-badge' : 'comment-badge absent';
                const badgeIcon = item.kehadiran === 'Hadir' ? 'fa-check-circle' : 'fa-times-circle';
                
                const html = `
                    <div class="comment-item" style="animation: fadeIn 0.5s;">
                        <div class="comment-header">
                            <span class="comment-name">${item.nama}</span>
                            <span class="${badgeClass}"><i class="fas ${badgeIcon}"></i> ${item.kehadiran}</span>
                        </div>
                        <p class="comment-text">${item.pesan}</p>
                    </div>
                `;
                commentsList.insertAdjacentHTML('beforeend', html);
            });
        })
        .catch(error => {
            commentsList.innerHTML = '<p style="text-align:center; color:red;">Gagal memuat ucapan. Pastikan URL Google Script sudah benar.</p>';
            console.error('Error!', error.message);
        });
}

form.addEventListener('submit', e => {
    e.preventDefault(); 
    
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btnSubmit.disabled = true;

    const formData = new FormData();
    formData.append('nama', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('kehadiran', document.getElementById('attendance').value);
    formData.append('pesan', document.getElementById('message').value);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            if(data.result === 'success') {
                alert("Terima kasih! RSVP & Ucapan Anda berhasil dikirim.");
                form.reset();
                loadComments(); 
            } else {
                alert("Gagal mengirim ucapan, coba lagi nanti.");
            }
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.disabled = false;
        })
        .catch(error => {
            alert("Terjadi kesalahan jaringan.");
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.disabled = false;
            console.error('Error!', error.message);
        });
});
