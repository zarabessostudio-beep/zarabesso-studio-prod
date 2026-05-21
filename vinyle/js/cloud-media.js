/* =========================================
   ☁️ VYNILE AUTO CLOUD PLAYER
========================================= */

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

let tracks = [];

let currentIndex = 0;

let playing = false;

/* =========================================
   LOAD CLOUD MEDIA
========================================= */

async function loadCloudTracks(){

  try{

    const response =
    await fetch("/api/media");

    const data =
    await response.json();

    console.log("☁️ API DATA:", data);

    // =========================
    // IMPORTANT FIX
    // =========================

    tracks = data.tracks || [];

    console.log(
      "🎵 TRACKS:",
      tracks
    );

    if(tracks.length === 0){

      tracksContainer.innerHTML = `

      <div style="
      padding:30px;
      text-align:center;
      color:#aaa;
      ">

      Aucun média trouvé dans Cloudinary

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

  }

}

/* =========================================
   RENDER TRACKS
========================================= */

function renderTracks(){

  tracksContainer.innerHTML = "";

  tracks.forEach((track,index)=>{

    tracksContainer.innerHTML += `

    <div
      class="spotify-track"
      onclick="selectTrack(${index})"
    >

      <div class="track-left">

        <img
          src="${track.cover}"
          alt="${track.title}"
        >

        <div class="track-info">

          <h4>${track.title}</h4>

          <p>${track.artist}</p>

        </div>

      </div>

      <div class="play-icon">

        <i class="ri-play-fill"></i>

      </div>

    </div>

    `;

  });

}

/* =========================================
   LOAD TRACK
========================================= */

function loadTrack(index){

  currentIndex = index;

  const track =
  tracks[index];

  if(!track) return;

  // AUDIO

  audio.src =
  track.audio;

  // VIDEO

  if(track.video){

    videoPlayer.style.display =
    "block";

    videoPlayer.src =
    track.video;

  }

  else{

    videoPlayer.style.display =
    "none";
  }

  // TEXT

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  // COVER

  cover.src =
  track.cover;

}

/* =========================================
   SELECT TRACK
========================================= */

window.selectTrack =
function(index){

  loadTrack(index);

  playMusic();

}

/* =========================================
   PLAY
========================================= */

async function playMusic(){

  try{

    await audio.play();

    if(videoPlayer.src){

      videoPlayer.play();

    }

    playing = true;

    playBtn.innerHTML =
    '<i class="ri-pause-fill"></i>';

    vinyl.classList.add(
      "playing"
    );

  }

  catch(err){

    console.log(err);

  }

}

/* =========================================
   PAUSE
========================================= */

function pauseMusic(){

  audio.pause();

  videoPlayer.pause();

  playing = false;

  playBtn.innerHTML =
  '<i class="ri-play-fill"></i>';

  vinyl.classList.remove(
    "playing"
  );

}

/* =========================================
   PLAY BUTTON
========================================= */

playBtn.addEventListener(
  "click",
  ()=>{

    if(!playing){

      playMusic();

    }

    else{

      pauseMusic();

    }

  }
);

/* =========================================
   NEXT
========================================= */

nextBtn.addEventListener(
  "click",
  ()=>{

    currentIndex++;

    if(currentIndex >= tracks.length){

      currentIndex = 0;

    }

    loadTrack(currentIndex);

    playMusic();

  }
);

/* =========================================
   PREV
========================================= */

prevBtn.addEventListener(
  "click",
  ()=>{

    currentIndex--;

    if(currentIndex < 0){

      currentIndex =
      tracks.length - 1;

    }

    loadTrack(currentIndex);

    playMusic();

  }
);

/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener(
  "ended",
  ()=>{

    nextBtn.click();

  }
);

/* =========================================
   PROGRESS
========================================= */

audio.addEventListener(
  "timeupdate",
  ()=>{

    if(!audio.duration) return;

    const percent =
    (audio.currentTime
    / audio.duration)
    * 100;

    progress.style.width =
    percent + "%";

  }
);

/* =========================================
   START
========================================= */

loadCloudTracks();