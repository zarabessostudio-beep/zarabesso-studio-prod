// ======================================
// ☁️ AUTO CLOUD MEDIA SYSTEM
// ======================================

async function loadCloudMedia() {

  try {

    const response =
    await fetch("/api/media");

    const data =
    await response.json();

    window.ZarabessoCloud = data;

    console.log("☁️ Cloud media loaded", data);

    renderTracks(data);

  }

  catch(err) {

    console.error(
      "Cloud loading error",
      err
    );

  }

}

loadCloudMedia();