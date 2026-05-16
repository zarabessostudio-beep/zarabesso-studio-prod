/* =========================
   🎧 PLAYER + DATA (SAFE VERCEL)
========================= */

let tracks = [];
let current = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const vinylCover = document.getElementById("vinyl-cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

/* =========================
   LOAD TRACKS
========================= */

fetch("./data/tracks.json")
  .then(res => res.json())
  .then(data => {
    tracks = data || [];

    const saved = parseInt(localStorage.getItem("track")) || 0;
    loadTrack(saved);
  });

/* =========================
   LOAD TRACK SAFE
========================= */

function loadTrack(i) {
  if (!tracks.length) return;

  current = (i + tracks.length) % tracks.length;

  const t = tracks[current];
  if (!t) return;

  if (title) title.textContent = t.title;
  if (artist) artist.textContent = t.artist;
  if (audio) audio.src = t.audio;
  if (cover) cover.src = t.cover;
  if (vinylCover) vinylCover.src = t.cover;

  localStorage.setItem("track", current);
}

/* =========================
   PLAY / PAUSE SAFE
========================= */

playBtn?.addEventListener("click", () => {
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  }
});

/* =========================
   NEXT / PREV SAFE
========================= */

nextBtn?.addEventListener("click", () => {
  if (!tracks.length) return;

  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio?.play();
});

prevBtn?.addEventListener("click", () => {
  if (!tracks.length) return;

  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  audio?.play();
});

audio?.addEventListener("ended", () => nextBtn?.click());

/* =========================
   🎚️ AUDIO CONTEXT SAFE (NO DUPLICATE CANVAS)
========================= */

let ctx;
let analyser;
let dataArray;
let audioUnlocked = false;
let canvasCreated = false;

function initAudioContext() {
  if (!audio || ctx) return;

  ctx = new (window.AudioContext || window.webkitAudioContext)();

  const src = ctx.createMediaElementSource(audio);
  analyser = ctx.createAnalyser();

  src.connect(analyser);
  analyser.connect(ctx.destination);

  analyser.fftSize = 64;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  if (!canvasCreated) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("audio-canvas");
    canvas.width = 300;
    canvas.height = 100;

    document.querySelector(".player-box")?.appendChild(canvas);

    const c = canvas.getContext("2d");

    function draw() {
      requestAnimationFrame(draw);

      if (!analyser) return;

      analyser.getByteFrequencyData(dataArray);

      c.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bufferLength; i++) {
        const bar = dataArray[i];
        c.fillStyle = "gold";
        c.fillRect(i * 5, canvas.height - bar / 2, 3, bar / 2);
      }
    }

    draw();
    canvasCreated = true;
  }
}

/* INIT AUDIO ONCE */
document.body.addEventListener("click", initAudioContext, { once: true });

document.body.addEventListener("click", () => {
  if (ctx && ctx.state === "suspended") {
    ctx.resume();
    audioUnlocked = true;
  }
});

/* =========================
   💿 VINYL SAFE
========================= */

const vinyl = document.querySelector(".vinyl");

audio?.addEventListener("play", () => {
  if (vinyl) vinyl.style.animationPlayState = "running";
});

audio?.addEventListener("pause", () => {
  if (vinyl) vinyl.style.animationPlayState = "paused";
});

/* =========================
   🖱️ PARALLAX SAFE
========================= */

document.querySelectorAll(".card, .player-box").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    el.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

/* =========================
   ✨ SCROLL REVEAL SAFE
========================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   🖼️ HERO SLIDER SAFE
========================= */

const images = document.querySelectorAll(".hero-left img");
let index = 0;

setInterval(() => {
  if (!images.length) return;

  images[index].style.opacity = 0;
  index = (index + 1) % images.length;
  images[index].style.opacity = 1;
}, 5000);

/* =========================
   🧠 RIPPLE SAFE
========================= */

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", e => {
    const circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left + "px";
    circle.style.top = e.clientY - rect.top + "px";

    btn.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

/* =========================================
   PREMIUM BURGER SYSTEM
========================================= */

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

/* TOGGLE MENU */
burger?.addEventListener("click", () => {

  burger.classList.toggle("active");

  navLinks.classList.toggle("active");

  document.body.classList.toggle("menu-open");

});

/* CLOSE WHEN CLICK LINK */
document.querySelectorAll("#navLinks a").forEach(link => {

  link.addEventListener("click", () => {

    burger?.classList.remove("active");

    navLinks?.classList.remove("active");

    document.body.classList.remove("menu-open");

  });

});

/* CLOSE ON OUTSIDE CLICK */
document.addEventListener("click", e => {

  if(
    navLinks?.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !burger.contains(e.target)
  ){

    burger.classList.remove("active");

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

  }

});

/* ESCAPE KEY */
document.addEventListener("keydown", e => {

  if(e.key === "Escape"){

    burger?.classList.remove("active");

    navLinks?.classList.remove("active");

    document.body.classList.remove("menu-open");

  }

});

/* =========================
   MUSIC TITLE SAFE
========================= */

document.querySelectorAll(".music-title").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;

    el.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

/* =========================
   MUSIC SYNC SAFE
========================= */

audio?.addEventListener("timeupdate", () => {
  const level = Math.sin(audio.currentTime * 5);

  document.querySelectorAll(".music-title").forEach(t => {
    t.style.transform = `scale(${1 + level * 0.05})`;
  });
});

/* =========================
   VIDEO LAZY LOAD SAFE
========================= */

const lazyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const video = entry.target;
    const source = video.querySelector("source");

    if (source?.dataset?.src) {
      source.src = source.dataset.src;
      video.load();
    }

    lazyObserver.unobserve(video);
  });
});

document.querySelectorAll(".side-video video")
  .forEach(v => lazyObserver.observe(v));

/* =========================
   VIDEO PLAYER SAFE
========================= */

const mainVideo = document.getElementById("mainVideo");

const playPause = document.getElementById("playPause");
const nextVideo = document.getElementById("nextVideo");
const prevVideo = document.getElementById("prevVideo");

const volumeControl = document.getElementById("volumeControl");
const progressBar = document.querySelector(".video-progress-bar");
const sideVideos = document.querySelectorAll(".side-video");

const playlist = [
  { src: cloudVideo("diarynofy.mp4"), poster: cloudImage("logo1.png") },
  { src: cloudVideo("tsodrano.mp4"), poster: cloudImage("logo1.png") },
  { src: cloudVideo("tompondaka.mp4"), poster: cloudImage("logo1.png") }
];

let currentVideo = 0;

function loadVideo(i) {
  if (!playlist.length) return;

  currentVideo = (i + playlist.length) % playlist.length;

  const v = playlist[currentVideo];
  if (!v) return;

  if (mainVideo) {
    mainVideo.src = v.src;
    mainVideo.poster = v.poster;
    mainVideo.load();
  }

  sideVideos.forEach(el => el.classList.remove("active-video"));
  sideVideos[currentVideo]?.classList.add("active-video");
}

loadVideo(0);

/* CONTROLS SAFE */
playPause?.addEventListener("click", () => {
  if (!mainVideo) return;

  if (mainVideo.paused) {
    mainVideo.play();
    playPause.innerHTML = '<i class="ri-pause-fill"></i>';
  } else {
    mainVideo.pause();
    playPause.innerHTML = '<i class="ri-play-fill"></i>';
  }
});

mainVideo?.addEventListener("click", () => playPause?.click());

nextVideo?.addEventListener("click", () => {
  loadVideo(currentVideo + 1);
  mainVideo?.play();
});

prevVideo?.addEventListener("click", () => {
  loadVideo(currentVideo - 1);
  mainVideo?.play();
});

sideVideos.forEach((v, i) => {
  v.addEventListener("click", () => {
    loadVideo(i);
    mainVideo?.play();
  });
});

volumeControl?.addEventListener("input", () => {
  if (mainVideo) mainVideo.volume = volumeControl.value;
});

mainVideo?.addEventListener("timeupdate", () => {
  if (!mainVideo.duration) return;

  const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
  if (progressBar) progressBar.style.width = progress + "%";
});

/* =========================
   VIDEO UI STATE
========================= */

const placeholder = document.getElementById("videoPlaceholder");
const screen = document.querySelector(".video-screen");

placeholder?.addEventListener("click", () => {
  mainVideo?.play();
  screen?.classList.add("playing");
});

mainVideo?.addEventListener("play", () => screen?.classList.add("playing"));
mainVideo?.addEventListener("pause", () => screen?.classList.remove("playing"));

/* =========================
   POPUP SYSTEM SAFE
========================= */

window.addEventListener("load", () => {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupTitle = document.getElementById("popupTitle");
  const popupText = document.getElementById("popupText");
  const popupImage = document.getElementById("popupImage");
  const closePopupBtn = document.getElementById("closePopup");

  const cards = document.querySelectorAll(".portfolio-card");

  if (!popupOverlay || !popupTitle || !popupText || !popupImage || !closePopupBtn) {
    console.error("Popup system missing elements");
    return;
  }

  const popupData = [
    {
      title: "Production Studio Haute Fidélité",
      image: "assets/images/background3.png",
      text: `<p>🎚️ Mixage pro<br><br>🎧 Mastering<br><br>🔥 Nettoyage audio<br><br>🌌 Spatialisation</p>`
    },
    {
      title: "Collaboration Artistique",
      image: "assets/images/dady-love.jpg",
      text: `<p>🎤 Sessions studio<br><br>🎸 Musiciens<br><br>🎼 Arrangement<br><br>🚀 Industrie musicale</p>`
    },
    {
      title: "Ingénierie Audio",
      image: "assets/images/audio-engineer.jpg",
      text: `<p>🧠 Analyse audio<br><br>⚙️ Compression<br><br>🔊 LUFS<br><br>🎛️ Broadcast</p>`
    }
  ];

  function openPopup(i) {
    const item = popupData[i];
    if (!item) return;

    popupTitle.innerHTML = item.title;
    popupText.innerHTML = item.text;
    popupImage.src = item.image;

    popupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  cards.forEach((card, i) => {
    card.addEventListener("click", () => openPopup(i));
  });

  closePopupBtn.addEventListener("click", closePopup);

  function closePopup() {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) closePopup();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePopup();
  });

  console.log("✅ SYSTEM FULL SAFE READY");
});
const overlay = document.getElementById("navOverlay");

burger?.addEventListener("click", () => {
  overlay?.classList.toggle("active");
});

overlay?.addEventListener("click", () => {

  burger.classList.remove("active");

  navLinks.classList.remove("active");

  overlay.classList.remove("active");

  document.body.classList.remove("menu-open");

});
/* =========================================
   DESKTOP NAVBAR FIX SAFE
   COLLER TOUT EN BAS DU JS
========================================= */

(() => {

  const navbar = document.querySelector(".navbar");

  if(!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  /* HEIGHT SAFE */
  document.documentElement.style
    .setProperty("--navbar-height", navbar.offsetHeight + "px");

  /* UPDATE ON RESIZE */
  window.addEventListener("resize", () => {

    document.documentElement.style
      .setProperty("--navbar-height", navbar.offsetHeight + "px");

  });

  /* SCROLL SYSTEM */
  function updateNavbar(){

    const currentScroll = window.pageYOffset;

    /* TOP PAGE */
    if(currentScroll <= 50){

      navbar.classList.remove("hide");

      navbar.style.background =
        "rgba(0,0,0,0.35)";

      lastScroll = currentScroll;
      ticking = false;

      return;
    }

    /* SCROLL DOWN */
    if(currentScroll > lastScroll){

      navbar.classList.add("hide");

    }else{

      navbar.classList.remove("hide");

    }

    /* GLASS EFFECT */
    navbar.style.background =
      "rgba(0,0,0,0.55)";

    lastScroll = currentScroll;

    ticking = false;
  }

  /* OPTIMIZED SCROLL */
  window.addEventListener("scroll", () => {

    if(!ticking){

      window.requestAnimationFrame(updateNavbar);

      ticking = true;

    }

  });

})();