/* =========================================================
   ☁️ VYNILE CLOUD MEDIA ENGINE
   ZARABESSO STUDIO PREMIUM VERSION
========================================================= */

/* =========================================================
   ELEMENTS
========================================================= */

const tracksContainer =
document.getElementById("spotifyTracks");

const audio =
document.getElementById("audio");

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
   PLAYER STATE
========================================================= */

let tracks = [];

let currentIndex = 0;

let isPlaying = false;

/* =========================================================
   CLOUD FETCH
========================================================= */

async function loadCloudTracks(){

  try{

    tracksContainer.innerHTML = `

    <div class="cloud-loading">

      <div class="loader"></div>

      <p>
        Chargement Cloud Music...
      </p>

    </div>

    `;

    const response =
    await fetch("/api/cloud-media");

    if(!response.ok){

      throw new Error(
        "Erreur API Cloud"
      );

    }

    const data =
    await response.json();

    console.log(
      "☁️ CLOUD DATA:",
      data
    );

    tracks =
    data.tracks || [];

    if(!tracks.length){

      tracksContainer.innerHTML = `

      <div class="empty-cloud">

        <i class="ri-cloud-off-line"></i>

        <h3>
          Aucun média trouvé
        </h3>

        <p>
          Vérifiez votre dossier
          Cloudinary.
        </p>

      </div>

      `;

      return;

    }

    renderTracks();

    loadTrack(0);

  }

  catch(err){

    console.error(
      "❌ CLOUD ERROR:",
      err
    );

    tracksContainer.innerHTML = `

    <div class="empty-cloud">

      <i class="ri-error-warning-line"></i>

      <h3>
        Impossible de charger
      </h3>

      <p>
        API Cloudinary inaccessible
      </p>

    </div>

    `;

  }

}

/* =========================================================
   RENDER TRACKS
========================================================= */

function renderTracks(){

  tracksContainer.innerHTML = "";

  tracks.forEach((track,index)=>{

    const activeClass =
    index === currentIndex
    ? "active-track"
    : "";

    const trackElement =
    document.createElement("div");

    trackElement.className =
    `spotify-track ${activeClass}`;

    trackElement.innerHTML = `

      <div class="track-left">

        <img
          src="${track.cover}"
          alt="${track.title}"
          loading="lazy"
        >

        <div class="track-info">

          <h4>
            ${track.title}
          </h4>

          <p>
            ${track.artist}
          </p>

        </div>

      </div>

      <div class="track-right">

        <span class="track-duration">

          ${formatTime(track.duration)}

        </span>

        <button class="track-play-btn">

          <i class="ri-play-fill"></i>

        </button>

      </div>

    `;

    trackElement.addEventListener(
      "click",
      ()=>{

        selectTrack(index);

      }
    );

    tracksContainer.appendChild(
      trackElement
    );

  });

}

/* =========================================================
   LOAD TRACK
========================================================= */

function loadTrack(index){

  currentIndex = index;

  const track =
  tracks[index];

  if(!track) return;

  console.log(
    "🎵 LOADING:",
    track.title
  );

  /* ===== AUDIO ===== */

  audio.src =
  track.audio;

  audio.preload =
  "metadata";

  /* ===== VIDEO ===== */

  if(track.video){

    videoPlayer.style.display =
    "block";

    videoPlayer.src =
    track.video;

    videoPlayer.poster =
    track.cover;

    videoPlayer.preload =
    "metadata";

  }

  else{

    videoPlayer.style.display =
    "none";

  }

  /* ===== TEXT ===== */

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  /* ===== COVER ===== */

  cover.src =
  track.cover;

  /* ===== ACTIVE TRACK ===== */

  renderTracks();

}

/* =========================================================
   SELECT TRACK
========================================================= */

function selectTrack(index){

  loadTrack(index);

  playMusic();

}

/* =========================================================
   PLAY
========================================================= */

async function playMusic(){

  try{

    await audio.play();

    if(videoPlayer.src){

      await videoPlayer.play();

    }

    isPlaying = true;

    playBtn.innerHTML =

    '<i class="ri-pause-fill"></i>';

    vinyl.classList.add(
      "playing"
    );

  }

  catch(err){

    console.error(
      "❌ PLAY ERROR:",
      err
    );

  }

}

/* =========================================================
   PAUSE
========================================================= */

function pauseMusic(){

  audio.pause();

  videoPlayer.pause();

  isPlaying = false;

  playBtn.innerHTML =

  '<i class="ri-play-fill"></i>';

  vinyl.classList.remove(
    "playing"
  );

}

/* =========================================================
   TOGGLE PLAY
========================================================= */

playBtn.addEventListener(
  "click",
  ()=>{

    if(isPlaying){

      pauseMusic();

    }

    else{

      playMusic();

    }

  }
);

/* =========================================================
   NEXT
========================================================= */

function nextTrack(){

  currentIndex++;

  if(currentIndex >= tracks.length){

    currentIndex = 0;

  }

  loadTrack(currentIndex);

  playMusic();

}

nextBtn.addEventListener(
  "click",
  nextTrack
);

/* =========================================================
   PREVIOUS
========================================================= */

function previousTrack(){

  currentIndex--;

  if(currentIndex < 0){

    currentIndex =
    tracks.length - 1;

  }

  loadTrack(currentIndex);

  playMusic();

}

prevBtn.addEventListener(
  "click",
  previousTrack
);

/* =========================================================
   AUTO NEXT
========================================================= */

audio.addEventListener(
  "ended",
  ()=>{

    nextTrack();

  }
);

/* =========================================================
   PROGRESS BAR
========================================================= */

audio.addEventListener(
  "timeupdate",
  ()=>{

    if(!audio.duration) return;

    const percent =

    (
      audio.currentTime
      / audio.duration
    ) * 100;

    progress.style.width =

    percent + "%";

  }
);

/* =========================================================
   CLICK SEEK
========================================================= */

document
.querySelector(
  ".progress-container"
)
.addEventListener(
  "click",
  (e)=>{

    const width =
    e.currentTarget.clientWidth;

    const clickX =
    e.offsetX;

    const duration =
    audio.duration;

    audio.currentTime =
    (clickX / width)
    * duration;

  }
);

/* =========================================================
   VOLUME
========================================================= */

if(volumeSlider){

  volumeSlider.addEventListener(
    "input",
    ()=>{

      audio.volume =
      volumeSlider.value;

      videoPlayer.volume =
      volumeSlider.value;

    }
  );

}

/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds){

  if(!seconds) return "0:00";

  const mins =
  Math.floor(seconds / 60);

  const secs =
  Math.floor(seconds % 60)
  .toString()
  .padStart(2,"0");

  return `${mins}:${secs}`;

}

/* =========================================================
   MOBILE AUTOPLAY FIX
========================================================= */

document.body.addEventListener(
  "click",
  ()=>{

    audio.load();

    videoPlayer.load();

  },
  { once:true }
);

/* =========================================================
   START APP
========================================================= */

loadCloudTracks();