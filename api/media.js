const cloudinary = require("cloudinary").v2;

/* =========================================================
   CLOUDINARY CONFIG
========================================================= */

cloudinary.config({

  cloud_name:
  process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
  process.env.CLOUDINARY_API_KEY,

  api_secret:
  process.env.CLOUDINARY_API_SECRET,

  secure: true

});

/* =========================================================
   MANUAL TRACKS
========================================================= */

const TRACKS = [

  {
    title: "Stella Lyncha",

    video:
    "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y"
  },

  {
    title: "Joe Fils x Jaojoby",

    video:
    "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm"
  },

  {
    title: "Refano",

    video:
    "zarabesso-videos/Refano_-_Fanambadia_Official_Music_Video_vddrht"
  },

  {
    title: "Salama",

    video:
    "zarabesso-videos/Salama_zbct0v"
  },

  {
    title: "Tsodrano",

    video:
    "zarabesso-videos/tsodrano_u6f1r0"
  },

  {
    title: "Tompondaka",

    video:
    "zarabesso-videos/tompondaka_t18xdz"
  }

];

/* =========================================================
   API MEDIA
========================================================= */

module.exports =
async function handler(req, res) {

  /* =======================================================
     CORS
  ======================================================= */

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

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
       BUILD TRACKS
    ===================================================== */

    const tracks = TRACKS.map(
      (track, index) => {

      /* ===================================================
         VIDEO URL MP4
      =================================================== */

      const videoUrl =
      cloudinary.url(

        track.video,

        {

          resource_type: "video",

          secure: true,

          format: "mp4",

          quality: "auto",

          fetch_format: "mp4"

        }

      );

      /* ===================================================
         AUDIO URL
         (VIDEO USED AS AUDIO)
      =================================================== */

      const audioUrl =
      cloudinary.url(

        track.video,

        {

          resource_type: "video",

          secure: true,

          format: "mp3",

          audio_codec: "aac",

          quality: "auto"

        }

      );

      /* ===================================================
         AUTO COVER
      =================================================== */

      const coverUrl =
      `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_1/${track.video}.jpg`;

      /* ===================================================
         RETURN TRACK
      =================================================== */

      return {

        id:
        `track-${index}`,

        title:
        track.title,

        artist:
        "Zarabesso Studio",

        audio:
        audioUrl,

        video:
        videoUrl,

        cover:
        coverUrl,

        duration: 0

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

      total:
      tracks.length,

      tracks

    });

  } catch (err) {

    console.log(
      "================================="
    );

    console.log(
      "CLOUDINARY ERROR"
    );

    console.log(
      "================================="
    );

    console.log(err);

    return res.status(500).json({

      success: false,

      error:
      err.message || "Server Error"

    });

  }

};