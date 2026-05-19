/* =========================================
   ☁️ VYNILE AUTO CLOUD PLAYER
========================================= */

/* ================= ELEMENTS ================= */

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

/* ================= TRACKS ================= */

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

    console.log(
      "☁️ CLOUD MEDIA:",
      data
    );

    const music =
    data.music || [];

    const videos =
    data.videos || [];

    const covers =
    data.covers || [];

    tracks = music.map((track,index)=>{

      const video =
      videos[index]
      ? videos[index].secure_url
      : "";

      const coverImage =
      covers[index]
      ? covers[index].secure_url
      : "/vinyle/assets/logo/logo1.png";

      return {

        title:
        cleanTitle(track.public_id),

        artist:
        "Zarabesso Studio",

        audio:
        track.secure_url,

        video:
        video,

        cover:
        coverImage

      };

    });

    renderTracks();

    if(tracks.length > 0){

      loadTrack(0);

    }

  }

  catch(err){

    console.error(
      "❌ Cloud loading error:",
      err
    );

  }

}

/* =========================================
   CLEAN TITLE
========================================= */

function cleanTitle(name){

  return name
  .replace(/_/g," ")
  .replace(/-/g," ")
  .replace(/\.[^/.]+$/,"");

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
          loading="lazy"
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

  const track = tracks[index];

  if(!track) return;

  /* AUDIO */

  audio.src = track.audio;

  /* VIDEO */

  if(track.video){

    videoPlayer.style.display = "block";

    videoPlayer.src = track.video;

  }else{

    videoPlayer.style.display = "none";

  }

  /* TEXT */

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  /* COVER */

  cover.src =
  track.cover;

}

/* =========================================
   SELECT TRACK
========================================= */

function selectTrack(index){

  loadTrack(index);

  playMusic();

}

/* =========================================
   PLAY MUSIC
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

    console.log(
      "Playback blocked:",
      err
    );

  }

}

/* =========================================
   PAUSE MUSIC
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

    }else{

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

    currentIndex++;

    if(currentIndex >= tracks.length){

      currentIndex = 0;

    }

    loadTrack(currentIndex);

    playMusic();

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
    (audio.currentTime /
    audio.duration) * 100;

    progress.style.width =
    percent + "%";

  }
);

/* =========================================
   CLICK PROGRESS
========================================= */

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

/* =========================================
   START
========================================= */

loadCloudTracks();