/* ================= CLOUDINARY CONFIG ================= */

const CLOUD_NAME = "TON_CLOUD_NAME";

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

/* ================= LOAD CLOUDINARY ================= */

async function loadCloudinaryTracks(){

try{

const response = await fetch(

`https://res.cloudinary.com/${CLOUD_NAME}/image/list/zarabesso-cover.json`

);

const data = await response.json();

tracks = data.resources.map(item=>{

const filename =
item.public_id.split("/").pop();

return{

title: formatTitle(filename),

artist: "Zarabesso Studio",

cover:
`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${item.public_id}.jpg`,

audio:
`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/zarabesso-music/${filename}.mp3`,

video:
`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/zarabesso-video/${filename}.mp4`

};

});

renderTracks();

if(tracks.length > 0){

loadTrack(0);

}

}catch(error){

console.log("Cloudinary Error :", error);

}

}

/* ================= FORMAT TITLE ================= */

function formatTitle(text){

return text
.replace(/-/g," ")
.replace(/\b\w/g,l=>l.toUpperCase());

}

/* ================= RENDER TRACKS ================= */

function renderTracks(){

tracksContainer.innerHTML = "";

tracks.forEach((track,index)=>{

tracksContainer.innerHTML += `

<div class="spotify-track"
onclick="loadTrack(${index}); playMusic();">

<div class="track-left">

<img
loading="lazy"
src="${track.cover}">

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

/* ================= LOAD TRACK ================= */

function loadTrack(index){

currentIndex = index;

const track = tracks[index];

audio.src = track.audio;

title.textContent = track.title;

artist.textContent = track.artist;

cover.src = track.cover;

/* VIDEO */

videoPlayer.src = track.video;

videoPlayer.style.display = "block";

}

/* ================= PLAY ================= */

function playMusic(){

audio.play();

playing = true;

playBtn.innerHTML =
'<i class="ri-pause-fill"></i>';

vinyl.classList.add("playing");

}

/* ================= PAUSE ================= */

function pauseMusic(){

audio.pause();

playing = false;

playBtn.innerHTML =
'<i class="ri-play-fill"></i>';

vinyl.classList.remove("playing");

}

/* ================= PLAY BUTTON ================= */

playBtn.addEventListener("click",()=>{

if(!playing){

playMusic();

}else{

pauseMusic();

}

});

/* ================= NEXT ================= */

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex >= tracks.length){

currentIndex = 0;

}

loadTrack(currentIndex);

playMusic();

});

/* ================= PREV ================= */

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex < 0){

currentIndex = tracks.length - 1;

}

loadTrack(currentIndex);

playMusic();

});

/* ================= AUTO NEXT ================= */

audio.addEventListener("ended",()=>{

currentIndex++;

if(currentIndex >= tracks.length){

currentIndex = 0;

}

loadTrack(currentIndex);

playMusic();

});

/* ================= PROGRESS ================= */

audio.addEventListener("timeupdate",()=>{

const percent =
(audio.currentTime / audio.duration) * 100;

progress.style.width = percent + "%";

});

/* ================= START ================= */

loadCloudinaryTracks();