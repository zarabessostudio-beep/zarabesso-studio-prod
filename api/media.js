import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default async function handler(req, res) {

  try {

    // =========================================
    // TEST ENV
    // =========================================

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

    // =========================================
    // GET VIDEOS
    // =========================================

    const videoResult = await cloudinary.search
      .expression('resource_type:video AND folder="zarabesso-videos"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================================
    // GET MUSIC
    // =========================================

    const musicResult = await cloudinary.search
      .expression('resource_type:video AND folder="zarabesso-music"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // =========================================
    // GET COVERS
    // =========================================

    const coverResult = await cloudinary.search
      .expression('resource_type:image AND folder="zarabesso-cover"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const videos = videoResult.resources || [];
    const music = musicResult.resources || [];
    const covers = coverResult.resources || [];

    // =========================================
    // BUILD TRACKS
    // =========================================

    const tracks = videos.map((video, index) => {

      const musicFile = music[index];
      const coverFile = covers[index];

      // VIDEO URL
      const videoUrl = cloudinary.url(video.public_id, {
        resource_type: "video",
        secure: true,
        quality: "auto",
        fetch_format: "auto"
      });

      // AUDIO URL
      const audioUrl = musicFile
        ? cloudinary.url(musicFile.public_id, {
            resource_type: "video",
            secure: true,
            quality: "auto"
          })
        : videoUrl;

      // COVER URL
      const coverUrl = coverFile
        ? cloudinary.url(coverFile.public_id, {
            resource_type: "image",
            secure: true
          })
        : `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_1/${video.public_id}.jpg`;

      return {

        id: video.asset_id,

        title: video.filename
          .replace(/-/g, " ")
          .replace(/_/g, " "),

        artist: "Zarabesso Studio",

        audio: audioUrl,

        video: videoUrl,

        cover: coverUrl,

        duration: video.duration || 0,

        createdAt: video.created_at
      };

    });

    res.setHeader(
      "Cache-Control",
      "no-store, max-age=0"
    );

    return res.status(200).json({
      success: true,
      total: tracks.length,
      tracks
    });

  } catch (err) {

    console.error("CLOUDINARY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });

  }

}