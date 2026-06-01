const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = async function handler(req,res){

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  if(req.method==="OPTIONS"){
    return res.status(200).end();
  }

  try{

    const result =
    await cloudinary.search
      .expression("resource_type:video")
      .sort_by("created_at","desc")
      .max_results(500)
      .execute();

    const tracks =
    (result.resources || [])
    .map((item,index)=>({

      id:
      item.asset_id || `video-${index}`,

      title:
      item.display_name ||
      item.filename ||
      item.public_id.split("/").pop(),

      artist:
      "Zarabesso Studio",

      publicId:
      item.public_id,

      video:
      item.secure_url,

      cover:
      cloudinary.url(
        item.public_id,
        {
          resource_type:"video",
          format:"jpg",
          secure:true
        }
      ),

      duration:
      item.duration || 0,

      source:
      "cloudinary"

    }));

    return res.status(200).json({

      success:true,

      total:
      tracks.length,

      tracks

    });

  }catch(err){

    console.error(err);

    return res.status(500).json({

      success:false,

      error:err.message

    });

  }

};