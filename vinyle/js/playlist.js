/* =========================================================
   VYNILE PLATFORM V2
   ULTRA PREMIUM MEDIA ENGINE FIXED
   YOUTUBE + NETFLIX + SPOTIFY FUSION
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

/* =========================================================
   STATE ENGINE
========================================================= */

let tracks = [];
let currentIndex = 0;
let playing = false;

const CACHE_KEY = "vynile_platform_v2_cache";

/* =========================================================
   LOAD MEDIA
========================================================= */

async function loadCloudTracks() {

  try {

    tracksContainer.innerHTML = `
      <div class="cloud-loading">
        <div class="loader"></div>
        <p>Chargement plateforme VYNILE...</p>
      </div>
    `;

    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {
      const parsed = JSON.parse(cache);
      if (parsed?.tracks?.length) {
        tracks = parsed.tracks;
        renderTracks();
        loadTrack(0);
      }
    }

    const res = await fetch("/api/media");
    const data = await res.json();

    if (!data.success) throw new Error("API error");

    tracks = data.tracks.map((t, i) => ({
      id: t.id || `track-${i}`,
      title: t.title,
      artist: t.artist,
      audio: t.audio,
      video: t.video,
      cover: t.cover,
      download: t.video,
      likes: 0,
      views: 0
    }));

    localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks }));

    renderTracks();
    loadTrack(0);

  } catch (err) {
    console.error(err);

    tracksContainer.innerHTML = `
      <div class="empty-cloud">
        <h3>Erreur plateforme</h3>
        <p>Impossible de charger les vidéos</p>
      </div>
    `;
  }
}

/* =========================================================
   RENDER LIST
========================================================= */

function renderTracks() {

  tracksContainer.innerHTML = "";

  tracks.forEach((track, index) => {

    const el = document.createElement("div");

    el.className =
      `spotify-track ${index === currentIndex ? "active-track" : ""}`;

    el.innerHTML = `
      <div class="track-left">
        <img src="${track.cover}">
        <div class="track-info">
          <h4>${track.title}</h4>
          <p>${track.artist}</p>
        </div>
      </div>

      <div class="track-right">
        <button class="play-icon">▶</button>
        <button class="download-btn">⬇</button>
      </div>
    `;

    el.addEventListener("click", () => selectTrack(index));

    tracksContainer.appendChild(el);
  });
}

/* =========================================================
   LOAD TRACK (ULTRA FIX VIDEO MIME SAFE)
========================================================= */

function loadTrack(index) {

  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  pauseMusic();

  /* ================= AUDIO ================= */
  audio.src = track.audio;
  audio.load();

  /* ================= VIDEO FIX ULTRA IMPORTANT ================= */

  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  setTimeout(() => {

    videoPlayer.src = track.video;

    videoPlayer.crossOrigin = "anonymous";
    videoPlayer.preload = "metadata";
    videoPlayer.playsInline = true;
    videoPlayer.disablePictureInPicture = false;

    videoPlayer.muted = true;
    videoPlayer.loop = false;

    videoPlayer.load();

  }, 80);

  /* ================= UI ================= */

  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;

  renderTracks();
  renderComments(track);
}

/* =========================================================
   PLAY (SYNC VIDEO + AUDIO FIXED)
========================================================= */

async function playMusic() {

  try {

    await audio.play();

    if (videoPlayer.src) {

      videoPlayer.currentTime = audio.currentTime;

      await videoPlayer.play().catch((e) => {
        console.log("VIDEO BLOCKED:", e);
      });

    }

    playing = true;
    playBtn.innerHTML = "⏸";
    vinyl.classList.add("playing");

    enterCinemaMode();

  } catch (e) {
    console.log("PLAY ERROR:", e);
  }
}

/* =========================================================
   PAUSE
========================================================= */

function pauseMusic() {

  audio.pause();
  videoPlayer.pause();

  playing = false;
  playBtn.innerHTML = "▶";
  vinyl.classList.remove("playing");

  exitCinemaMode();
}

/* =========================================================
   CINEMA MODE
========================================================= */

function enterCinemaMode() {
  document.querySelector(".player-card")
  .classList.add("cinema-mode");
}

function exitCinemaMode() {
  document.querySelector(".player-card")
  .classList.remove("cinema-mode");
}

/* =========================================================
   CONTROLS
========================================================= */

playBtn.onclick = () => playing ? pauseMusic() : playMusic();

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playMusic();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playMusic();
};

/* =========================================================
   PROGRESS
========================================================= */

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.style.width =
    (audio.currentTime / audio.duration) * 100 + "%";
});

/* SEEK */
document.querySelector(".progress-container")
.addEventListener("click", (e) => {

  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  audio.currentTime = percent * audio.duration;
  videoPlayer.currentTime = audio.currentTime;

});

/* =========================================================
   AUTO NEXT
========================================================= */

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playMusic();
});

/* =========================================================
   DOWNLOAD (CLOUDINARY SAFE)
========================================================= */

function downloadTrack() {

  const track = tracks[currentIndex];
  if (!track) return;

  const a = document.createElement("a");
  a.href = track.download;
  a.target = "_blank";
  a.download = track.title + ".mp4";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* =========================================================
   MOBILE SWIPE
========================================================= */

let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {

  let endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) nextBtn.click();
  if (endY - startY > 50) prevBtn.click();

});

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();