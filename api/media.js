
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
   MANUAL TRACKS
========================================================= */

const TRACKS = [

  {
    title: "Stella Lyncha",
    video: "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y"
  },

  {
    title: "Joe Fils x Jaojoby",
    video: "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm"
  },

  {
    title: "Refano",
    video: "zarabesso-videos/Refano_-_Fanambadia_Official_Music_Video_vddrht"
  },

  {
    title: "Salama",
    video: "zarabesso-videos/Salama_zbct0v"
  },

  {
    title: "Tsodrano",
    video: "zarabesso-videos/tsodrano_u6f1r0"
  },

  {
    title: "Tompondaka",
    video: "zarabesso-videos/tompondaka_t18xdz"
  }

];

/* =========================================================
   API
========================================================= */

module.exports = async function handler(req, res) {

  try {

    const tracks = TRACKS.map((track, index) => {

      /* ===================================================
         VIDEO URL
      =================================================== */

      const videoUrl = cloudinary.url(
        track.video,
        {
          resource_type: "video",
          secure: true,
          quality: "auto",
          fetch_format: "mp4"
        }
      );

      /* ===================================================
         AUTO COVER
      =================================================== */

      const coverUrl =
        `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_1/${track.video}.jpg`;

      return {

        id: `track-${index}`,

        title: track.title,

        artist: "Zarabesso Studio",

        /* IMPORTANT */
        audio: videoUrl,

        video: videoUrl,

        cover: coverUrl

      };

    });

    return res.status(200).json({

      success: true,

      total: tracks.length,

      tracks

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      error: err.message

    });

  }

};
