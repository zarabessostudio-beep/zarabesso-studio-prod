// ==========================================
// ☁️ ZARABESSO CLOUD MEDIA LOADER
// ==========================================

const CLOUD = window.CLOUDINARY;

// ==========================================
// 🎥 VIDEOS
// ==========================================

const videos = {

  diarynofy:
  `https://res.cloudinary.com/${CLOUD.cloudName}/video/upload/diarynofy_zwdera.mp4`,

  tsodrano:
  `https://res.cloudinary.com/${CLOUD.cloudName}/video/upload/tsodrano_u6f1r0.mp4`,

  tompondaka:
  `https://res.cloudinary.com/${CLOUD.cloudName}/video/upload/tompondaka_t18xdz.mp4`

};

// ==========================================
// 🎵 AUDIOS
// ==========================================

const audios = {

  track1:
  `https://res.cloudinary.com/${CLOUD.cloudName}/video/upload/${CLOUD.folders.audio}/track1.mp3`,

  track2:
  `https://res.cloudinary.com/${CLOUD.cloudName}/video/upload/${CLOUD.folders.audio}/track2.mp3`

};

// ==========================================
// 🖼️ COVERS
// ==========================================

const covers = {

  cover1:
  `https://res.cloudinary.com/${CLOUD.cloudName}/image/upload/${CLOUD.folders.covers}/cover1.jpg`

};

// ==========================================
// 🌌 IMAGES
// ==========================================

const images = {

  background:
  `https://res.cloudinary.com/${CLOUD.cloudName}/image/upload/${CLOUD.folders.images}/background3.png`,

  logo:
  `https://res.cloudinary.com/${CLOUD.cloudName}/image/upload/${CLOUD.folders.images}/logo.jpg`

};

// ==========================================
// 🌍 EXPORT GLOBAL
// ==========================================

window.ZarabessoCloud = {

  videos,
  audios,
  covers,
  images

};