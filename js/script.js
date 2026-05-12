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

/* LOAD TRACKS */
fetch("./data/tracks.json")
.then(res => res.json())
.then(data => {
  tracks = data;
  loadTrack(localStorage.getItem("track") || 0);
});

/* LOAD TRACK */
function loadTrack(i){
  current = i;
  const t = tracks[i];
  if(!t) return;

  title.textContent = t.title;
  artist.textContent = t.artist;
  audio.src = t.audio;
  cover.src = t.cover;
  vinylCover.src = t.cover;

  localStorage.setItem("track", i);
}

/* PLAY / PAUSE */
playBtn.onclick = () => {
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  }
};

/* NEXT */
nextBtn.onclick = () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio.play();
};

/* PREV */
prevBtn.onclick = () => {
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  audio.play();
};

audio.addEventListener("ended", () => nextBtn.click());

/* =========================
   🎚️ AUDIO CONTEXT SAFE FIX
========================= */

let ctx;
let analyser;
let dataArray;
let audioUnlocked = false;

function initAudioContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    const src = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();

    src.connect(analyser);
    analyser.connect(ctx.destination);

    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 100;
    document.querySelector(".player-box")?.appendChild(canvas);
    const c = canvas.getContext("2d");

    function drawVisualizer(){
      requestAnimationFrame(drawVisualizer);

      if(!analyser) return;

      analyser.getByteFrequencyData(dataArray);

      c.clearRect(0,0,canvas.width,canvas.height);

      for(let i=0;i<bufferLength;i++){
        const bar = dataArray[i];
        c.fillStyle = "gold";
        c.fillRect(i*5, canvas.height - bar/2, 3, bar/2);
      }
    }

    drawVisualizer();
  }
}

/* SAFE INIT */
document.body.addEventListener("click", initAudioContext);

document.body.addEventListener("click", () => {
  if(ctx && !audioUnlocked && ctx.state === "suspended"){
    ctx.resume();
    audioUnlocked = true;
  }
});

/* =========================
   💿 VINYL SYNC SAFE
========================= */

const vinyl = document.querySelector(".vinyl");

audio?.addEventListener("play", () => {
  if(vinyl) vinyl.style.animationPlayState = "running";
});

audio?.addEventListener("pause", () => {
  if(vinyl) vinyl.style.animationPlayState = "paused";
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
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   🖼️ HERO SLIDER
========================= */

const images = document.querySelectorAll(".hero-left img");
let index = 0;

setInterval(() => {
  if(!images.length) return;

  images[index].style.opacity = 0;

  index = (index + 1) % images.length;

  images[index].style.opacity = 1;
}, 5000);

/* =========================
   🧠 RIPPLE SAFE
========================= */

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", function(e){
    const circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left + "px";
    circle.style.top = e.clientY - rect.top + "px";

    btn.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

/* =========================
   BURGER MENU SAFE
========================= */

const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

burger?.addEventListener("click", () => {
  nav?.classList.toggle("active");
});

/* =========================
   MUSIC TITLE SAFE
========================= */

document.querySelectorAll(".music-title").forEach(title => {

  title.addEventListener("mousemove", e => {
    const rect = title.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;

    title.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  title.addEventListener("mouseleave", () => {
    title.style.transform = "rotateX(0) rotateY(0) scale(1)";
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
   VIDEO LAZY LOAD (FIXED 1 VERSION ONLY)
========================= */

const lazyObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const video = entry.target;
      const source = video.querySelector("source");

      if(source && source.dataset.src){
        source.src = source.dataset.src;
        video.load();
      }

      lazyObserver.unobserve(video);
    }

  });

});

document.querySelectorAll(".side-video video")
.forEach(video => lazyObserver.observe(video));

/* =========================
   VIDEO PLAYER SAFE (UNCHANGED UX)
========================= */

const mainVideo = document.getElementById("mainVideo");

const playPause = document.getElementById("playPause");
const nextVideo = document.getElementById("nextVideo");
const prevVideo = document.getElementById("prevVideo");

const volumeControl = document.getElementById("volumeControl");
const progressBar = document.querySelector(".video-progress-bar");
const sideVideos = document.querySelectorAll(".side-video");

const playlist = [
  { src: "assets/videos/diarynofy.mp4", poster: "assets/images/logo1.png" },
  { src: "assets/videos/tsodrano.mp4", poster: "assets/images/logo1.png" },
  { src: "assets/videos/tompondaka.mp4", poster: "assets/images/logo1.png" }
];

let currentVideo = 0;

function loadVideo(index){

  currentVideo = index;

  if(!playlist[index]) return;

  mainVideo.src = playlist[index].src;
  mainVideo.poster = playlist[index].poster;
  mainVideo.load();

  sideVideos.forEach(v => v.classList.remove("active-video"));

  if(sideVideos[index]){
    sideVideos[index].classList.add("active-video");
  }
}

loadVideo(0);

/* PLAY */
playPause?.addEventListener("click", () => {
  if(mainVideo.paused){
    mainVideo.play();
    playPause.innerHTML = '<i class="ri-pause-fill"></i>';
  } else {
    mainVideo.pause();
    playPause.innerHTML = '<i class="ri-play-fill"></i>';
  }
});

/* CLICK VIDEO */
mainVideo?.addEventListener("click", () => playPause.click());

/* NEXT PREV */
nextVideo?.addEventListener("click", () => {
  currentVideo = (currentVideo + 1) % playlist.length;
  loadVideo(currentVideo);
  mainVideo.play();
});

prevVideo?.addEventListener("click", () => {
  currentVideo = (currentVideo - 1 + playlist.length) % playlist.length;
  loadVideo(currentVideo);
  mainVideo.play();
});

/* SIDE CLICK */
sideVideos.forEach((v, i) => {
  v.addEventListener("click", () => {
    loadVideo(i);
    mainVideo.play();
  });
});

/* VOLUME */
volumeControl?.addEventListener("input", () => {
  mainVideo.volume = volumeControl.value;
});

/* PROGRESS */
mainVideo?.addEventListener("timeupdate", () => {
  if(mainVideo.duration){
    const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
    progressBar.style.width = progress + "%";
  }
});

/* LOGO PLAY */
const video = document.getElementById("mainVideo");
const placeholder = document.getElementById("videoPlaceholder");
const screen = document.querySelector(".video-screen");

placeholder?.addEventListener("click", () => {
  video.play();
  screen?.classList.add("playing");
});

video?.addEventListener("play", () => screen?.classList.add("playing"));
video?.addEventListener("pause", () => screen?.classList.remove("playing"));

console.log("Zarabesso Studio PRO Vercel Ready ✔");