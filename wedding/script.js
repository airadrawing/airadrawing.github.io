/*==========================================
    CONFIG
==========================================*/

const CONFIG = {

    weddingDate: "2026-08-11T08:00:00+08:00",

    musicVolume: 0.35,

    toastDuration: 2500,

    smoothScroll: true,

    animationOffset: 100

};
/*==========================================
    DOM ELEMENT
==========================================*/

const ELEMENT = {

    cover: document.getElementById("cover-page"),

    content: document.getElementById("main-content"),

    guestName: document.getElementById("guestName"),

    music: document.getElementById("bg-music"),

    musicButton: document.getElementById("music-btn"),

    musicIcon: document.querySelector("#music-btn i"),

    bottomNav: document.getElementById("bottom-nav"),

    countdown: {

        days: document.getElementById("days"),

        hours: document.getElementById("hours"),

        minutes: document.getElementById("minutes"),

        seconds: document.getElementById("seconds")

    },

    lightbox: document.getElementById("lightbox"),

    lightboxImage: document.getElementById("lightbox-img"),

    rsvpForm: document.getElementById("rsvpForm"),

    comments: document.getElementById("commentsList")

};
/*==========================================
    LIGHTBOX
==========================================*/

function openLightbox(src){

    ELEMENT.lightboxImage.src = src;

    ELEMENT.lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}
function closeLightbox(){

    ELEMENT.lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}
ELEMENT.lightbox.addEventListener("click",e=>{

    if(

        e.target === ELEMENT.lightbox

    ){

        closeLightbox();

    }

});
document.addEventListener("keydown",e=>{

    if(

        e.key==="Escape"

    ){

        closeLightbox();

    }

});
/*==========================================
    APP STATE
==========================================*/

const STATE = {

    invitationOpened: false,

    musicPlaying: false,

    currentSection: "",

    loading: false

};
/*==========================================
    SHORTCUT
==========================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);
function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}
function pad(number){

    return number.toString().padStart(2,"0");

}
function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}
function formatDate(date){

    return new Intl.DateTimeFormat("id-ID",{

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    }).format(date);

}
/*==========================================
    TOAST NOTIFICATION
==========================================*/

let toastTimer = null;

function showToast(message, type = "success") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.className = "";

    toast.classList.add("toast");

    toast.classList.add(type);

    toast.innerHTML = `
        <span>${message}</span>
    `;

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, CONFIG.toastDuration);

}
/*==========================================
    GUEST NAME
==========================================*/

function loadGuest() {

    const params = new URLSearchParams(window.location.search);

    const guest = params.get("to");

    ELEMENT.guestName.innerHTML = guest ?

        escapeHTML(decodeURIComponent(guest))

        :

        "Tamu Undangan";

}
/*==========================================
    MUSIC
==========================================*/

ELEMENT.music.volume = CONFIG.musicVolume;

ELEMENT.music.loop = true;
async function playMusic() {

    try{

        await ELEMENT.music.play();

        STATE.musicPlaying = true;

        ELEMENT.musicIcon.className =

            "fas fa-compact-disc fa-spin";

    }

    catch(e){

        console.log(e);

    }

}
function pauseMusic(){

    ELEMENT.music.pause();

    STATE.musicPlaying = false;

    ELEMENT.musicIcon.className =

        "fas fa-volume-mute";

}
function toggleMusic(){

    if(STATE.musicPlaying){

        fadeOutMusic();

    }

    else{

        fadeInMusic();

    }

}
async function fadeInMusic(){

    ELEMENT.music.volume = 0;

    await ELEMENT.music.play();

    STATE.musicPlaying = true;

    ELEMENT.musicIcon.className =

        "fas fa-compact-disc fa-spin";

    let volume = 0;

    const interval = setInterval(()=>{

        volume += 0.05;

        if(volume >= CONFIG.musicVolume){

            volume = CONFIG.musicVolume;

            clearInterval(interval);

        }

        ELEMENT.music.volume = volume;

    },100);

}
function fadeOutMusic(){

    let volume = ELEMENT.music.volume;

    const interval = setInterval(()=>{

        volume -= .05;

        if(volume <= 0){

            clearInterval(interval);

            ELEMENT.music.pause();

            ELEMENT.music.volume = CONFIG.musicVolume;

            STATE.musicPlaying = false;

            ELEMENT.musicIcon.className =

                "fas fa-volume-mute";

        }

        else{

            ELEMENT.music.volume = volume;

        }

    },100);

}
/*==========================================
    OPEN INVITATION
==========================================*/

async function openInvitation(){

    if(STATE.invitationOpened) return;

    STATE.invitationOpened = true;

    ELEMENT.cover.style.top = "-100vh";

    document.body.style.overflow = "auto";

    ELEMENT.content.style.display = "block";

    await sleep(900);

    ELEMENT.cover.style.display = "none";

    ELEMENT.musicButton.style.display = "flex";

    fadeInMusic();

    showToast("Selamat datang ❤️","success")confetti();

}
document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        ELEMENT.music.pause();

    }

    else{

        if(STATE.musicPlaying){

            ELEMENT.music.play();

        }

    }

});
/*==========================================
    COPY
==========================================*/

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast("Berhasil disalin");

    }

    catch{

        showToast("Clipboard tidak didukung","error");

    }

}
/*==========================================
    COUNTDOWN
==========================================*/

function startCountdown() {

    const target = new Date(CONFIG.weddingDate).getTime();

    function update() {

        const now = Date.now();

        const distance = target - now;

        if (distance <= 0) {

            ELEMENT.countdown.days.textContent = "00";
            ELEMENT.countdown.hours.textContent = "00";
            ELEMENT.countdown.minutes.textContent = "00";
            ELEMENT.countdown.seconds.textContent = "00";

            return;
        }

        const day = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hour = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

        const minute = Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );

        const second = Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );

        ELEMENT.countdown.days.textContent = pad(day);
        ELEMENT.countdown.hours.textContent = pad(hour);
        ELEMENT.countdown.minutes.textContent = pad(minute);
        ELEMENT.countdown.seconds.textContent = pad(second);

    }

    update();

    setInterval(update,1000);

}
/*==========================================
    BOTTOM NAV
==========================================*/

function handleBottomNav(){

    if(
        STATE.invitationOpened &&
        window.scrollY > 120
    ){

        ELEMENT.bottomNav.classList.add("show");

    }

    else{

        ELEMENT.bottomNav.classList.remove("show");

    }

}
window.addEventListener("scroll",handleBottomNav);
/*==========================================
    SMOOTH SCROLL
==========================================*/

$$(".bottom-nav a").forEach(item=>{

    item.addEventListener("click",e=>{

        e.preventDefault();

        const target = item.getAttribute("href");

        const section = document.querySelector(target);

        if(!section) return;

        section.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});
/*==========================================
    ACTIVE MENU
==========================================*/

const sections = $$("section");

const navLinks = $$(".bottom-nav a");
function activeMenu(){

    let current = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href")

            ===

            "#" + current

        ){

            link.classList.add("active");

        }

    });

}
window.addEventListener("scroll",activeMenu);
let startY = 0;

ELEMENT.lightbox.addEventListener("touchstart",e=>{

    startY = e.touches[0].clientY;

});
ELEMENT.lightbox.addEventListener("touchmove",e=>{

    const move = e.touches[0].clientY;

    if(move-startY>120){

        closeLightbox();

    }

});
function preloadImages(){

    $$("img").forEach(img=>{

        const image = new Image();

        image.src = img.src;

    });

}
function lazyImages(){

    $$("img").forEach(img=>{

        img.loading="lazy";

    });

}
/*==========================================
    SHARE INVITATION
==========================================*/

async function shareInvitation() {

    const shareData = {

        title: document.title,

        text: "Anda diundang ke acara kami ❤️",

        url: window.location.href

    };

    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (err) {

            console.log(err);

        }

    } else {

        copyText(window.location.href);

        showToast("Link berhasil disalin");

    }

}
/*==========================================
    RIPPLE EFFECT
==========================================*/

function ripple(event){

    const button = event.currentTarget;

    const circle = document.createElement("span");

    const diameter = Math.max(

        button.clientWidth,

        button.clientHeight

    );

    const radius = diameter / 2;

    circle.style.width =

        circle.style.height =

        `${diameter}px`;

    circle.style.left =

        `${event.clientX -

        button.offsetLeft -

        radius}px`;

    circle.style.top =

        `${event.clientY -

        button.offsetTop -

        radius}px`;

    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if(ripple){

        ripple.remove();

    }

    button.appendChild(circle);

}
/*==========================================
    SCROLL REVEAL
==========================================*/

const revealElements = $$(".reveal");
function revealOnScroll(){

    revealElements.forEach(el=>{

        const top =

            el.getBoundingClientRect().top;

        if(

            top <

            window.innerHeight -

            CONFIG.animationOffset

        ){

            el.classList.add("show");

        }

    });

}
window.addEventListener(

    "scroll",

    revealOnScroll

);
/*==========================================
    GOOGLE MAP
==========================================*/

function openMaps(url){

    window.open(url,"_blank");

}
/*==========================================
    BUTTON LOADING
==========================================*/

function buttonLoading(

    button,

    status=true

){

    if(status){

        button.disabled=true;

        button.dataset.text=

            button.innerHTML;

        button.innerHTML=

            '<i class="fa fa-spinner fa-spin"></i> Mengirim...';

    }

    else{

        button.disabled=false;

        button.innerHTML=

            button.dataset.text;

    }

}
const SCRIPT_URL="ISI_URL_GOOGLE_SCRIPT";
/*==========================================
    RSVP
==========================================*/

async function submitRSVP(e){

    e.preventDefault();

    const form =

        ELEMENT.rsvpForm;

    const submit =

        form.querySelector(

            "button[type=submit]"

        );

    buttonLoading(

        submit,

        true

    );

    try{

        const response=

        await fetch(

            SCRIPT_URL,

            {

                method:"POST",

                body:new FormData(form)

            }

        );

        const result=

            await response.text();

        showToast(

            "Terima kasih ❤️"

        );

        form.reset();

    }

    catch(error){

        showToast(

            "Gagal mengirim",

            "error"

        );

        console.log(error);

    }

    finally{

        buttonLoading(

            submit,

            false

        );

    }

}
ELEMENT.rsvpForm.addEventListener(

    "submit",

    submitRSVP

);
/*==========================================
    AUTO NAME
==========================================*/

function autoFillGuest(){

    const params=

        new URLSearchParams(

            window.location.search

        );

    const guest=

        params.get("to");

    const input=

        document.querySelector(

            "#name"

        );

    if(

        guest && input

    ){

        input.value=

            decodeURIComponent(

                guest

            );

    }

}
/*==========================================
    CONFETTI
==========================================*/

function confetti(){

    for(

        let i=0;

        i<40;

        i++

    ){

        const div=

        document.createElement(

            "div"

        );

        div.className=

            "confetti";

        div.style.left=

            Math.random()*100+"vw";

        div.style.animationDelay=

            Math.random()*1+"s";

        div.style.background=

            `hsl(${Math.random()*360},90%,60%)`;

        document.body.appendChild(div);

        setTimeout(()=>{

            div.remove();

        },4000);

    }

}
/*==========================================
    INIT
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadGuest();

        autoFillGuest();

        startCountdown();

        preloadImages();

        lazyImages();

        revealOnScroll();

    }

);

window.addEventListener(

    "scroll",

    ()=>{

        handleBottomNav();

        activeMenu();

    }

);

ELEMENT.musicButton.addEventListener(

    "click",

    toggleMusic

);

$$("button").forEach(button=>{

    button.addEventListener(

        "click",

        ripple

    );

});
