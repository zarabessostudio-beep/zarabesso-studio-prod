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
   STATE SAAS
========================================================= */

let tracks = [];
let currentIndex = 0;
let playing = false;

/* =========================================================
   CACHE SYSTEM (PERF BOOST)
========================================================= */

const CACHE_KEY = "vynile_cloud_cache_v2";

/* =========================================================
   LOAD CLOUD MEDIA (ULTRA VERSION)
========================================================= */

async function loadCloudTracks() {
  try {

    tracksContainer.innerHTML = `
      <div class="cloud-loading">
        <div class="loader"></div>
        <p>Chargement VYNILE Cloud...</p>
      </div>
    `;

    // 🔥 CACHE FIRST
    const cache = localStorage.getItem(CACHE_KEY);
    if (cache) {
      const parsed = JSON.parse(cache);
      if (parsed?.tracks?.length) {
        tracks = parsed.tracks;
        renderTracks();
        loadTrack(0);
        return;
      }
    }

    const res = await fetch("/api/media");

    const data = await res.json();

    console.log("☁️ CLOUD FULL DATA:", data);

    const music = data.music || [];
    const videos = data.videos || [];
    const covers = data.covers || [];

    tracks = music.map((track, i) => {

      const video = videos[i]?.secure_url || "";
      const coverImg = covers[i]?.secure_url || "/vinyle/assets/logo/logo1.png";

      return {

        id: track.asset_id || `track-${i}`,

        title: cleanTitle(track.public_id),
        artist: "Zarabesso Studio",

        audio: track.secure_url,
        video: video,
        cover: coverImg,

        duration: track.duration || 0,

        // 🔥 SAAS METADATA
        views: 0,
        likes: 0,
        comments: [],

        createdAt: track.created_at || null
      };
    });

    // 💾 CACHE SAVE
    localStorage.setItem(CACHE_KEY, JSON.stringify({ tracks }));

    renderTracks();
    loadTrack(0);

  } catch (err) {
    console.error("Cloud error:", err);

    tracksContainer.innerHTML = `
      <div class="empty-cloud">
        <i class="ri-error-warning-line"></i>
        <h3>Erreur Cloud</h3>
        <p>Impossible de charger les médias</p>
      </div>
    `;
  }
}

/* =========================================================
   CLEAN TITLE
========================================================= */

function cleanTitle(name) {
  return name
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\.[^/.]+$/, "");
}

/* =========================================================
   RENDER TRACKS (ULTRA UI)
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

          <small>
            👁 ${track.views} • ❤️ ${track.likes}
          </small>
        </div>

      </div>

      <div class="track-right">
        <button class="play-icon">
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
   LOAD TRACK
========================================================= */

function loadTrack(index) {

  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  audio.src = track.audio;

  if (track.video) {
    videoPlayer.src = track.video;
    videoPlayer.style.display = "block";
    videoPlayer.muted = true;
  } else {
    videoPlayer.style.display = "none";
  }

  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;

  renderTracks();
  renderComments(track);
}
function setVinylState() {
  if (isPlaying) {
    vinyl.classList.add("playing");
  } else {
    vinyl.classList.remove("playing");
  }
}

/* =========================================================
   SELECT TRACK
========================================================= */

function selectTrack(index) {
  loadTrack(index);
  playMusic();

  // 🔥 VIEW SYSTEM
  registerView(tracks[index].id);
}

/* =========================================================
   PLAY (ANTI BLOCK MOBILE)
========================================================= */

async function playMusic() {
  try {

    const audioPlay = audio.play();

    if (videoPlayer.src) {
      videoPlayer.muted = true;
      await Promise.all([audioPlay, videoPlayer.play()]);
    } else {
      await audioPlay;
    }

    playing = true;
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    vinyl.classList.add("playing");

  } catch (err) {
    console.log("blocked autoplay", err);
  }
}
setVinylState();

/* =========================================================
   PAUSE
========================================================= */

function pauseMusic() {
  audio.pause();
  videoPlayer.pause();

  playing = false;
  playBtn.innerHTML = '<i class="ri-play-fill"></i>';
  vinyl.classList.remove("playing");
}
setVinylState();

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

document.querySelector(".progress-container")
.addEventListener("click", (e) => {
  audio.currentTime =
    (e.offsetX / e.currentTarget.clientWidth) * audio.duration;
});

/* =========================================================
   VIEWS SYSTEM (BACKEND READY)
========================================================= */

async function registerView(id) {
  try {
    await fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
  } catch (e) {}
}

/* =========================================================
   COMMENTS SYSTEM (ULTRA SAAS)
========================================================= */

/**
 * ADD COMMENT
 */
async function addComment(trackId, text, user = "Anonyme") {
  const comment = {
    id: Date.now(),
    user,
    text,
    createdAt: new Date().toISOString(),
    likes: 0
  };

  const track = tracks.find(t => t.id === trackId);
  if (!track) return;

  track.comments.push(comment);

  await syncComments(trackId, track.comments);
}

/**
 * LOAD COMMENTS UI
 */
function renderComments(trackId) {
  const track = tracks.find(t => t.id === trackId);
  if (!track) return;

  return track.comments.map(c => `
    <div class="comment">
      <strong>${c.user}</strong>
      <p>${c.text}</p>
      <small>${new Date(c.createdAt).toLocaleString()}</small>
    </div>
  `).join("");
}

/**
 * SYNC COMMENTS (BACKEND READY)
 */
async function syncComments(id, comments) {
  try {
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, comments })
    });
  } catch (e) {}
}

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();
/* =========================================================
   💬 COMMENTS SYSTEM (ULTRA PRO)
========================================================= */

const commentsBox = document.createElement("div");
commentsBox.className = "comments-box";

document.querySelector(".player-card").appendChild(commentsBox);

function renderComments(track) {

  commentsBox.innerHTML = `
    <h3>💬 Commentaires artistes</h3>

    <div class="comment-input">
      <input id="commentText" placeholder="Féliciter cet artiste..." />
      <button onclick="addComment()">Envoyer</button>
    </div>

    <div id="commentList"></div>
  `;

  const list = document.getElementById("commentList");

  (track.comments || []).forEach(c => {
    list.innerHTML += `
      <div class="comment">
        <strong>${c.user}</strong>
        <p>${c.text}</p>
      </div>
    `;
  });

}

window.addComment = function() {

  const input = document.getElementById("commentText");
  if (!input.value) return;

  const track = tracks[currentIndex];

  if (!track.comments) track.comments = [];

  track.comments.push({
    user: "Fan",
    text: input.value
  });

  input.value = "";

  renderComments(track);
}