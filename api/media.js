
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
    title: "Track 1",
    video: "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y",
    audio: "zarabesso-music/music1",
    cover: "zarabesso-cover/cover1"
  },

  {
    title: "Track 2",
    video: "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm",
    audio: "zarabesso-music/music2",
    cover: "zarabesso-cover/cover2"
  },

  {
    title: "Track 3",
    video: "zarabesso-videos/Refano_-_Fanambadia_Official_Music_Video_vddrht",
    audio: "zarabesso-music/music3",
    cover: "zarabesso-cover/cover3"
  },

  {
    title: "Track 4",
    video: "zarabesso-videos/Salama_zbct0v",
    audio: "zarabesso-music/music4",
    cover: "zarabesso-cover/cover4"
  },

  {
    title: "Track 5",
    video: "zarabesso-videos/tsodrano_u6f1r0",
    audio: "zarabesso-music/music5",
    cover: "zarabesso-cover/cover5"
  },

  {
    title: "Track 6",
    video: "zarabesso-videos/tompondaka_t18xdz",
    audio: "zarabesso-music/music6",
    cover: "zarabesso-cover/cover6"
  },

  {
    title: "Track 7",
    video: "zarabesso-videos/video7",
    audio: "zarabesso-music/music7",
    cover: "zarabesso-cover/cover7"
  },

  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  },

  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  },

  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  },

  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  },
  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  },

  {
    title: "Track 8",
    video: "zarabesso-videos/video8",
    audio: "zarabesso-music/music8",
    cover: "zarabesso-cover/cover8"
  }
];

/* =========================================================
   API
========================================================= */

module.exports = async function handler(req, res) {

  try {

    const tracks = TRACKS.map((track, index) => {

      const videoUrl = cloudinary.url(
        track.video,
        {
          resource_type: "video",
          secure: true,
          quality: "auto",
          fetch_format: "auto"
        }
      );

      const audioUrl = cloudinary.url(
        track.audio,
        {
          resource_type: "video",
          secure: true,
          quality: "auto",
          fetch_format: "auto"
        }
      );

      const coverUrl = cloudinary.url(
        track.cover,
        {
          resource_type: "image",
          secure: true,
          quality: "auto",
          fetch_format: "auto"
        }
      );

      return {

        id: `track-${index}`,

        title: track.title,

        artist: "Zarabesso Studio",

        audio: audioUrl,

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
