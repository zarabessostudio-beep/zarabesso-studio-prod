import { v2 as cloudinary } from "cloudinary";

/* =========================================================
   CLOUDINARY CONFIG
========================================================= */

cloudinary.config({

  cloud_name:
  process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
  process.env.CLOUDINARY_API_KEY,

  api_secret:
  process.env.CLOUDINARY_API_SECRET

});

/* =========================================================
   API HANDLER
========================================================= */

export default async function handler(req, res){

  /* =====================================================
     SECURITY HEADERS
  ===================================================== */

  res.setHeader(
    "Cache-Control",
    "s-maxage=120, stale-while-revalidate"
  );

  try{

    /* ===================================================
       VALIDATE ENV
    =================================================== */

    if(
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ){

      return res.status(500).json({

        success:false,

        error:
        "Cloudinary ENV manquant"

      });

    }

    /* ===================================================
       SEARCH CLOUDINARY
    =================================================== */

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

    /* ===================================================
       SAFE RESOURCES
    =================================================== */

    const resources =
    result.resources || [];

    /* ===================================================
       FORMAT TRACKS
    =================================================== */

    const tracks =

    resources.map((video,index)=>{

      const publicId =
      video.public_id;

      const filename =
      video.filename || `track-${index}`;

      /* ===============================================
         PREMIUM VIDEO URL
      =============================================== */

      const optimizedVideo =

      cloudinary.url(publicId,{

        resource_type:"video",

        secure:true,

        quality:"auto",

        fetch_format:"auto",

        streaming_profile:"hd"

      });

      /* ===============================================
         PREMIUM THUMBNAIL
      =============================================== */

      const thumbnail =

      cloudinary.url(publicId,{

        resource_type:"video",

        format:"jpg",

        secure:true,

        transformation:[

          {
            width:600,
            height:600,
            crop:"fill",
            gravity:"auto"
          },

          {
            quality:"auto"
          }

        ]

      });

      /* ===============================================
         RETURN TRACK
      =============================================== */

      return {

        id:
        video.asset_id ||

        `zarabesso-${index}`,

        title:

        filename
        .replace(/-/g," ")
        .replace(/_/g," ")
        .trim(),

        artist:
        "Zarabesso Studio",

        album:
        "VYNILE Premium",

        audio:
        optimizedVideo,

        video:
        optimizedVideo,

        cover:
        thumbnail,

        duration:
        Math.floor(
          video.duration || 0
        ),

        createdAt:
        video.created_at || null

      };

    });

    /* ===================================================
       SUCCESS RESPONSE
    =================================================== */

    return res.status(200).json({

      success:true,

      total:
      tracks.length,

      tracks

    });

  }

  catch(err){

    console.error(
      "❌ CLOUDINARY API ERROR:",
      err
    );

    /* ===================================================
       ERROR RESPONSE
    =================================================== */

    return res.status(500).json({

      success:false,

      error:
      "Impossible de charger les médias",

      details:
      err.message || "Erreur inconnue"

    });

  }

}