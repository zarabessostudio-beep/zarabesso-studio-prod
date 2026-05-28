/* =========================================================
   ZARABESSO VIDEO PLAYER PRO
   YOUTUBE STYLE - VIDEO ONLY ENGINE
========================================================= */

const tracksContainer = document.getElementById("spotifyTracks");

const videoPlayer = document.getElementById("videoPlayer");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

let tracks = [];
let currentIndex = 0;
let playing = false;

/* =========================================================
   LOAD MEDIA
========================================================= */

async function loadCloudTracks() {

  try {

    const res = await fetch("/api/media", {
      headers: { "Accept": "application/json" }
    });

    const data = await res.json();

    if (!data.success || !data.tracks) {
      throw new Error("Invalid API");
    }

    tracks = data.tracks.filter(t => t.video);

    renderTracks();
    loadTrack(0);

  } catch (err) {
    console.error(err);
    tracksContainer.innerHTML = "Erreur chargement vidéo";
  }

}

/* =========================================================
   RENDER LIST (YOUTUBE STYLE)
========================================================= */

function renderTracks() {

  tracksContainer.innerHTML = "";

  tracks.forEach((track, i) => {

    const el = document.createElement("div");
    el.className = "spotify-track";

    el.innerHTML = `
      <img src="${track.cover}" />
      <div>
        <h4>${track.title}</h4>
        <p>${track.artist}</p>
      </div>
      <button>▶</button>
    `;

    el.onclick = () => {
      loadTrack(i);
      playVideo();
    };

    tracksContainer.appendChild(el);

  });

}

/* =========================================================
   LOAD VIDEO (MIME SAFE CORE)
========================================================= */

function loadTrack(i) {

  currentIndex = i;

  const track = tracks[i];
  if (!track) return;

  pauseVideo();

  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  setTimeout(() => {

    videoPlayer.src = track.video;

    videoPlayer.crossOrigin = "anonymous";
    videoPlayer.preload = "metadata";
    videoPlayer.playsInline = true;
    videoPlayer.disablePictureInPicture = false;

    videoPlayer.muted = true;
    videoPlayer.load();

  }, 100);

  title.textContent = track.title;
  artist.textContent = track.artist;

}

/* =========================================================
   PLAY VIDEO
========================================================= */

async function playVideo() {

  try {

    await videoPlayer.play();
    playing = true;

  } catch (e) {
    console.log("PLAY BLOCKED", e);
  }

}

/* =========================================================
   PAUSE
========================================================= */

function pauseVideo() {
  videoPlayer.pause();
  playing = false;
}

/* =========================================================
   CONTROLS
========================================================= */

document.getElementById("play").onclick = () =>
  playing ? pauseVideo() : playVideo();

document.getElementById("next").onclick = () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playVideo();
};

document.getElementById("prev").onclick = () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playVideo();
};

/* =========================================================
   AUTO NEXT
========================================================= */

videoPlayer.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playVideo();
});

/* =========================================================
   INIT
========================================================= */

loadCloudTracks();