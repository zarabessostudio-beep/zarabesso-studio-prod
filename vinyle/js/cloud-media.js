// ======================================
// ☁️ ZARABESSO CLOUD MEDIA SYSTEM
// ======================================

const audio = document.getElementById("audio");
const video = document.getElementById("videoPlayer");

const cover = document.getElementById("cover");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const tracksContainer =
document.getElementById("tracksContainer");

const spotifyTracks =
document.getElementById("spotifyTracks");

let tracks = [];

let currentTrack = 0;

// ======================================
// LOAD CLOUD MEDIA
// ======================================

async function loadCloudMedia() {

  try {

    const response =
    await fetch("/api/media");

    const data =
    await response.json();

    tracks = data.tracks;

    console.log("☁️ CLOUD READY", tracks);

    renderTracks();

    if(tracks.length > 0){

      loadTrack(0);

    }

  }

  catch(err){

    console.error(
      "Cloud Error",
      err
    );

  }

}

loadCloudMedia();

// ======================================
// LOAD TRACK
// ======================================

function loadTrack(index){

  currentTrack = index;

  const track = tracks[index];

  audio.src = track.audio;

  video.src = track.video;

  cover.src = track.cover;

  title.innerText = track.title;

  artist.innerText = track.artist;

}

// ======================================
// PLAY / PAUSE
// ======================================

playBtn.addEventListener("click", () => {

  if(audio.paused){

    audio.play();

    if(video.src){

      video.play();

    }

    playBtn.innerHTML =
    '<i class="ri-pause-fill"></i>';

  }

  else {

    audio.pause();
    video.pause();

    playBtn.innerHTML =
    '<i class="ri-play-fill"></i>';

  }

});

// ======================================
// NEXT
// ======================================

nextBtn.addEventListener("click", () => {

  currentTrack++;

  if(currentTrack >= tracks.length){

    currentTrack = 0;

  }

  loadTrack(currentTrack);

  audio.play();

});

// ======================================
// PREV
// ======================================

prevBtn.addEventListener("click", () => {

  currentTrack--;

  if(currentTrack < 0){

    currentTrack = tracks.length - 1;

  }

  loadTrack(currentTrack);

  audio.play();

});

// ======================================
// RENDER TRACKS
// ======================================

function renderTracks(){

  tracksContainer.innerHTML = "";

  spotifyTracks.innerHTML = "";

  tracks.forEach((track, index) => {

    const card = document.createElement("div");

    card.className = "track-card";

    card.innerHTML = `

      <img src="${track.cover}">

      <h3>${track.title}</h3>

      <p>${track.artist}</p>

      <button onclick="playTrack(${index})">
        Lecture
      </button>

      <a
      href="${track.audio}"
      download
      class="download-btn">

      Télécharger

      </a>

    `;

    tracksContainer.appendChild(card);

    // =====================
    // SPOTIFY LIST
    // =====================

    const row = document.createElement("div");

    row.className = "spotify-track";

    row.innerHTML = `

      <img src="${track.cover}">

      <div>

        <h4>${track.title}</h4>

        <p>${track.artist}</p>

      </div>

      <button onclick="playTrack(${index})">

        <i class="ri-play-fill"></i>

      </button>

    `;

    spotifyTracks.appendChild(row);

  });

}

// ======================================
// PLAY TRACK
// ======================================

window.playTrack = function(index){

  loadTrack(index);

  audio.play();

  if(video.src){

    video.play();

  }

}
const volume =
document.getElementById("volume");

volume.addEventListener("input", () => {

  audio.volume = volume.value;

  video.volume = volume.value;

});