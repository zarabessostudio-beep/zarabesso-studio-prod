import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  try {

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({
        success: false,
        error: "ENV missing"
      });
    }

    const result = await cloudinary.search
      .expression('resource_type:video AND folder="zarabesso-videos"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const tracks = result.resources.map((v, i) => {

      const url = cloudinary.url(v.public_id, {
        resource_type: "video",
        secure: true,
        quality: "auto",
        fetch_format: "auto"
      });

      return {
        id: v.asset_id || i,
        title: (v.filename || "track")
          .replace(/[-_]/g, " "),
        audio: url,
        video: url,
        cover: cloudinary.url(v.public_id, {
          resource_type: "video",
          format: "jpg"
        }),

        duration: Math.floor(v.duration || 0),

        // 🔥 STATS INIT
        views: 0,
        likes: 0,
        popularity: 0
      };

    });

    res.status(200).json({
      success: true,
      tracks
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}