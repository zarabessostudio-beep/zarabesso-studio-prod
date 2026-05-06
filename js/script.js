/* =========================
   🎧 PLAYER + DATA
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
fetch("data/tracks.json")
.then(res => res.json())
.then(data => {
  tracks = data;
  loadTrack(localStorage.getItem("track") || 0);
});

/* LOAD TRACK */
function loadTrack(i){
  current = i;
  const t = tracks[i];

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

/* AUTO NEXT */
audio.addEventListener("ended", () => {
  nextBtn.click();
});


/* =========================
   🎚️ AUDIO VISUALIZER (REAL)
========================= */

const ctx = new (window.AudioContext || window.webkitAudioContext)();
const src = ctx.createMediaElementSource(audio);
const analyser = ctx.createAnalyser();

src.connect(analyser);
analyser.connect(ctx.destination);

analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

/* CANVAS */
const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 100;
document.querySelector(".player-box").appendChild(canvas);
const c = canvas.getContext("2d");

function drawVisualizer(){
  requestAnimationFrame(drawVisualizer);

  analyser.getByteFrequencyData(dataArray);

  c.clearRect(0,0,canvas.width,canvas.height);

  for(let i=0;i<bufferLength;i++){
    const bar = dataArray[i];
    c.fillStyle = "gold";
    c.fillRect(i*5, canvas.height - bar/2, 3, bar/2);
  }
}
drawVisualizer();


/* =========================
   💿 VINYL SYNC
========================= */

const vinyl = document.querySelector(".vinyl");

audio.addEventListener("play", () => {
  vinyl.style.animationPlayState = "running";
});

audio.addEventListener("pause", () => {
  vinyl.style.animationPlayState = "paused";
});


/* =========================
   🖱️ HOVER PARALLAX EFFECT
========================= */

document.querySelectorAll(".card, .player-box").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});


/* =========================
   ✨ SCROLL REVEAL
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
   🖼️ HERO IMAGE SLIDER SMOOTH
========================= */

const images = document.querySelectorAll(".hero-left img");
let index = 0;

setInterval(() => {
  images[index].style.opacity = 0;

  index = (index + 1) % images.length;

  images[index].style.opacity = 1;
}, 5000);


/* =========================
   🧠 MICRO INTERACTIONS
========================= */

/* BUTTON RIPPLE EFFECT */
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
   🔊 AUTO RESUME AUDIO CONTEXT (IMPORTANT)
========================= */

document.body.addEventListener("click", () => {
  if(ctx.state === "suspended"){
    ctx.resume();
  }
});
/* ================= BURGER MENU ================= */

const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});
/* ================= TITLE 3D INTERACTION ================= */

document.querySelectorAll(".music-title").forEach(title => {

  title.addEventListener("mousemove", e => {

    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;

    title.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  title.addEventListener("mouseleave", () => {
    title.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
/*===================== Sychro Music =====================*/
});
audio.addEventListener("timeupdate", () => {
  const level = Math.sin(audio.currentTime * 5);
  document.querySelectorAll(".music-title").forEach(t => {
    t.style.transform = `scale(${1 + level * 0.05})`;
  });
});