/* =========================================================
   VYNILE PLATFORM V2
   MIME FIX + CLOUD STABILITY ENGINE
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

let tracks = [];
let currentIndex = 0;
let playing = false;

const CACHE_KEY = "vynile_cache_v3";

/* =========================================================
   LOAD CLOUD MEDIA
========================================================= */

async function loadCloudTracks() {
  try {
    tracksContainer.innerHTML = `<p>Chargement...</p>`;

    const res = await fetch("/api/media");
    const data = await res.json();

    if (!data.success) throw new Error("API error");

    tracks = data.tracks;

    renderTracks();
    loadTrack(0);

  } catch (err) {
    console.error(err);
    tracksContainer.innerHTML = `<p>Erreur chargement média</p>`;
  }
}

/* =========================================================
   RENDER
========================================================= */

function renderTracks() {
  tracksContainer.innerHTML = "";

  tracks.forEach((track, index) => {

    const el = document.createElement("div");
    el.className = `spotify-track ${index === currentIndex ? "active-track" : ""}`;

    el.innerHTML = `
      <div class="track-left">
        <img src="${track.cover}">
        <div>
          <h4>${track.title}</h4>
          <p>${track.artist}</p>
        </div>
      </div>
      <div class="track-right">
        <button>▶</button>
      </div>
    `;

    el.onclick = () => {
      loadTrack(index);
      playMusic();
    };

    tracksContainer.appendChild(el);
  });
}

/* =========================================================
   LOAD TRACK (MIME FIX CORE)
========================================================= */

function loadTrack(index) {

  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  pauseMusic();

  /* AUDIO SAFE */
  audio.pause();
  audio.src = track.audio;
  audio.load();

  /* VIDEO SAFE RESET (IMPORTANT MIME FIX) */
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  setTimeout(() => {

    if (track.video) {

      const safeUrl = track.video;

      videoPlayer.src = safeUrl;

      videoPlayer.crossOrigin = "anonymous";
      videoPlayer.preload = "metadata";
      videoPlayer.playsInline = true;
      videoPlayer.muted = true;

      videoPlayer.load();
    }

  }, 80);

  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;

  renderTracks();
}

/* =========================================================
   PLAY / PAUSE SYNC FIX
========================================================= */

async function playMusic() {
  try {

    await audio.play();

    if (videoPlayer.src) {
      videoPlayer.currentTime = audio.currentTime;
      await videoPlayer.play().catch(() => {});
    }

    playing = true;
    playBtn.innerHTML = "⏸";
    vinyl.classList.add("playing");

  } catch (e) {
    console.log("PLAY ERROR", e);
  }
}

function pauseMusic() {
  audio.pause();
  videoPlayer.pause();

  playing = false;
  playBtn.innerHTML = "▶";
  vinyl.classList.remove("playing");
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
   AUTO NEXT
========================================================= */

audio.addEventListener("ended", () => {
  nextBtn.click();
});

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();