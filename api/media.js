const cloudinary = require("cloudinary").v2;

/* =========================================================
   CLOUDINARY CONFIG
========================================================= */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/* =========================================================
   CLEAN TITLE
========================================================= */

function cleanTitle(name) {

  if (!name) {
    return "Untitled";
  }

  return name
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/-/g, " ")
    .replace(/_/g, " ");

}

/* =========================================================
   API MEDIA
========================================================= */

module.exports = async function handler(req, res) {

  /* =======================================================
     CORS
  ======================================================= */

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    /* =====================================================
       ENV CHECK
    ===================================================== */

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {

      return res.status(500).json({
        success: false,
        error: "Variables Cloudinary manquantes"
      });

    }

    /* =====================================================
       LOAD VIDEOS
    ===================================================== */

    const videoResult = await cloudinary.search
      .expression(
        'resource_type:video AND folder="zarabesso-videos"'
      )
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    /* =====================================================
       LOAD MUSIC
    ===================================================== */

    const musicResult = await cloudinary.search
      .expression(
        'resource_type:video AND folder="zarabesso-music"'
      )
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    /* =====================================================
       LOAD COVERS
    ===================================================== */

    const coverResult = await cloudinary.search
      .expression(
        'resource_type:image AND folder="zarabesso-cover"'
      )
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    /* =====================================================
       SAFE ARRAYS
    ===================================================== */

    const videos = videoResult.resources || [];
    const music = musicResult.resources || [];
    const covers = coverResult.resources || [];

    /* =====================================================
       BUILD TRACKS
    ===================================================== */

    const tracks = videos.map((video, index) => {

      const musicFile = music[index] || null;
      const coverFile = covers[index] || null;

      /* ===================================================
         VIDEO URL
      =================================================== */

      const videoUrl = cloudinary.url(
        video.public_id,
        {
          resource_type: "video",
          secure: true,
          quality: "auto",
          fetch_format: "auto"
        }
      );

      /* ===================================================
         AUDIO URL
      =================================================== */

      let audioUrl = videoUrl;

      if (musicFile) {

        audioUrl = cloudinary.url(
          musicFile.public_id,
          {
            resource_type: "video",
            secure: true,
            quality: "auto",
            fetch_format: "auto"
          }
        );

      }

      /* ===================================================
         COVER URL
      =================================================== */

      let coverUrl =
        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_1/${video.public_id}.jpg`;

      if (coverFile) {

        coverUrl = cloudinary.url(
          coverFile.public_id,
          {
            resource_type: "image",
            secure: true,
            quality: "auto",
            fetch_format: "auto"
          }
        );

      }

      /* ===================================================
         RETURN TRACK
      =================================================== */

      return {

        id: video.asset_id || `track-${index}`,

        title: cleanTitle(video.public_id),

        artist: "Zarabesso Studio",

        audio: audioUrl,

        video: videoUrl,

        cover: coverUrl,

        duration: video.duration || 0,

        createdAt: video.created_at || null

      };

    });

    /* =====================================================
       CACHE
    ===================================================== */

    res.setHeader(
      "Cache-Control",
      "public, max-age=60"
    );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      total: tracks.length,

      tracks: tracks

    });

  } catch (err) {

    console.log("=================================");
    console.log("CLOUDINARY ERROR");
    console.log("=================================");
    console.log(err);

    return res.status(500).json({

      success: false,

      error: err.message || "Server Error"

    });

  }

};