import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  try {

    const result = await cloudinary.search
      .expression('folder="zarabesso-videos"')
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const tracks = result.resources.map((v, i) => {

      const videoUrl = cloudinary.url(v.public_id, {
        resource_type: v.resource_type,
        secure: true,
        quality: "auto",
        fetch_format: "auto"
      });

      return {
        id: v.public_id,
        title: (v.filename || v.public_id)
          .split("/").pop()
          .replace(/[-_]/g, " "),

        artist: "Zarabesso Studio",

        audio: videoUrl,
        video: videoUrl,

        cover: cloudinary.url(v.public_id, {
          resource_type: "video",
          format: "jpg"
        }),

        duration: v.duration || 0,

        views: 0,
        likes: 0,
        comments: []
      };

    });

    res.status(200).json({ success: true, tracks });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}