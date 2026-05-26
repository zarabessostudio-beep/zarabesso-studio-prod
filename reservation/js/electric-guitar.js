/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
FINAL CLEAN UNLIMITED VERSION
NO FRAME
NO BACKGROUND LIGHT
NO CROPPING
FULL HEADSTOCK VISIBLE
GPU + IOS + MOBILE OPTIMIZED
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
REMOVE ALL CROPPING
========================================================= */

electricCanvas.style.overflow =
"visible";

electricCanvas.style.position =
"absolute";

electricCanvas.style.inset =
"0";

electricCanvas.style.zIndex =
"20";

electricCanvas.style.background =
"transparent";

electricCanvas.style.transform =
"translate3d(0,0,0)";

electricCanvas.style.backfaceVisibility =
"hidden";

electricCanvas.style.webkitBackfaceVisibility =
"hidden";

/* =========================================================
REMOVE FRAME CLIPPING
========================================================= */

const canvasParent =
electricCanvas.parentElement;

if(canvasParent){

canvasParent.style.overflow =
"visible";

canvasParent.style.clipPath =
"none";

canvasParent.style.maskImage =
"none";

canvasParent.style.webkitMaskImage =
"none";

canvasParent.style.contain =
"none";

}

/* =========================================================
DEVICE DETECTION
========================================================= */

const isMobile =
window.innerWidth < 768;

const isTablet =
window.innerWidth >= 768 &&
window.innerWidth < 1200;

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

24,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.01,
5000

);

/* =========================================================
CAMERA POSITION
========================================================= */

/*
MORE DISTANCE
PREVENT HEAD CUT
*/

electricCamera.position.set(
0,
0,
12.5
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
OUTPUT
========================================================= */

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/* =========================================================
GPU SAFE
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
UNLIMITED RENDER
========================================================= */

electricRenderer.domElement.style.overflow =
"visible";

electricRenderer.domElement.style.position =
"absolute";

electricRenderer.domElement.style.inset =
"0";

electricRenderer.domElement.style.clipPath =
"none";

electricRenderer.domElement.style.maskImage =
"none";

electricRenderer.domElement.style.webkitMaskImage =
"none";

electricRenderer.domElement.style.transform =
"translateZ(0)";

/* =========================================================
LIGHTS
========================================================= */

/*
CLEAN LIGHT
NO BACKGROUND GLOW
*/

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2
);

electricScene.add(
ambientLight
);

/*
FRONT LIGHT
*/

const frontLight =
new THREE.DirectionalLight(
0xffffff,
1.6
);

frontLight.position.set(
0,
3,
8
);

electricScene.add(
frontLight
);

/*
SIDE LIGHT
*/

const sideLight =
new THREE.DirectionalLight(
0xffffff,
0.9
);

sideLight.position.set(
4,
2,
5
);

electricScene.add(
sideLight
);

/* =========================================================
LOADER
========================================================= */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
RESPONSIVE CONFIG
========================================================= */

function getResponsiveConfig(){

/* =========================================================
SMALL MOBILE
========================================================= */

if(window.innerWidth < 480){

return{

scale:2.1,

x:0,

/*
HIGHER
*/

y:1.9,

rotationSpeed:0.0015,

floatIntensity:0.03,

moveIntensity:0.015

};

}

/* =========================================================
MOBILE
========================================================= */

if(window.innerWidth < 768){

return{

scale:2.8,

x:0,

/*
HIGHER
*/

y:2.1,

rotationSpeed:0.0018,

floatIntensity:0.04,

moveIntensity:0.02

};

}

/* =========================================================
TABLET
========================================================= */

if(window.innerWidth < 1200){

return{

scale:3.8,

x:0.8,

/*
HIGHER
*/

y:2.2,

rotationSpeed:0.0025,

floatIntensity:0.06,

moveIntensity:0.03

};

}

/* =========================================================
DESKTOP
========================================================= */

return{

scale:4.7,

x:1.8,

/*
HIGHER
*/

y:2.5,

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

/*
NEVER HIDE MODEL
*/

child.frustumCulled =
false;

child.castShadow =
false;

child.receiveShadow =
false;

/*
MATERIAL SAFE
*/

if(child.material){

child.material.transparent =
false;

child.material.depthWrite =
true;

child.material.needsUpdate =
true;

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

/*
HIGH POSITION
NO CARD TOUCH
*/

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
-1.12

);

/* =========================================================
SAFE MATRIX
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
FPS
========================================================= */

let targetFPS = 60;

if(isTablet){

targetFPS = 45;

}

if(isMobile){

targetFPS = 35;

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

if(time - lastFrameTime < frameInterval){

return;

}

lastFrameTime = time;

const elapsed =
electricClock.getElapsedTime();

/* =========================================================
GUITAR
========================================================= */

if(electricGuitar){

/*
ROTATION
*/

electricGuitar.rotation.y +=
config.rotationSpeed;

/*
FLOAT
*/

electricGuitar.position.y =

config.y +

Math.sin(elapsed)

*

config.floatIntensity;

/*
MOVE
*/

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

config =
getResponsiveConfig();

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
RENDERER
========================================================= */

electricRenderer.setSize(
width,
height,
false
);

/* =========================================================
MODEL UPDATE
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
VISIBILITY
========================================================= */

document.addEventListener(

"visibilitychange",

()=>{

targetFPS = document.hidden
? 20
: (isMobile ? 35 : 60);

}

);

/* =========================================================
MEMORY CLEAN
========================================================= */

window.addEventListener(

"pagehide",

()=>{

electricRenderer.dispose();

}

);

}