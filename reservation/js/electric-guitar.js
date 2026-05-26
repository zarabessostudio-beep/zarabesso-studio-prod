/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
FINAL CINEMATIC UNLIMITED VERSION
NO CROPPING
HIGHER POSITION
VISIBLE BACKGROUND LIGHT
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
UNLIMITED VISIBILITY
========================================================= */

electricCanvas.style.overflow =
"visible";

electricCanvas.style.transform =
"translate3d(0,0,0)";

electricCanvas.style.zIndex =
"20";

if(
electricCanvas.parentElement
){

electricCanvas.parentElement.style.overflow =
"visible";

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

28,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
3000

);

/* =========================================================
CAMERA POSITION
========================================================= */

electricCamera.position.set(
0,
0,
10.5
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
PIXEL RATIO
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

electricRenderer.domElement.style.transform =
"translateZ(0)";

electricRenderer.domElement.style.backfaceVisibility =
"hidden";

/* =========================================================
LIGHTS
========================================================= */

/*
STRONGER GLOBAL LIGHT
*/

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.2
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
1.8
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
0x88ccff,
1.2
);

sideLight.position.set(
5,
2,
4
);

electricScene.add(
sideLight
);

/*
TOP LIGHT
*/

const topLight =
new THREE.PointLight(
0xff3355,
2.5,
30
);

topLight.position.set(
0,
6,
4
);

electricScene.add(
topLight
);

/* =========================================================
BACKGROUND GLOW
========================================================= */

const glowGeometry =
new THREE.SphereGeometry(
3.8,
32,
32
);

const glowMaterial =
new THREE.MeshBasicMaterial({

color:0xff3355,

transparent:true,

opacity:0.18,

depthWrite:false

});

const glowSphere =
new THREE.Mesh(
glowGeometry,
glowMaterial
);

glowSphere.position.set(
0,
1.8,
-4
);

electricScene.add(
glowSphere
);

/* =========================================================
SECOND GLOW
========================================================= */

const blueGlowGeometry =
new THREE.SphereGeometry(
2.8,
32,
32
);

const blueGlowMaterial =
new THREE.MeshBasicMaterial({

color:0x44ccff,

transparent:true,

opacity:0.12,

depthWrite:false

});

const blueGlow =
new THREE.Mesh(
blueGlowGeometry,
blueGlowMaterial
);

blueGlow.position.set(
2,
0,
-3
);

electricScene.add(
blueGlow
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

if(window.innerWidth < 480){

return{

scale:2.35,
x:0,
y:1.1,
rotationSpeed:0.0015,
floatIntensity:0.03,
moveIntensity:0.015

};

}

if(window.innerWidth < 768){

return{

scale:2.9,
x:0,
y:1.4,
rotationSpeed:0.0018,
floatIntensity:0.04,
moveIntensity:0.02

};

}

if(window.innerWidth < 1200){

return{

scale:3.9,
x:0.7,
y:1.6,
rotationSpeed:0.0025,
floatIntensity:0.06,
moveIntensity:0.03

};

}

return{

scale:4.8,
x:1.8,
y:1.9,
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
NO CROPPING
*/

child.frustumCulled = false;

child.castShadow = false;

child.receiveShadow = false;

/*
SHARPER MATERIAL
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
HIGHER POSITION
NO CARD COLLISION
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
-1.15

);

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
ANIMATION
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
BACKGROUND GLOW ANIMATION
========================================================= */

glowSphere.scale.setScalar(

1 +

Math.sin(elapsed * 1.2)
* 0.08

);

blueGlow.scale.setScalar(

1 +

Math.cos(elapsed * 0.8)
* 0.06

);

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