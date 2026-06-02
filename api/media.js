const cloudinary = require("cloudinary").v2

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
   HELPERS
========================================================= */

function cleanTitle(str = "") {

  return str
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .trim();

}

function createCover(publicId) {

  try {

    return cloudinary.url(
      publicId,
      {
        secure: true,
        resource_type: "video",
        format: "jpg",
        transformation: [
          {
            width: 600,
            crop: "fill"
          }
        ]
      }
    );

  } catch {

    return "/assets/images/background3.png";

  }

}

function uniqueTracks(list) {

  const map = new Map();

  list.forEach(track => {

    if (!track.publicId) return;

    if (!map.has(track.publicId)) {

      map.set(
        track.publicId,
        track
      );

    }

  });

  return [...map.values()];

}

/* =========================================================
   VIDEO SCAN
========================================================= */

async function scanVideos() {

  try {

    const result =
    await cloudinary.search
      .expression("resource_type:video")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    return (
      result.resources || []
    ).map((item, index) => ({

      id:
      item.asset_id ||
      `video-${index}`,

      title:
      cleanTitle(
        item.public_id
      ),

      artist:
      "Zarabesso Studio",

      type:
      "video",

      publicId:
      item.public_id,

      video:
      item.secure_url,
      

      duration:
      item.duration || 0,

      bytes:
      item.bytes || 0,

      source:
      "cloudinary-video"

    }));

  } catch (err) {

    console.error(
      "VIDEO SCAN ERROR",
      err.message
    );

    return [];

  }

}


/* =========================================================
   STATIC FALLBACK
========================================================= */

const STATIC_TRACKS = [

  {
    title:
    "Stella Lyncha",

    publicId:
    "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y"
  },

  {
    title:
    "Joe Fils x Jaojoby",

    publicId:
    "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm"
  }

];

function buildStatic() {

  return STATIC_TRACKS.map(
    (item, index) => ({

      id:
      `static-${index}`,

      title:
      item.title,

      artist:
      "Zarabesso Studio",

      publicId:
      item.publicId,

      type:
      "video",

      video:
      cloudinary.url(
        item.publicId,
        {
          secure: true,
          resource_type: "video"
        }
      ),
      

      duration: 0,

      source:
      "static"

    })
  );

}

/* =========================================================
   API
========================================================= */

module.exports =
async function handler(
  req,
  res
) {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS"
  );

  if (
    req.method === "OPTIONS"
  ) {

    return res
      .status(200)
      .end();

  }

  try {

    const videos =
    await scanVideos();


    const staticTracks =
    buildStatic();

    const tracks =
    uniqueTracks([

      ...videos,

    

      ...staticTracks

    ]);

    tracks.sort(
      (a, b) =>
      b.duration -
      a.duration
    );

    res.setHeader(
      "Cache-Control",
      "public,max-age=60,s-maxage=60"
    );

    return res
      .status(200)
      .json({

        success: true,

        total:
        tracks.length,

        generated:
        new Date()
        .toISOString(),

        tracks

      });

  } catch (err) {

    console.error(
      "MEDIA API ERROR",
      err
    );

    return res
      .status(500)
      .json({

        success: false,

        error:
        err.message

      });

  }

};
