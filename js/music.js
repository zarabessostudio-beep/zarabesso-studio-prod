let data = [];
let currentAudio = new Audio();
let previewAudio = new Audio();
let previewTimeout;

fetch("data/tracks1.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderLibrary();
  });

function renderLibrary(){
  const container = document.getElementById("trackList");
  container.innerHTML = "";

  data.forEach(album => {

    const albumDiv = document.createElement("div");
    albumDiv.className = "album";

    albumDiv.innerHTML = `
      <h3>${album.album}</h3>
    `;

    album.tracks.forEach(track => {

      const trackDiv = document.createElement("div");
      trackDiv.className = "track";

      trackDiv.innerHTML = `
        ${track.title} - ${track.artist}
      `;

      /* 🎧 PREVIEW PRO (SANS BUG) */
      trackDiv.addEventListener("mouseenter", ()=>{
        clearTimeout(previewTimeout);

        previewAudio.pause();
        previewAudio.src = track.audio;
        previewAudio.currentTime = 0;
        previewAudio.volume = 0.4;
        previewAudio.play();

        previewTimeout = setTimeout(()=>{
          previewAudio.pause();
        }, 10000);
      });

      trackDiv.addEventListener("mouseleave", ()=>{
        previewAudio.pause();
      });

      /* ▶️ LECTURE COMPLETE */
      trackDiv.addEventListener("click", ()=>{
        currentAudio.pause();

        currentAudio.src = track.audio;
        currentAudio.play();

        document.getElementById("title").innerText = track.title;
        document.getElementById("artist").innerText = track.artist;

        document.getElementById("cover").src = album.cover;

        document.querySelector(".vinyl").classList.add("playing");
      });

      albumDiv.appendChild(trackDiv);
    });

    container.appendChild(albumDiv);
  });
}
const playBtn = document.getElementById("play");

playBtn.addEventListener("click", () => {
  if(currentAudio.paused){
    currentAudio.play();
    document.querySelector(".vinyl").classList.add("playing");
  } else {
    currentAudio.pause();
    document.querySelector(".vinyl").classList.remove("playing");
  }
});
function changeBackground(image){
  document.body.style.background = `
    url('${image}') center/cover no-repeat fixed
  `;
}