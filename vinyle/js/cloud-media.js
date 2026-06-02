/* =========================================================
   ☁️ VYNILE CLOUD MEDIA ENGINE
   ZARABESSO STUDIO PREMIUM VERSION
   CLOUDINARY VIDEO FIX VERSION
========================================================= */

/* =========================================================
   ELEMENTS
========================================================= */

const tracksContainer =
document.getElementById("spotifyTracks");

const videoPlayer =
document.getElementById("videoPlayer");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const cover =
document.getElementById("cover");

const playBtn =
document.getElementById("play");

const nextBtn =
document.getElementById("next");

const prevBtn =
document.getElementById("prev");

const progress =
document.getElementById("progress");

const vinyl =
document.getElementById("vinyl");

const volumeSlider =
document.getElementById("volume");

/* =========================================================
   STATE
========================================================= */

let tracks = [];

let currentIndex = 0;

let isPlaying = false;

/* =========================================================
   CACHE
========================================================= */

const CACHE_KEY =
"vynile_tracks_cache_v3";

/* =========================================================
   LOAD TRACKS
========================================================= */

async function loadCloudTracks() {

  try {

    tracksContainer.innerHTML = `
      <div class="cloud-loading">
        <div class="loader"></div>
        <p>Chargement Cloud Music...</p>
      </div>
    `;

    /* =========================================
       CACHE FIRST
    ========================================= */

    const cached =
    localStorage.getItem(CACHE_KEY);

    if (cached) {

      const parsed =
      JSON.parse(cached);

      if (
        parsed &&
        parsed.tracks &&
        parsed.tracks.length
      ) {

        tracks = parsed.tracks;

        renderTracks();

        loadTrack(0);

        return;

      }

    }

    /* =========================================
       API
    ========================================= */

    const res =
    await fetch("/api/media");

    if (!res.ok) {

      throw new Error(
        "API ERROR"
      );

    }

    const data =
    await res.json();

    console.log("☁️ CLOUD:", data);

    if (!data.success) {

      throw new Error(
        data.error || "API ERROR"
      );

    }

    tracks =
    data.tracks || [];

    /* =========================================
       EMPTY
    ========================================= */

    if (!tracks.length) {

      tracksContainer.innerHTML = `
        <div class="empty-cloud">
          <i class="ri-cloud-off-line"></i>
          <h3>Aucun média trouvé</h3>
        </div>
      `;

      return;

    }

    /* =========================================
       SAVE CACHE
    ========================================= */

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        tracks
      })
    );

    /* =========================================
       INIT
    ========================================= */

    renderTracks();

    loadTrack(0);

  } catch (err) {

    console.log(err);

    tracksContainer.innerHTML = `
      <div class="empty-cloud">
        <i class="ri-error-warning-line"></i>
        <h3>Erreur Cloudinary</h3>
      </div>
    `;

  }

}

/* =========================================================
   RENDER TRACKS
========================================================= */

function renderTracks() {

  tracksContainer.innerHTML = "";

  const fragment =
  document.createDocumentFragment();

  tracks.forEach((track, index) => {

    const el =
    document.createElement("div");

    el.className =
    `spotify-track ${
      index === currentIndex
      ? "active-track"
      : ""
    }`;

    el.innerHTML = `

      <div class="track-left">

        <img
        src="${track.cover}"
        loading="lazy">

        <div class="track-info">

          <h4>${track.title}</h4>

          <p>${track.artist}</p>

        </div>

      </div>

      <div class="track-right">

        <span>
          ${formatTime(track.duration)}
        </span>

        <button class="track-play-btn">
          <i class="ri-play-fill"></i>
        </button>

      </div>

    `;

    el.addEventListener(
      "click",
      () => {
        selectTrack(index);
      }
    );

    fragment.appendChild(el);

  });

  tracksContainer.appendChild(fragment);

}

/* =========================================================
   LOAD TRACK
========================================================= */

function loadTrack(index) {

  currentIndex = index;

  const track =
  tracks[index];

  if (!track) {
    return;
  }

  /* =========================================
     RESET
  ========================================= */


  videoPlayer.pause();


  /* =========================================
     VIDEO
  ========================================= */

  if (track.video) {

    videoPlayer.style.display =
    "block";

    videoPlayer.src =
    track.video;

    videoPlayer.setAttribute(
      "playsinline",
      true
    );

    videoPlayer.setAttribute(
      "webkit-playsinline",
      true
    );

    videoPlayer.setAttribute(
      "crossorigin",
      "anonymous"
    );

    videoPlayer.preload =
    "metadata";

    videoPlayer.load();

  } else {

    videoPlayer.style.display =
    "none";

  }

  /* =========================================
     UI
  ========================================= */

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  cover.src =
  track.cover;

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
   PLAY
========================================================= */

async function playMusic() {

  try {

    const track =
    tracks[currentIndex];

    if (!track) {
      return;
    }


    /* =====================================
       VIDEO
    ===================================== */

    if (track.video) {

      videoPlayer.muted = true;

      try {

        await videoPlayer.play();

      } catch (videoErr) {

        console.log(
          "VIDEO PLAY ERROR:",
          videoErr
        );

      }

    }

    /* =====================================
       UI
    ===================================== */

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="ri-pause-fill"></i>';

    vinyl.classList.add(
      "playing"
    );

    sendView();

  } catch (err) {

    console.log(
      "PLAY ERROR:",
      err
    );

  }

}

/* =========================================================
   PAUSE
========================================================= */

function pauseMusic() {


  videoPlayer.pause();

  isPlaying = false;

  playBtn.innerHTML =
  '<i class="ri-play-fill"></i>';

  vinyl.classList.remove(
    "playing"
  );

}

/* =========================================================
   NEXT
========================================================= */

function nextTrack() {

  currentIndex =
  (currentIndex + 1)
  % tracks.length;

  loadTrack(currentIndex);

  playMusic();

}

/* =========================================================
   PREV
========================================================= */

function prevTrack() {

  currentIndex =
  (
    currentIndex - 1 +
    tracks.length
  ) % tracks.length;

  loadTrack(currentIndex);

  playMusic();

}

/* =========================================================
   BUTTONS
========================================================= */

nextBtn.onclick =
nextTrack;

prevBtn.onclick =
prevTrack;

playBtn.onclick = () => {

  if (isPlaying) {

    pauseMusic();

  } else {

    playMusic();

  }

};





/* =========================================================
   VOLUME
========================================================= */


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

  if (!seconds) {
    return "0:00";
  }

  const minutes =
  Math.floor(seconds / 60);

  const secs =
  Math.floor(seconds % 60);

  return `${minutes}:${String(secs).padStart(2,"0")}`;

}

/* =========================================================
   STATS
========================================================= */

async function sendView() {

  try {

    await fetch("/api/view", {

      method: "POST",

      headers: {
        "Content-Type":
        "application/json"
      },

      body: JSON.stringify({

        id:
        tracks[currentIndex]?.id

      })

    });

  } catch (e) {

    console.log(e);

  }

}

/* =========================================================
   MOBILE UNLOCK
========================================================= */

document.body.addEventListener(
  "click",
  () => {

    

    videoPlayer.load();

  },
  { once: true }
);

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();