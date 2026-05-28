/* =========================================================
   VYNILE PLATFORM V2
   ULTRA PREMIUM MEDIA ENGINE
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
   STATE ENGINE V2
========================================================= */

let tracks = [];
let currentIndex = 0;
let playing = false;
let fullscreenMode = false;

const CACHE_KEY = "vynile_platform_v2_cache";

/* =========================================================
   LOAD MEDIA (CLOUDINARY + MEDIA.JS COMPAT)
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
   RENDER PLAYLIST (NETFLIX STYLE LIST)
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

          <small>
            👁 ${track.views} • ❤️ ${track.likes}
          </small>

        </div>

      </div>

      <div class="track-right">

        <button class="play-icon">
          ▶
        </button>

        <button class="download-btn">
          ⬇
        </button>

      </div>
    `;

    el.addEventListener("click", () => selectTrack(index));

    tracksContainer.appendChild(el);
  });
}

/* =========================================================
   LOAD TRACK (CINEMA ENGINE)
========================================================= */

function loadTrack(index) {

  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  pauseMusic();

  audio.src = track.audio;

  videoPlayer.src = track.video;
  videoPlayer.load();
  videoPlayer.muted = true;
  videoPlayer.playsInline = true;
  videoPlayer.loop = false;

  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;

  renderTracks();
  renderComments(track);

}

/* =========================================================
   PLAY ENGINE (SYNC CINEMA MODE)
========================================================= */

async function playMusic() {

  try {

    await audio.play();

    if (videoPlayer.src) {
      videoPlayer.currentTime = audio.currentTime;
      await videoPlayer.play().catch(()=>{});
    }

    playing = true;
    playBtn.innerHTML = "⏸";
    vinyl.classList.add("playing");

    enterCinemaMode();

  } catch (e) {
    console.log(e);
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
   CINEMA MODE (YOUTUBE FULLSCREEN STYLE)
========================================================= */

function enterCinemaMode() {
  const player = document.querySelector(".player-card");
  player.classList.add("cinema-mode");
}

function exitCinemaMode() {
  const player = document.querySelector(".player-card");
  player.classList.remove("cinema-mode");
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
   PROGRESS BAR
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
   AUTO NEXT (NETFLIX STYLE)
========================================================= */

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playMusic();
});

/* =========================================================
   DOWNLOAD SYSTEM (PREMIUM)
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
   MOBILE SWIPE (TIKTOK STYLE)
========================================================= */

let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) {
    nextBtn.click();
  }

  if (endY - startY > 50) {
    prevBtn.click();
  }
});

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();