const tracksContainer = document.getElementById("spotifyTracks");

const videoPlayer = document.getElementById("videoPlayer");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const currentTimeEl =
document.getElementById("currentTime");

const durationTimeEl =
document.getElementById("durationTime");

const volumeSlider =
document.getElementById("volume");

const vinyl =
document.getElementById("vinyl");

const favoriteBtn =
document.getElementById("favoriteBtn");

const fullscreenBtn =
document.getElementById("fullscreenBtn");

const loopBtn =
document.getElementById("loopBtn");

const downloadBtn =
document.getElementById("downloadBtn");

let tracks = [];

let currentIndex = 0;

let playing = false;

let loopMode = false;

const FAVORITES_KEY =
"vynile_favorites";

const PLAYLISTS_KEY =
"vynile_playlists";

async function loadCloudTracks(){

try{

const res =
await fetch("/api/media");

const data =
await res.json();

if(!data.success)
throw new Error();

tracks =
data.tracks || [];

renderTracks();

if(tracks.length){

loadTrack(0);

}

}catch(err){

tracksContainer.innerHTML =
"<p>Erreur Cloudinary</p>";

}

}

function renderTracks(){

tracksContainer.innerHTML = "";

tracks.forEach((track,index)=>{

const div =
document.createElement("div");

div.className =
"spotify-track";

div.innerHTML = ` <img src="${track.cover}">

<div>
<h4>${track.title}</h4>
<p>${track.artist}</p>
</div>
<button>▶</button>
`;

div.onclick = ()=>{

loadTrack(index);

playMedia();

};

tracksContainer.appendChild(div);

});

}
function loadTrack(index){

  currentIndex = index;

  const track =
  tracks[index];

  if(!track){
    return;
  }

  videoPlayer.pause();

  videoPlayer.removeAttribute("src");

  videoPlayer.src =
  track.video;

  videoPlayer.preload =
  "metadata";

  videoPlayer.crossOrigin =
  "anonymous";

  videoPlayer.load();

  title.textContent =
  track.title;

  artist.textContent =
  track.artist;

  cover.src =
  track.cover;

  console.log(
    "VIDEO URL:",
    track.video
  );

}

async function playMedia(){

try{

await videoPlayer.play();

playing = true;

playBtn.innerHTML =
'<i class="ri-pause-fill"></i>';

vinyl.classList.add("playing");

}catch(err){

console.log(err);

}

}

function pauseMedia(){

videoPlayer.pause();

playing = false;

playBtn.innerHTML =
'<i class="ri-play-fill"></i>';

vinyl.classList.remove("playing");

}

playBtn.onclick = ()=>{

playing
? pauseMedia()
: playMedia();

};

nextBtn.onclick = ()=>{

currentIndex =
(currentIndex+1)
% tracks.length;

loadTrack(currentIndex);

playMedia();

};

prevBtn.onclick = ()=>{

currentIndex =
(currentIndex-1+tracks.length)
% tracks.length;

loadTrack(currentIndex);

playMedia();

};

videoPlayer.addEventListener(
"timeupdate",
()=>{

if(!videoPlayer.duration)
return;

const percent =
(videoPlayer.currentTime /
videoPlayer.duration)*100;

progress.style.width =
percent+"%";

currentTimeEl.textContent =
formatTime(
videoPlayer.currentTime
);

durationTimeEl.textContent =
formatTime(
videoPlayer.duration
);

}
);

document
.querySelector(
".progress-container"
)
.addEventListener(
"click",
e=>{

const width =
e.currentTarget.clientWidth;

const percent =
e.offsetX/width;

videoPlayer.currentTime =
percent*
videoPlayer.duration;

}
);

function formatTime(sec){

const min =
Math.floor(sec/60);

const s =
Math.floor(sec%60);

return `${min}:${String(s)
.padStart(2,"0")}`;

}

volumeSlider.addEventListener(
"input",
e=>{

videoPlayer.volume =
e.target.value;

}
);

fullscreenBtn.onclick =
()=>{

if(
videoPlayer.requestFullscreen
){

videoPlayer.requestFullscreen();

}

};

loopBtn.onclick = ()=>{

loopMode =
!loopMode;

videoPlayer.loop =
loopMode;

loopBtn.classList.toggle(
"active",
loopMode
);

};

videoPlayer.addEventListener(
"ended",
()=>{

if(loopMode)
return;

currentIndex =
(currentIndex+1)
% tracks.length;

loadTrack(currentIndex);

playMedia();

}
);

downloadBtn.onclick = ()=>{

const track =
tracks[currentIndex];

if(!track) return;

const a =
document.createElement("a");

a.href =
track.video;

a.download =
track.title;

document.body.appendChild(a);

a.click();

a.remove();

};

favoriteBtn.onclick = ()=>{

const track =
tracks[currentIndex];

let favs =
JSON.parse(
localStorage.getItem(
FAVORITES_KEY
)||"[]"
);

const exists =
favs.find(
f=>f.id===track.id
);

if(exists){

favs =
favs.filter(
f=>f.id!==track.id
);

}else{

favs.push(track);

}

localStorage.setItem(
FAVORITES_KEY,
JSON.stringify(favs)
);

};

function createPlaylist(
name,
ids
){

const playlists =
JSON.parse(
localStorage.getItem(
PLAYLISTS_KEY
)||"{}"
);

playlists[name] =
ids;

localStorage.setItem(
PLAYLISTS_KEY,
JSON.stringify(playlists)
);

}

loadCloudTracks();

const video =
document.getElementById("videoPlayer");

const controls =
document.getElementById("videoControls");

const wrapper =
document.getElementById("videoWrapper");

let hideTimer;

/* =========================
SHOW
========================= */

function showControls(){

controls.classList.add("show");

clearTimeout(hideTimer);

if(!video.paused){

hideTimer = setTimeout(()=>{

controls.classList.remove("show");

},2000);

}

}

/* =========================
MOUSE MOVE
========================= */

wrapper.addEventListener(
"mousemove",
showControls
);

wrapper.addEventListener(
"mouseenter",
showControls
);

/* =========================
PAUSE
========================= */

video.addEventListener(
"pause",
()=>{

controls.classList.add("show");

}
);

/* =========================
PLAY
========================= */

video.addEventListener(
"play",
()=>{

showControls();

}
);

/* =========================
MOBILE TOUCH
========================= */

wrapper.addEventListener(
"touchstart",
showControls
);
videoPlayer.addEventListener("error",()=>{

  console.error(
    "VIDEO ERROR",
    videoPlayer.error
  );

});

videoPlayer.addEventListener("loadedmetadata",()=>{

  console.log(
    "VIDEO LOADED"
  );

});

videoPlayer.addEventListener("canplay",()=>{

  console.log(
    "VIDEO READY"
  );

});