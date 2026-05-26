/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
ULTRA STABLE RESPONSIVE VERSION
TOUCH + MOUSE INTERACTION
NO NAVBAR CONFLICT
NO LIGHT ENGINE
GLB RAW CLEAN VERSION
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

if (electricCanvas) {

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
KEEP ORIGINAL POSITION
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
antialias:true,
powerPreference:"high-performance"

});

/* =========================================================
RENDER SETTINGS
========================================================= */

electricRenderer.setClearColor(
0x000000,
0
);

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,1.8)
);

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

electricRenderer.physicallyCorrectLights =
false;

electricRenderer.toneMapping =
THREE.NoToneMapping;

/* =========================================================
NO CONFLICT NAVBAR
========================================================= */

electricRenderer.domElement.style.pointerEvents =
"auto";

electricRenderer.domElement.style.touchAction =
"none";

electricRenderer.domElement.style.outline =
"none";

electricRenderer.domElement.style.userSelect =
"none";

electricRenderer.domElement.style.webkitTapHighlightColor =
"transparent";

/* =========================================================
NO LIGHTS
RAW GLB ONLY
========================================================= */

/*
AUCUNE LUMIERE AJOUTEE
LE GLB UTILISE SES MATERIAUX NATIFS
*/

/* =========================================================
LOADER
========================================================= */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
INTERACTION
========================================================= */

let targetRotationX = 0;
let targetRotationY = 0;

let currentRotationX = 0;
let currentRotationY = 0;

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;

/* =========================================================
RESPONSIVE VALUES
========================================================= */

function getResponsiveValues(){

const width =
window.innerWidth;

/* =========================================================
DESKTOP
========================================================= */

if(width > 1200){

return{

scale:4.18,
x:1.4,
y:0.3

};

}

/* =========================================================
TABLET
========================================================= */

if(width > 768){

return{

scale:3.7,
x:1.05,
y:0.2

};

}

/* =========================================================
MOBILE
========================================================= */

return{

scale:3.1,
x:0.15,
y:0.08

};

}

/* =========================================================
END
========================================================= */

}

/* =========================================================
LOAD MODEL
========================================================= */

electricLoader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
RAW GLB
========================================================= */

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = false;
child.receiveShadow = false;

if(child.material){

child.material.needsUpdate = true;

}

}

});

/* =========================================================
RESPONSIVE START
========================================================= */

const responsive =
getResponsiveValues();

/* =========================================================
KEEP ORIGINAL SIZE
========================================================= */

electricGuitar.scale.set(
responsive.scale,
responsive.scale,
responsive.scale
);

/* =========================================================
KEEP ORIGINAL POSITION
========================================================= */

electricGuitar.position.set(
responsive.x,
responsive.y,
0
);

/* =========================================================
KEEP ORIGINAL ROTATION
========================================================= */

electricGuitar.rotation.set(

0,
Math.PI / 2,
-1.22

);

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
MOUSE INTERACTION
========================================================= */

function pointerStart(x,y){

isDragging = true;

previousMouseX = x;
previousMouseY = y;

}

function pointerMove(x,y){

if(!isDragging) return;

const deltaX =
x - previousMouseX;

const deltaY =
y - previousMouseY;

/* =========================================================
SMOOTH ROTATION
========================================================= */

targetRotationY +=
deltaX * 0.005;

targetRotationX +=
deltaY * 0.002;

previousMouseX = x;
previousMouseY = y;

}

function pointerEnd(){

isDragging = false;

}

/* =========================================================
DESKTOP EVENTS
========================================================= */

electricCanvas.addEventListener(

"mousedown",

(e)=>{

pointerStart(
e.clientX,
e.clientY
);

}

);

window.addEventListener(

"mousemove",

(e)=>{

pointerMove(
e.clientX,
e.clientY
);

}

);

window.addEventListener(
"mouseup",
pointerEnd
);

/* =========================================================
TOUCH EVENTS
========================================================= */

electricCanvas.addEventListener(

"touchstart",

(e)=>{

const touch =
e.touches[0];

pointerStart(
touch.clientX,
touch.clientY
);

},

{ passive:true }

);

window.addEventListener(

"touchmove",

(e)=>{

const touch =
e.touches[0];

pointerMove(
touch.clientX,
touch.clientY
);

},

{ passive:true }

);

window.addEventListener(
"touchend",
pointerEnd
);

/* =========================================================
CLOCK
========================================================= */

const electricClock =
new THREE.Clock();

/* =========================================================
ANIMATION
========================================================= */

function animate(){

requestAnimationFrame(
animate
);

const elapsed =
electricClock.getElapsedTime();

/* =========================================================
GUITAR
========================================================= */

if(electricGuitar){

/* =========================================================
AUTO ROTATION
========================================================= */

electricGuitar.rotation.y +=
0.0035;

/* =========================================================
FLOATING
========================================================= */

electricGuitar.position.y =

getResponsiveValues().y +

Math.sin(elapsed * 1)
* 0.10;

/* =========================================================
LATERAL MOVEMENT
========================================================= */

electricGuitar.position.x =

getResponsiveValues().x +

Math.cos(elapsed * 0.5)
* 0.05;

/* =========================================================
SMOOTH TOUCH ROTATION
========================================================= */

currentRotationY +=
(targetRotationY - currentRotationY)
* 0.05;

currentRotationX +=
(targetRotationX - currentRotationX)
* 0.05;

/* =========================================================
INTERACTION ROTATION
========================================================= */

electricGuitar.rotation.y +=
currentRotationY;

electricGuitar.rotation.x =
currentRotationX * 0.3;

}

/* =========================================================
RENDER
========================================================= */

electricRenderer.render(
electricScene,
electricCamera
);

}

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(

"resize",

()=>{

/* =========================================================
CAMERA
========================================================= */

electricCamera.aspect =

electricCanvas.clientWidth /
electricCanvas.clientHeight;

electricCamera.updateProjectionMatrix();

/* =========================================================
RENDER
========================================================= */

electricRenderer.setSize(

electricCanvas.clientWidth,
electricCanvas.clientHeight

);

/* =========================================================
RESPONSIVE MODEL
========================================================= */

if(electricGuitar){

const responsive =
getResponsiveValues();

electricGuitar.scale.set(

responsive.scale,
responsive.scale,
responsive.scale

);

}

}

);

/* =========================================================
SAFE MOBILE PERFORMANCE
========================================================= */

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

electricRenderer.setAnimationLoop(
null
);

}else{

animate();

}

}

);

}