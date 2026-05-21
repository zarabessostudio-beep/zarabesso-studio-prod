import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res){

  try{

    const result =
    await cloudinary.search
      .expression(
        'resource_type:video AND folder="zarabesso-videos"'
      )
      .sort_by(
        "created_at",
        "desc"
      )
      .max_results(100)
      .execute();

    const tracks =
    result.resources.map((video)=>{

      return {

        id: video.asset_id,

        title:
        video.filename
        .replace(/-/g," ")
        .replace(/_/g," "),

        artist:
        "Zarabesso Studio",

        audio:
        video.secure_url,

        video:
        video.secure_url,

        cover:
        video.secure_url.replace(
          "/video/upload/",
          "/video/upload/so_1/"
        ),

        duration:
        video.duration || 0

      };

    });

    res.status(200).json({

      success:true,

      tracks

    });

  }

  catch(err){

    console.error(err);

    res.status(500).json({

      success:false,

      error:err.message

    });

  }

}