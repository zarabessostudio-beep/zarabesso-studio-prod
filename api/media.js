const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const TRACKS = [
  {
    title: "Stella Lyncha",
    video: "zarabesso-videos/Stella_Lyncha_Yvon_Paul_xe2b4y"
  },
  {
    title: "Joe Fils x Jaojoby",
    video: "zarabesso-videos/Joe_Fils_x_Jaojoby_Wagnou_moi_djerebou_Clip_officiel_ohqijm"
  }
];

module.exports = async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  const tracks = TRACKS.map((t, i) => {

    const videoUrl = cloudinary.url(t.video, {
      resource_type: "video",
      secure: true,
      transformation: [
        { quality: "auto" },
        { fetch_format: "mp4" }
      ]
    });

    const audioUrl = cloudinary.url(t.video, {
      resource_type: "video",
      secure: true,
      transformation: [
        { audio_codec: "mp3" },
        { fetch_format: "mp3" }
      ]
    });

    const coverUrl = cloudinary.url(t.video, {
      resource_type: "video",
      format: "jpg",
      transformation: [{ start_offset: 1 }]
    });

    return {
      id: `track-${i}`,
      title: t.title,
      artist: "Zarabesso Studio",
      video: videoUrl,
      audio: audioUrl,
      cover: coverUrl
    };
  });

  return res.status(200).json({
    success: true,
    tracks
  });
};