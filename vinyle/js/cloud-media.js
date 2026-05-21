/* =========================================================
   ☁️ VYNILE CLOUD MEDIA ENGINE
   ZARABESSO STUDIO PREMIUM VERSION
========================================================= */

/* =========================================================
   ELEMENTS
========================================================= */

const tracksContainer = document.getElementById("spotifyTracks");
const audio = document.getElementById("audio");
const videoPlayer = document.getElementById("videoPlayer");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const vinyl = document.getElementById("vinyl");
const volumeSlider = document.getElementById("volume");

let tracks = [];
let currentIndex = 0;
let isPlaying = false;

/* =========================================================
   CACHE SYSTEM (BOOST PERF)
========================================================= */
const CACHE_KEY = "vynile_tracks_cache_v1";

/* =========================================================
   LOAD CLOUD TRACKS (SMART + CACHE)
========================================================= */
async function loadCloudTracks() {
  try {

    tracksContainer.innerHTML = `
      <div class="cloud-loading">
        <div class="loader"></div>
        <p>Chargement Cloud Music...</p>
      </div>
    `;

    // 🔥 CACHE FIRST
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed?.tracks?.length) {
        tracks = parsed.tracks;
        renderTracks();
        loadTrack(0);
        return;
      }
    }

    const res = await fetch("/api/cloud-media");

    if (!res.ok) throw new Error("Cloud API error");

    const data = await res.json();
    tracks = data.tracks || [];

    if (!tracks.length) {
      tracksContainer.innerHTML = `
        <div class="empty-cloud">
          <i class="ri-cloud-off-line"></i>
          <h3>Aucun média trouvé</h3>
          <p>Vérifiez Cloudinary</p>
        </div>
      `;
      return;
    }

    // 💾 SAVE CACHE
    localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks }));

    renderTracks();
    loadTrack(0);

  } catch (err) {
    console.error("Cloud error:", err);

    tracksContainer.innerHTML = `
      <div class="empty-cloud">
        <i class="ri-error-warning-line"></i>
        <h3>Erreur chargement</h3>
        <p>API Cloudinary indisponible</p>
      </div>
    `;
  }
}

/* =========================================================
   RENDER TRACKS (OPTIMISÉ)
========================================================= */
function renderTracks() {
  tracksContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  tracks.forEach((track, index) => {

    const el = document.createElement("div");
    el.className = `spotify-track ${index === currentIndex ? "active-track" : ""}`;

    el.innerHTML = `
      <div class="track-left">
        <img src="${track.cover}" loading="lazy">
        <div class="track-info">
          <h4>${track.title}</h4>
          <p>${track.artist}</p>
        </div>
      </div>

      <div class="track-right">
        <span>${formatTime(track.duration)}</span>
        <button class="track-play-btn">
          <i class="ri-play-fill"></i>
        </button>
      </div>
    `;

    el.addEventListener("click", () => selectTrack(index));

    fragment.appendChild(el);
  });

  tracksContainer.appendChild(fragment);
}

/* =========================================================
   LOAD TRACK (ULTRA STABLE)
========================================================= */
function loadTrack(index) {

  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  // AUDIO
  audio.src = track.audio;
  audio.preload = "metadata";

  // VIDEO (SAFE MOBILE)
  if (track.video) {
    videoPlayer.src = track.video;
    videoPlayer.muted = true;
    videoPlayer.playsInline = true;
    videoPlayer.preload = "metadata";
    videoPlayer.style.display = "block";
  } else {
    videoPlayer.style.display = "none";
  }

  // UI
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;

  renderTracks();
}

/* =========================================================
   SELECT TRACK
========================================================= */
function selectTrack(index) {
  loadTrack(index);
  playMusic();
}

/* =========================================================
   PLAY (ANTI AUTOPLAY BLOCK FIX)
========================================================= */
async function playMusic() {
  try {

    audio.muted = false;

    const audioPromise = audio.play();

    if (videoPlayer.src) {
      videoPlayer.muted = true;
      await Promise.all([audioPromise, videoPlayer.play()]);
    } else {
      await audioPromise;
    }

    isPlaying = true;
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    vinyl.classList.add("playing");

    // 🔥 STATS HOOK (READY FOR BACKEND)
    sendView();

  } catch (err) {
    console.log("Play blocked:", err);
  }
}

/* =========================================================
   PAUSE
========================================================= */
function pauseMusic() {
  audio.pause();
  videoPlayer.pause();

  isPlaying = false;
  playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  vinyl.classList.remove("playing");
}

/* =========================================================
   NEXT / PREV (SMART LOOP)
========================================================= */
function nextTrack() {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playMusic();
}

function prevTrack() {
  currentIndex =
    (currentIndex - 1 + tracks.length) % tracks.length;

  loadTrack(currentIndex);
  playMusic();
}

nextBtn.onclick = nextTrack;
prevBtn.onclick = prevTrack;

/* =========================================================
   EVENTS
========================================================= */
playBtn.onclick = () => isPlaying ? pauseMusic() : playMusic();

audio.addEventListener("ended", nextTrack);

/* =========================================================
   PROGRESS BAR
========================================================= */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.style.width =
    (audio.currentTime / audio.duration) * 100 + "%";
});

document.querySelector(".progress-container")
.addEventListener("click", (e) => {
  audio.currentTime =
    (e.offsetX / e.currentTarget.clientWidth) * audio.duration;
});

/* =========================================================
   VOLUME
========================================================= */
volumeSlider?.addEventListener("input", (e) => {
  audio.volume = e.target.value;
  videoPlayer.volume = e.target.value;
});

/* =========================================================
   FORMAT TIME
========================================================= */
function formatTime(s) {
  if (!s) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2,"0")}`;
}

/* =========================================================
   STATS SYSTEM (READY BACKEND)
========================================================= */
async function sendView() {
  try {
    await fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: tracks[currentIndex]?.id
      })
    });
  } catch (e) {}
}

/* =========================================================
   MOBILE FIX
========================================================= */
document.body.addEventListener("click", () => {
  audio.load();
  videoPlayer.load();
}, { once: true });

/* =========================================================
   INIT
========================================================= */
loadCloudTracks();