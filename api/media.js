import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {

  try {

    // =========================
    // VIDEOS
    // =========================

    const videos = await cloudinary.search
      .expression('resource_type:video AND folder="zarabesso-videos"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================
    // MUSIC
    // =========================

    const music = await cloudinary.search
      .expression('resource_type:video AND folder="zarabesso-music"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================
    // COVERS
    // =========================

    const covers = await cloudinary.search
      .expression('folder="zarabesso-cover"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================
    // FORMAT PREMIUM
    // =========================

    const tracks = music.resources.map((track, index) => {

      const cover =
        covers.resources[index]?.secure_url ||
        "/vinyle/assets/images/logo1.png";

      const video =
        videos.resources[index]?.secure_url || "";

      return {

        id: track.asset_id,

        title:
          track.filename
          .replace(/-/g, " ")
          .replace(/_/g, " "),

        artist: "Zarabesso Studio",

        audio: track.secure_url,

        cover,

        video,

        duration: track.duration || 0,

        created_at: track.created_at

      };

    });

    res.status(200).json({
      success: true,
      tracks
    });

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

}