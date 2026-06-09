/* =========================================================
   VYNILE MEDIA ENGINE PRO (VIDEO ONLY)
========================================================= */

const tracksContainer = document.getElementById("spotifyTracks");

const videoPlayer = document.getElementById("videoPlayer");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

const volumeSlider = document.getElementById("volume");

const vinyl = document.getElementById("vinyl");

const favoriteBtn = document.getElementById("favoriteBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const loopBtn = document.getElementById("loopBtn");
const downloadBtn = document.getElementById("downloadBtn");

const wrapper = document.getElementById("videoWrapper");
const controls = document.getElementById("videoControls");


/* =========================
STATE
========================= */

let tracks = [];
let currentIndex = 0;
let isPlaying = false;
let loopMode = false;

const FAVORITES_KEY = "vynile_favorites";
const VOLUME_KEY = "vynile_volume";

/* ==================== VIDEO INTELLIGENTES ===================== */
videoPlayer.addEventListener(
"loadedmetadata",
() => {

 const ratio =

 videoPlayer.videoWidth /
 videoPlayer.videoHeight;

 if(ratio > 1.7){

   videoPlayer.style.objectFit =
   "cover";

 }else{

   videoPlayer.style.objectFit =
   "contain";

 }

});

/* ===================== OPTIMISATION IOS ======================= */

videoPlayer.setAttribute(
"playsinline",
true
);

videoPlayer.setAttribute(
"webkit-playsinline",
true
);
videoPlayer.playsInline = true;

videoPlayer.setAttribute(
"playsinline",
""
);

videoPlayer.setAttribute(
"webkit-playsinline",
""
);

document.addEventListener(
"click",
() => {

  videoPlayer.muted = false;

},
{ once:true }
);

videoPlayer.disablePictureInPicture =
false;

/* =========================
INIT VOLUME MEMORY
========================= */

const savedVolume = localStorage.getItem(VOLUME_KEY);
document.addEventListener(
"click",
()=>{

    videoPlayer.muted = false;

},
{once:true});
if (savedVolume !== null) {
  volumeSlider.value = savedVolume;
  videoPlayer.volume = savedVolume;
}

/* =========================
LOAD CLOUD TRACKS
========================= */

async function loadCloudTracks() {
  try {
    tracksContainer.innerHTML = `<p>Chargement...</p>`;

    const res = await fetch("/api/media");
    const data = await res.json();

    if (!data.success) throw new Error();

    tracks = data.tracks || [];

    renderTracks();

    if (tracks.length) loadTrack(0);

  } catch (err) {
    tracksContainer.innerHTML = "<p>Erreur chargement cloud</p>";
  }
}

/* =========================
RENDER TRACKS
========================= */

function renderTracks() {
  tracksContainer.replaceChildren();

  tracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.className = "spotify-track";

    div.innerHTML = `
      <img src="${track.cover}">
      <div>
        <h4>${track.title}</h4>
        <p>${track.artist}</p>
      </div>
      <button>▶</button>
    `;

    div.onclick = () => {
      loadTrack(index);
      playVideo();
    };

    tracksContainer.appendChild(div);
  });
}

/* =========================
LOAD TRACK
========================= */

function loadTrack(index) {
  currentIndex = index;

  const track = tracks[index];
  if (!track) return;

  videoPlayer.controls = true;
  videoPlayer.setAttribute(
  "controlsList",
  "nodownload"
);
loopBtn.onclick = () => {

  loopMode = !loopMode;

  videoPlayer.loop = loopMode;

  loopBtn.classList.toggle(
    "active",
    loopMode
  );

};
const LOOP_KEY = "vynile_loop";

const savedLoop =
localStorage.getItem(LOOP_KEY);

if(savedLoop==="true"){

  loopMode = true;
  videoPlayer.loop = true;

  loopBtn.classList.add("active");

}
localStorage.setItem(
  LOOP_KEY,
  loopMode
);
  
 videoPlayer.pause();

videoPlayer.src = track.video;

videoPlayer.preload = "auto";

videoPlayer.load();

preloadNextVideo();

videoPlayer.volume =
localStorage.getItem(VOLUME_KEY) || 1;

videoPlayer.muted = false;

videoPlayer.addEventListener(
"canplay",
async ()=>{

    try{

        await videoPlayer.play();

        videoPlayer.muted = false;

    }catch(err){

        console.log(err);

    }

},
{once:true});

  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
}

/* =========================
PLAY / PAUSE
========================= */

async function playVideo() {
  try {
    await videoPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    vinyl.classList.add("playing");
  } catch (e) {
    console.log("PLAY ERROR", e);
  }
}

function pauseVideo() {
  videoPlayer.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  vinyl.classList.remove("playing");
}

playBtn.onclick = () => {
  isPlaying ? pauseVideo() : playVideo();
};

/* =========================
NEXT / PREV
========================= */

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playVideo();
};

prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + tracks.length) % tracks.length;

  loadTrack(currentIndex);
  playVideo();
};
let touchStartX = 0;
let touchEndX = 0;

wrapper.addEventListener("touchstart", (e) => {

  touchStartX =
  e.changedTouches[0].screenX;

});

wrapper.addEventListener("touchend", (e) => {

  touchEndX =
  e.changedTouches[0].screenX;

  handleSwipe();

});

function handleSwipe(){

  const distance =
  touchEndX - touchStartX;

  if(distance > 80){

    prevBtn.click();

  }

  if(distance < -80){

    nextBtn.click();

  }

}
let lastTap = 0;

wrapper.addEventListener("touchend", (e)=>{

  const now = Date.now();

  if(now - lastTap < 300){

    const width = wrapper.clientWidth;

    const x =
    e.changedTouches[0].clientX;

    if(x < width/2){

      prevBtn.click();

    }else{

      nextBtn.click();

    }

  }

  lastTap = now;

});

/* =========================
PROGRESS BAR
========================= */

videoPlayer.addEventListener("timeupdate", () => {
  if (!videoPlayer.duration) return;

  const percent =
    (videoPlayer.currentTime / videoPlayer.duration) * 100;

  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
  durationTimeEl.textContent = formatTime(videoPlayer.duration);
});

document.querySelector(".progress-container")
.addEventListener("click", (e) => {
  const width = e.currentTarget.clientWidth;
  const percent = e.offsetX / width;

  videoPlayer.currentTime = percent * videoPlayer.duration;
});

/* =========================
TIME FORMAT
========================= */

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
function detectDevice(){

  const w = window.innerWidth;

  if(w <= 768){

    wrapper.classList.add("mobile");

  }

  else if(w <= 1200){

    wrapper.classList.add("tablet");

  }

  else{

    wrapper.classList.add("desktop");

  }

}

detectDevice();

window.addEventListener(
  "resize",
  detectDevice
);
window.addEventListener(
"orientationchange",
() => {

  setTimeout(() => {

    if(
      window.innerWidth >
      window.innerHeight
    ){

      if(
        !document.fullscreenElement
      ){

        wrapper.requestFullscreen?.();

      }

    }

  },300);

});
/* =========================
VOLUME MEMORY
========================= */

volumeSlider.addEventListener("input", (e) => {
  const v = e.target.value;

  videoPlayer.volume = v;
  localStorage.setItem(VOLUME_KEY, v);
});

/* =========================
LOOP MODE
========================= */

loopBtn.onclick = () => {
  loopMode = !loopMode;
  videoPlayer.loop = loopMode;
  loopBtn.classList.toggle("active", loopMode);
};

/* =========================
END VIDEO
========================= */

videoPlayer.addEventListener("ended", async () => {

  vinyl.classList.remove("playing");

  if (loopMode){
    await videoPlayer.play();
    return;
  }

  currentIndex = (currentIndex + 1) % tracks.length;

  loadTrack(currentIndex);

  setTimeout(async () => {

    try{
      await videoPlayer.play();
    }catch(e){
      console.log(e);
    }

  },300);

});
/* ============= PRELOADER VIDEOS ============== */

function preloadNextVideo(){

  if(!tracks.length) return;

  const nextIndex =
  (currentIndex + 1) % tracks.length;

  const preloadVideo =
  document.createElement("video");

  preloadVideo.preload = "metadata";

  preloadVideo.src =
  tracks[nextIndex].video;

}

/* =========================
FULLSCREEN
========================= */

fullscreenBtn.onclick = () => {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  }
};

/* =========================
DOWNLOAD
========================= */

downloadBtn.onclick = () => {
  const track = tracks[currentIndex];
  if (!track) return;

  const a = document.createElement("a");
  a.href = track.video;
  a.download = track.title;
  a.click();
};

/* =========================
FAVORITES
========================= */

favoriteBtn.onclick = () => {
  const track = tracks[currentIndex];

  let favs = JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );

  const exists = favs.find(f => f.id === track.id);

  if (exists) {
    favs = favs.filter(f => f.id !== track.id);
  } else {
    favs.push(track);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
};

/* =========================
VINYL ANIMATION SYNC
========================= */

videoPlayer.addEventListener("play", () => {
  vinyl.classList.add("playing");
});

videoPlayer.addEventListener("pause", () => {
  vinyl.classList.remove("playing");
});

/* =========================
AUTO SHOW CONTROLS (PREMIUM UX)
========================= */

let hideTimer;

function showControls() {
  controls.classList.add("show");

  clearTimeout(hideTimer);

  if (!videoPlayer.paused) {
    hideTimer = setTimeout(() => {
      controls.classList.remove("show");
    }, 2000);
  }
}

wrapper.addEventListener("mousemove", showControls);
wrapper.addEventListener("touchstart", showControls);

/* ========== over lay indépendant ========== */

function createFullscreenOverlay(){

  if(
    document.getElementById(
      "fullscreenControls"
    )
  ) return;

  const controls =
  document.createElement("div");

  controls.id =
  "fullscreenControls";

  controls.innerHTML = `

    <button id="fsPrev">
      ⏮
    </button>

    <button id="fsNext">
      ⏭
    </button>

  `;

  document.body.appendChild(
    controls
  );

  document
  .getElementById("fsPrev")
  .onclick =
  ()=>prevBtn.click();

  document
  .getElementById("fsNext")
  .onclick =
  ()=>nextBtn.click();

}
/* =========================
PREMIUM AUTO HIDE OVERLAY
========================= */

const overlayControls =
document.querySelector(".video-overlay-controls");

let overlayTimer;

function showOverlayControls(){

  overlayControls.classList.add("show");

  clearTimeout(overlayTimer);

  if(!videoPlayer.paused){

    overlayTimer = setTimeout(() => {

      overlayControls.classList.remove("show");

    }, 1800);

  }

}

videoPlayer.addEventListener("play", () => {

  showOverlayControls();

});

videoPlayer.addEventListener("pause", () => {

  overlayControls.classList.add("show");

});

wrapper.addEventListener("mousemove", showOverlayControls);
wrapper.addEventListener("touchstart", showOverlayControls);
document.addEventListener(
"fullscreenchange",
() => {

  if(document.fullscreenElement){

    createFullscreenOverlay();

    document
    .getElementById(
      "fullscreenControls"
    )
    .style.display = "flex";

  }else{

    const fs =
    document.getElementById(
      "fullscreenControls"
    );

    if(fs){

      fs.style.display = "none";

    }

  }

});


window.playVideo = () => playVideo();
window.pauseVideo = () => pauseVideo();
window.nextVideo = () => nextBtn.click();
window.prevVideo = () => prevBtn.click();

Object.defineProperty(window, "isPlaying", {
  get() {
    return !videoPlayer.paused;
  }
});
/* =========================
INIT
========================= */

loadCloudTracks();
/* =========================================================
   🛡️ FIX PLAYLIST STABILITY (ANTI DISPARITION BUG)
   À COLLER EN BAS DU JS
========================================================= */

(function fixPlaylistStability() {

  const container = document.getElementById("spotifyTracks");
  const sidebar = document.querySelector(".spotify-sidebar");

  if (!container) return;

  /* 🔒 Empêche disparition forcée du DOM */
  const observer = new MutationObserver(() => {

    if (container.children.length === 0) {

      console.warn("Playlist vide détectée → restauration");

      container.innerHTML = `
        <p style="opacity:.6; padding:10px;">
          Chargement des musiques...
        </p>
      `;

      setTimeout(() => {
        if (typeof renderTracks === "function" && tracks?.length) {
          renderTracks();
        }
      }, 400);
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true
  });

  /* 🔒 Empêche disparition sidebar (CSS/JS conflict fix) */
  if (sidebar) {

    const safeSidebar = () => {

      sidebar.style.display = "block";
      sidebar.style.visibility = "visible";
      sidebar.style.opacity = "1";
      sidebar.style.transform = "none";

    };

    safeSidebar();

    setInterval(safeSidebar, 2000);
  }

})();