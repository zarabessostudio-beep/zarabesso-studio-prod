/* =========================================================
ZARABESSO MEDIA API HYBRID
STATIC + AUTO CLOUDINARY
========================================================= */

const cloudinary = require("cloudinary").v2;

/* =========================================================
CONFIG
========================================================= */

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
secure: true
});

/* =========================================================
STATIC LIBRARY
========================================================= */

const TRACKS = [

{
title: "Stella Lyncha",
video:
"zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y"
},

{
title: "Joe Fils x Jaojoby",
video:
"zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm"
},

{
title: "Refano",
video:
"zarabesso-videos/Refano_-_Fanambadia_Official_Music_Video_vddrht"
},

{
title: "Salama",
video:
"zarabesso-videos/Salama_zbct0v"
},

{
title: "Tsodrano",
video:
"zarabesso-videos/tsodrano_u6f1r0"
},

{
title: "Tompondaka",
video:
"zarabesso-videos/tompondaka_t18xdz"
}

];

/* =========================================================
HELPERS
========================================================= */
function getVideoUrl(publicId){

  return cloudinary.url(
    publicId,
    {
      resource_type: "video",
      secure: true,
      transformation: [
        {
          quality: "auto"
        }
      ]
    }
  );

}

function getCoverUrl(publicId){

  return cloudinary.url(
    publicId,
    {
      resource_type: "video",
      secure: true,
      format: "jpg",
      transformation: [
        {
          start_offset: "1"
        }
      ]
    }
  );

}
function cleanTitle(publicId){

return publicId
.split("/")
.pop()
.replace(/[_-]/g," ")
.replace(/.[^/.]+$/,"");

}

/* =========================================================
AUTO CLOUDINARY SCAN
========================================================= */

async function getCloudinaryVideos(){

try{


const result =
await cloudinary.search
  .expression(
    'resource_type:video AND folder="zarabesso-videos"'
  )
  .sort_by("created_at","desc")
  .max_results(500)
  .execute();

return (
  result.resources || []
).map((item,index)=>({

  id:
  `cloud-${index}`,

  title:
  cleanTitle(
    item.public_id
  ),

  artist:
  "Zarabesso Studio",

  video:
  getVideoUrl(
    item.public_id
  ),

  cover:
  getCoverUrl(
    item.public_id
  ),

  publicId:
  item.public_id,

  duration:
  item.duration || 0,

  views:0,
  likes:0,

  source:"cloudinary"

}));


}catch(err){


console.error(
  "CLOUDINARY SEARCH ERROR",
  err.message
);

return [];


}

}

/* =========================================================
STATIC LIBRARY
========================================================= */

function getStaticTracks(){

return TRACKS.map((track,index)=>({


id:
`static-${index}`,

title:
track.title,

artist:
"Zarabesso Studio",

video:
getVideoUrl(
  track.video
),

cover:
getCoverUrl(
  track.video
),

publicId:
track.video,

duration:0,

views:0,
likes:0,

source:"static"


}));

}

/* =========================================================
MERGE
========================================================= */

function mergeTracks(
staticTracks,
cloudTracks
){

const map =
new Map();

[...staticTracks,...cloudTracks]
.forEach(track=>{


map.set(
  track.publicId,
  track
);


});

return Array.from(
map.values()
);

}

/* =========================================================
API
========================================================= */

module.exports =
async function handler(
req,
res
){

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

if(req.method==="OPTIONS"){


return res
.status(200)
.end();


}

try{


const staticTracks =
getStaticTracks();

const cloudTracks =
await getCloudinaryVideos();

const tracks =
mergeTracks(
  staticTracks,
  cloudTracks
);

res.setHeader(
  "Cache-Control",
  "public,max-age=60,s-maxage=60"
);

return res.status(200).json({

  success:true,

  total:
  tracks.length,

  tracks

});


}catch(err){


console.error(
  "MEDIA API ERROR",
  err
);

return res.status(500).json({

  success:false,

  error:
  err.message

});


}

};
