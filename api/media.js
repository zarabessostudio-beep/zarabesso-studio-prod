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
      .expression("folder:zarabesso-videos")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================
    // MUSIC
    // =========================

    const music = await cloudinary.search
      .expression("folder:zarabesso-music")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================
    // COVERS
    // =========================

    const covers = await cloudinary.search
      .expression("folder:zarabesso-cover")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    res.status(200).json({

      videos: videos.resources,
      music: music.resources,
      covers: covers.resources

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}