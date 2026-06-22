const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = async (req, res) => {

  try {

    const result = await cloudinary.search
      .expression("folder:zarabesso-background")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const images = result.resources.map(item =>
      item.secure_url
    );

    res.status(200).json(images);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Impossible de charger les images"
    });

  }

};