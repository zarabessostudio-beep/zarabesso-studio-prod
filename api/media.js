/* =========================================================
   ZARABESSO MEDIA API PRO
   CLOUDINARY SAFE VIDEO ENGINE
========================================================= */

const cloudinary = require("cloudinary").v2;

/* =========================================================
   CONFIG
========================================================= */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/* =========================================================
   TRACKS DATABASE
========================================================= */

const TRACKS = [
  { title: "Stella Lyncha", video: "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y" },
  { title: "Joe Fils x Jaojoby", video: "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm" },
  { title: "Refano", video: "zarabesso-videos/Refano_-_Fanambadia_Official_Music_Video_vddrht" },
  { title: "Salama", video: "zarabesso-videos/Salama_zbct0v" },
  { title: "Tsodrano", video: "zarabesso-videos/tsodrano_u6f1r0" },
  { title: "Tompondaka", video: "zarabesso-videos/tompondaka_t18xdz" }
];

/* =========================================================
   HELPERS (CLEAN VIDEO URL SAFE)
========================================================= */

function getVideoUrl(publicId) {
  return cloudinary.url(publicId, {
    resource_type: "video",
    secure: true,
    format: "mp4",
    transformation: [
      { quality: "auto" },
      { fetch_format: "mp4" }
    ]
  });
}

function getCoverUrl(publicId) {
  return cloudinary.url(publicId, {
    resource_type: "video",
    format: "jpg",
    transformation: [{ start_offset: 1 }]
  });
}

/* =========================================================
   API HANDLER
========================================================= */

module.exports = async function handler(req, res) {

  /* CORS SAFE */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const tracks = TRACKS.map((t, i) => {

      const videoUrl = getVideoUrl(t.video);
      const coverUrl = getCoverUrl(t.video);

      return {
        id: `track-${i}`,
        title: t.title,
        artist: "Zarabesso Studio",

        video: videoUrl,

        cover: coverUrl,

        duration: 0,

        // SaaS ready fields
        views: 0,
        likes: 0
      };

    });

    res.setHeader("Cache-Control", "public, max-age=60");

    return res.status(200).json({
      success: true,
      total: tracks.length,
      tracks
    });

  } catch (err) {

    console.error("MEDIA API ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
};