/* =========================================
   ☁️ VYNILE CLOUD PREMIUM PLAYER
========================================= */

/* ================= CLOUDINARY ================= */

const CLOUD_NAME = "drywjcs1w";

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

const tracks = [

  {
    title: "Diarynofy",
    artist: "Zarabesso Studio",

    cover:
    "assets/covers/cover1.jpg",

    audio:
    "https://res.cloudinary.com/drywjcs1w/video/upload/zarabesso-music/track1.mp3",

    video:
    "https://res.cloudinary.com/drywjcs1w/video/upload/diarynofy_zwdera.mp4"
  },

  {
    title: "Tsodrano",
    artist: "Zarabesso Studio",

    cover:
    "assets/covers/cover2.jpg",

    audio:
    "https://res.cloudinary.com/drywjcs1w/video/upload/zarabesso-music/track2.mp3",

    video:
    "https://res.cloudinary.com/drywjcs1w/video/upload/tsodrano_u6f1r0.mp4"
  },

  {
    title: "Tompondaka",
    artist: "Zarabesso Studio",

    cover:
    "assets/covers/cover3.jpg",

    audio:
    "https://res.cloudinary.com/drywjcs1w/video/upload/zarabesso-music/track3.mp3",

    video:
    "https://res.cloudinary.com/drywjcs1w/video/upload/tompondaka_t18xdz.mp4"
  }

];

/* ================= VARIABLES ================= */

let currentIndex = 0;

let playing = false;

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

  /* AUDIO */

  audio.src = track.audio;

  /* VIDEO */

  videoPlayer.src = track.video;

  /* TEXT */

  title.textContent = track.title;

  artist.textContent = track.artist;

  /* COVER */

  cover.src = track.cover;

}

/* =========================================
   SELECT TRACK
========================================= */

function selectTrack(index){

  loadTrack(index);

  playMusic();

}

/* =========================================
   PLAY
========================================= */

function playMusic(){

  audio.play();

  videoPlayer.play();

  playing = true;

  playBtn.innerHTML =
  '<i class="ri-pause-fill"></i>';

  vinyl.classList.add("playing");

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

  vinyl.classList.remove("playing");

}

/* =========================================
   PLAY BUTTON
========================================= */

playBtn.addEventListener("click",()=>{

  if(!playing){

    playMusic();

  }else{

    pauseMusic();

  }

});

/* =========================================
   NEXT
========================================= */

nextBtn.addEventListener("click",()=>{

  currentIndex++;

  if(currentIndex >= tracks.length){

    currentIndex = 0;

  }

  loadTrack(currentIndex);

  playMusic();

});

/* =========================================
   PREV
========================================= */

prevBtn.addEventListener("click",()=>{

  currentIndex--;

  if(currentIndex < 0){

    currentIndex = tracks.length - 1;

  }

  loadTrack(currentIndex);

  playMusic();

});

/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener("ended",()=>{

  currentIndex++;

  if(currentIndex >= tracks.length){

    currentIndex = 0;

  }

  loadTrack(currentIndex);

  playMusic();

});

/* =========================================
   PROGRESS
========================================= */

audio.addEventListener("timeupdate",()=>{

  const percent =
  (audio.currentTime / audio.duration) * 100;

  progress.style.width =
  percent + "%";

});

/* =========================================
   START
========================================= */

renderTracks();

loadTrack(0);
