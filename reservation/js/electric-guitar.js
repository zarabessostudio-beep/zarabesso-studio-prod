/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
FINAL ULTRA OPTIMIZED VERSION
GPU + IOS + MOBILE + TABLET
NO NAVBAR CONFLICT
LOW GPU IMPACT
PREMIUM SMOOTH
========================================================= */

/* =========================================================
CANVAS
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

/* =========================================================
SAFE START
========================================================= */

if(electricCanvas){

/* =========================================================
DEVICE DETECTION
========================================================= */

const isMobile =
window.innerWidth < 768;

const isTablet =
window.innerWidth >= 768 &&
window.innerWidth < 1200;

const isIOS =
/iPad|iPhone|iPod/.test(
navigator.userAgent
);

const isSmallMobile =
window.innerWidth < 480;

/* =========================================================
SCENE
========================================================= */

const electricScene =
new THREE.Scene();

/* =========================================================
CAMERA
========================================================= */

const electricCamera =
new THREE.PerspectiveCamera(

30,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
2000

);

/* =========================================================
CAMERA POSITION
========================================================= */

electricCamera.position.set(
0,
0,
9
);

/* =========================================================
RENDERER
========================================================= */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,

alpha:true,

antialias:!isMobile,

powerPreference:
isMobile
? "low-power"
: "high-performance",

stencil:false,
depth:true

});

/* =========================================================
RENDER SETTINGS
========================================================= */

electricRenderer.setClearColor(
0x000000,
0
);

/* =========================================================
SMART PIXEL RATIO
========================================================= */

let pixelRatio = 2;

if(isTablet){

pixelRatio = 1.5;

}

if(isMobile){

pixelRatio = 1.2;

}

if(isSmallMobile){

pixelRatio = 1;

}

electricRenderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
pixelRatio
)

);

/* =========================================================
SIZE
========================================================= */

electricRenderer.setSize(

electricCanvas.clientWidth,
electricCanvas.clientHeight,
false

);

/* =========================================================
COLOR
========================================================= */

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/* =========================================================
GPU OPTIMIZATION
========================================================= */

electricRenderer.physicallyCorrectLights =
false;

electricRenderer.toneMapping =
THREE.NoToneMapping;

electricRenderer.shadowMap.enabled =
false;

electricRenderer.sortObjects =
false;

/* =========================================================
CANVAS STYLE
========================================================= */

electricRenderer.domElement.style.transform =
"translate3d(0,0,0)";

electricRenderer.domElement.style.backfaceVisibility =
"hidden";

electricRenderer.domElement.style.webkitBackfaceVisibility =
"hidden";

electricRenderer.domElement.style.overflow =
"visible";

/* =========================================================
LIGHTS
========================================================= */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
1.7
);

electricScene.add(
ambientLight
);

const frontLight =
new THREE.DirectionalLight(
0xffffff,
1.15
);

frontLight.position.set(
0,
2,
6
);

electricScene.add(
frontLight
);

/* =========================================================
LOADER
========================================================= */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
RESPONSIVE VALUES
========================================================= */

function getResponsiveConfig(){

if(window.innerWidth < 480){

return{

scale:2,
x:0,
y:-0.35,
rotationSpeed:0.0015,
floatIntensity:0.03,
moveIntensity:0.015

};

}

if(window.innerWidth < 768){

return{

scale:2.5,
x:0,
y:-0.2,
rotationSpeed:0.0018,
floatIntensity:0.04,
moveIntensity:0.02

};

}

if(window.innerWidth < 1200){

return{

scale:3.5,
x:0.5,
y:0,
rotationSpeed:0.0025,
floatIntensity:0.06,
moveIntensity:0.03

};

}

return{

scale:4.18,
x:1.4,
y:0.3,
rotationSpeed:0.0035,
floatIntensity:0.10,
moveIntensity:0.05

};

}

let config =
getResponsiveConfig();

/* =========================================================
LOAD MODEL
========================================================= */

electricLoader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
OPTIMIZATION
========================================================= */

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = false;

child.receiveShadow = false;

/* =========================================================
FRUSTUM SAFE
========================================================= */

child.frustumCulled = false;

/* =========================================================
MATERIAL OPTIMIZATION
========================================================= */

if(child.material){

child.material.transparent =
false;

child.material.depthWrite =
true;

child.material.needsUpdate =
false;

}

}

});

/* =========================================================
SCALE
========================================================= */

electricGuitar.scale.set(

config.scale,
config.scale,
config.scale

);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(

config.x,
config.y,
0

);

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.set(

0,
Math.PI / 2,
-1.22

);

/* =========================================================
GPU SAFE
========================================================= */

electricGuitar.matrixAutoUpdate =
true;

/* =========================================================
ADD
========================================================= */

electricScene.add(
electricGuitar
);

},

undefined,

(error)=>{

console.error(
"Erreur GLB guitare :",
error
);

}

);

/* =========================================================
CLOCK
========================================================= */

const electricClock =
new THREE.Clock();

/* =========================================================
FPS LIMITER
========================================================= */

let targetFPS = 60;

if(isTablet){

targetFPS = 45;

}

if(isMobile){

targetFPS = 35;

}

if(isSmallMobile){

targetFPS = 30;

}

const frameInterval =
1000 / targetFPS;

let lastFrameTime = 0;

/* =========================================================
ANIMATION
========================================================= */

function animate(time){

requestAnimationFrame(
animate
);

/* =========================================================
FPS CONTROL
========================================================= */

if(time - lastFrameTime < frameInterval){

return;

}

lastFrameTime = time;

/* =========================================================
TIME
========================================================= */

const elapsed =
electricClock.getElapsedTime();

/* =========================================================
GUITAR ANIMATION
========================================================= */

if(electricGuitar){

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.y +=
config.rotationSpeed;

/* =========================================================
FLOAT
========================================================= */

electricGuitar.position.y =

config.y +

Math.sin(elapsed * 1)

*

config.floatIntensity;

/* =========================================================
LATERAL MOVE
========================================================= */

electricGuitar.position.x =

config.x +

Math.cos(elapsed * 0.5)

*

config.moveIntensity;

}

/* =========================================================
RENDER
========================================================= */

electricRenderer.render(

electricScene,
electricCamera

);

}

/* =========================================================
START
========================================================= */

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(

"resize",

()=>{

/* =========================================================
NEW CONFIG
========================================================= */

config =
getResponsiveConfig();

/* =========================================================
SIZE
========================================================= */

const width =
electricCanvas.clientWidth;

const height =
electricCanvas.clientHeight;

/* =========================================================
CAMERA
========================================================= */

electricCamera.aspect =
width / height;

electricCamera.updateProjectionMatrix();

/* =========================================================
PIXEL RATIO
========================================================= */

let resizePixelRatio = 2;

if(window.innerWidth < 1200){

resizePixelRatio = 1.5;

}

if(window.innerWidth < 768){

resizePixelRatio = 1.2;

}

if(window.innerWidth < 480){

resizePixelRatio = 1;

}

electricRenderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
resizePixelRatio
)

);

/* =========================================================
SIZE
========================================================= */

electricRenderer.setSize(
width,
height,
false
);

/* =========================================================
UPDATE MODEL
========================================================= */

if(electricGuitar){

electricGuitar.scale.set(

config.scale,
config.scale,
config.scale

);

electricGuitar.position.set(

config.x,
config.y,
0

);

}

},

{ passive:true }

);

/* =========================================================
VISIBILITY OPTIMIZATION
========================================================= */

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

targetFPS = 20;

}else{

targetFPS = isMobile
? 35
: 60;

}

}

);

/* =========================================================
IOS MEMORY CLEANER
========================================================= */

window.addEventListener(

"pagehide",

()=>{

electricRenderer.dispose();

}

);

}