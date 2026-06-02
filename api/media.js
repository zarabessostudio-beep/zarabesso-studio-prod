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
   CONFIG
========================================================= */

const CONFIG = {

  VIDEO_FOLDER:
    "zarabesso-videos",

  DEFAULT_ARTIST:
    "Zarabesso Studio",

  MAX_RESULTS:
    500,

  CACHE_SECONDS:
    60

};

/* =========================================================
   HELPERS
========================================================= */

function cleanTitle(str = "") {

  return str
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
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
            width: 800,
            crop: "fill"
          }
        ]
      }
    );

  } catch {

    return "/vinyle/assets/images/logo1.png";

  }

}

function uniqueTracks(list = []) {

  const map = new Map();

  for (const track of list) {

    if (!track?.publicId) {
      continue;
    }

    if (!map.has(track.publicId)) {

      map.set(
        track.publicId,
        track
      );

    }

  }

  return [...map.values()];

}

function normalizeVideo(item, index) {

  if (!item) return null;

  if (!item.public_id) return null;

  if (!item.secure_url) return null;

  return {

    id:
      item.asset_id ||
      `video-${index}`,

    title:
      cleanTitle(
        item.public_id
      ),

    artist:
      CONFIG.DEFAULT_ARTIST,

    type:
      "video",

    publicId:
      item.public_id,

    video:
      item.secure_url,

    cover:
      createCover(
        item.public_id
      ),

    duration:
      Number(
        item.duration || 0
      ),

    bytes:
      Number(
        item.bytes || 0
      ),

    width:
      item.width || 0,

    height:
      item.height || 0,

    createdAt:
      item.created_at || null,

    source:
      "cloudinary-video"

  };

}

/* =========================================================
   VIDEO SCAN
========================================================= */

async function scanVideos() {

  try {

    const result =
      await cloudinary.search
        .expression(
          `resource_type:video AND folder=${CONFIG.VIDEO_FOLDER}`
        )
        .sort_by(
          "created_at",
          "desc"
        )
        .max_results(
          CONFIG.MAX_RESULTS
        )
        .execute();

    const resources =
      result?.resources || [];

    const tracks =
      resources
        .map(normalizeVideo)
        .filter(Boolean)
        .filter(track => {

          return (
            track.video &&
            track.video.startsWith("https://")
          );

        });

    return uniqueTracks(
      tracks
    );

  } catch (err) {

    console.error(
      "VIDEO SCAN ERROR",
      err
    );

    return [];

  }

}

/* =========================================================
   API
========================================================= */

module.exports = async function handler(
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

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (
    req.method === "OPTIONS"
  ) {

    return res
      .status(200)
      .end();

  }

  if (
    req.method !== "GET"
  ) {

    return res
      .status(405)
      .json({

        success: false,

        error:
          "Method Not Allowed"

      });

  }

  try {

    const tracks =
      await scanVideos();

    tracks.sort(
      (a, b) => {

        const dateA =
          new Date(
            a.createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b.createdAt || 0
          ).getTime();

        return dateB - dateA;

      }
    );

    res.setHeader(
      "Cache-Control",
      `public,max-age=${CONFIG.CACHE_SECONDS},s-maxage=${CONFIG.CACHE_SECONDS}`
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

        folder:
          CONFIG.VIDEO_FOLDER,

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
          err.message ||
          "Unknown error"

      });

  }

};