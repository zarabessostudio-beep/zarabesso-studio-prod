/* =========================================================
   VYNILE PLAYER ENGINE
   CLOUDINARY FULL COMPAT VERSION
   ULTRA STABLE
   VIDEO + AUDIO SYNC
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

/* =========================================================
   STATE
========================================================= */

let tracks = [];

let currentIndex = 0;

let playing = false;

let progressRAF = null;

/* =========================================================
   CACHE
========================================================= */

const CACHE_KEY =
"vynile_cloud_cache_v5";

/* =========================================================
   LOAD TRACKS
========================================================= */

async function loadCloudTracks() {

  try {

    tracksContainer.innerHTML = `

      <div class="cloud-loading">

        <div class="loader"></div>

        <p>Chargement VYNILE Cloud...</p>

      </div>

    `;

    /* =====================================================
       CACHE FIRST
    ===================================================== */

    const cache =
    localStorage.getItem(CACHE_KEY);

    if(cache){

      const parsed =
      JSON.parse(cache);

      if(parsed?.tracks?.length){

        tracks = parsed.tracks;

        renderTracks();

        loadTrack(0);

      }

    }

    /* =====================================================
       API
    ===================================================== */

    const response =
    await fetch("/api/media");

    const data =
    await response.json();

    console.log("☁️ MEDIA:", data);

    if(!data.success){

      throw new Error(
        data.error || "API Error"
      );

    }

    tracks =
    data.tracks || [];

    /* =====================================================
       CACHE SAVE
    ===================================================== */

    localStorage.setItem(

      CACHE_KEY,

      JSON.stringify({
        tracks
      })

    );

    renderTracks();

    loadTrack(0);

  } catch(err){

    console.log(err);

    tracksContainer.innerHTML = `

      <div class="empty-cloud">

        <h3>Erreur Cloud</h3>

        <p>Impossible de charger les médias</p>

      </div>

    `;

  }

}

/* =========================================================
   RENDER TRACKS
========================================================= */

function renderTracks(){

  tracksContainer.innerHTML = "";

  const fragment =
  document.createDocumentFragment();

  tracks.forEach((track,index)=>{

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
          loading="lazy"
        >

        <div class="track-info">

          <h4>${track.title}</h4>

          <p>${track.artist}</p>

        </div>

      </div>

      <div class="track-right">

        <button class="play-icon">

          <i class="
            ${
              index === currentIndex &&
              playing
              ? "ri-pause-fill"
              : "ri-play-fill"
            }
          "></i>

        </button>

      </div>

    `;

    el.addEventListener(

      "click",

      ()=>{

        if(index === currentIndex){

          if(playing){

            pauseMusic();

          }else{

            playMusic();

          }

          return;

        }

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

function loadTrack(index){

  currentIndex = index;

  const track =
  tracks[index];

  if(!track) return;

  /* =====================================================
     RESET
  ===================================================== */

  pauseMusic();

  audio.src = "";

  videoPlayer.src = "";

  /* =====================================================
     AUDIO
  ===================================================== */

  audio.src =
  track.audio;

  audio.preload =
  "metadata";

  /* =====================================================
     VIDEO
  ===================================================== */

  if(track.video){

    videoPlayer.src =
    track.video;

    videoPlayer.load();

    videoPlayer.style.display =
    "block";

    videoPlayer.playsInline = true;

    videoPlayer.muted = true;

    videoPlayer.loop = false;

  }else{

    videoPlayer.style.display =
    "none";

  }

  /* =====================================================
     UI
  ===================================================== */

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  cover.src =
  track.cover;

  renderTracks();

  renderComments(track);

}

/* =========================================================
   PLAY
========================================================= */

async function playMusic(){

  try {

    if(!tracks.length) return;

    await audio.play();

    /* =====================================================
       VIDEO PLAY
    ===================================================== */

    if(videoPlayer.src){

      try {

        videoPlayer.currentTime =
        audio.currentTime;

        await videoPlayer.play();

      } catch(e){

        console.log(
          "video blocked",
          e
        );

      }

    }

    playing = true;

    playBtn.innerHTML = `
      <i class="ri-pause-fill"></i>
    `;

    vinyl.classList.add(
      "playing"
    );

    renderTracks();

    startProgressLoop();

  } catch(err){

    console.log(
      "play blocked",
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

  playing = false;

  playBtn.innerHTML = `
    <i class="ri-play-fill"></i>
  `;

  vinyl.classList.remove(
    "playing"
  );

  renderTracks();

  cancelAnimationFrame(
    progressRAF
  );

}

/* =========================================================
   SELECT TRACK
========================================================= */

function selectTrack(index){

  loadTrack(index);

  playMusic();

  registerView(
    tracks[index].id
  );

}

/* =========================================================
   NEXT / PREV
========================================================= */

function nextTrack(){

  currentIndex++;

  if(currentIndex >= tracks.length){

    currentIndex = 0;

  }

  loadTrack(currentIndex);

  playMusic();

}

function prevTrack(){

  currentIndex--;

  if(currentIndex < 0){

    currentIndex =
    tracks.length - 1;

  }

  loadTrack(currentIndex);

  playMusic();

}

/* =========================================================
   BUTTONS
========================================================= */

playBtn.addEventListener(

  "click",

  ()=>{

    if(playing){

      pauseMusic();

    }else{

      playMusic();

    }

  }

);

nextBtn.addEventListener(
  "click",
  nextTrack
);

prevBtn.addEventListener(
  "click",
  prevTrack
);

/* =========================================================
   PROGRESS LOOP
========================================================= */

function startProgressLoop(){

  cancelAnimationFrame(
    progressRAF
  );

  function update(){

    if(audio.duration){

      const percent =

      (
        audio.currentTime /
        audio.duration
      ) * 100;

      progress.style.width =
      percent + "%";

    }

    if(playing){

      progressRAF =
      requestAnimationFrame(
        update
      );

    }

  }

  update();

}

/* =========================================================
   SEEK
========================================================= */

document
.querySelector(".progress-container")
.addEventListener(

  "click",

  (e)=>{

    if(!audio.duration) return;

    const rect =
    e.currentTarget
    .getBoundingClientRect();

    const percent =

    (e.clientX - rect.left)
    / rect.width;

    const seekTime =
    percent * audio.duration;

    audio.currentTime =
    seekTime;

    if(videoPlayer.src){

      videoPlayer.currentTime =
      seekTime;

    }

  }

);

/* =========================================================
   AUDIO SYNC VIDEO
========================================================= */

audio.addEventListener(

  "timeupdate",

  ()=>{

    if(

      videoPlayer.src &&

      Math.abs(

        videoPlayer.currentTime -
        audio.currentTime

      ) > 0.3

    ){

      videoPlayer.currentTime =
      audio.currentTime;

    }

  }

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
   MOBILE FIX
========================================================= */

document.addEventListener(

  "visibilitychange",

  ()=>{

    if(document.hidden){

      videoPlayer.pause();

    }else if(playing){

      videoPlayer.play()
      .catch(()=>{});

    }

  }

);

/* =========================================================
   VIEW SYSTEM
========================================================= */

async function registerView(id){

  try {

    await fetch(

      "/api/view",

      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({
          id
        })

      }

    );

  } catch(e){

    console.log(e);

  }

}

/* =========================================================
   COMMENTS UI
========================================================= */

const commentsBox =
document.createElement("div");

commentsBox.className =
"comments-box";

document
.querySelector(".player-card")
.appendChild(commentsBox);

/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(track){

  commentsBox.innerHTML = `

    <h3>
      💬 Commentaires artistes
    </h3>

    <div class="comment-input">

      <input

        id="commentText"

        placeholder="
        Féliciter cet artiste...
        "

      >

      <button onclick="addComment()">

        Envoyer

      </button>

    </div>

    <div id="commentList"></div>

  `;

  const list =
  document.getElementById(
    "commentList"
  );

  (track.comments || [])
  .forEach((c)=>{

    list.innerHTML += `

      <div class="comment">

        <strong>
          ${c.user}
        </strong>

        <p>
          ${c.text}
        </p>

      </div>

    `;

  });

}

/* =========================================================
   ADD COMMENT
========================================================= */

window.addComment =
function(){

  const input =
  document.getElementById(
    "commentText"
  );

  if(!input.value) return;

  const track =
  tracks[currentIndex];

  if(!track.comments){

    track.comments = [];

  }

  track.comments.push({

    user:"Fan",

    text:input.value,

    createdAt:
    new Date().toISOString()

  });

  input.value = "";

  renderComments(track);

};

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();