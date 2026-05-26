/* =========================================================
ZARABESSO STUDIO
PREMIUM ELECTRIC GUITAR
FINAL SHOWROOM VERSION
========================================================= */

window.addEventListener(

"load",

()=>{

/* =========================================================
CANVAS
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

if(!electricCanvas){

console.error(
"Canvas introuvable"
);

return;

}

/* =========================================================
SAFE CANVAS
========================================================= */

electricCanvas.style.width = "100%";
electricCanvas.style.height = "100%";
electricCanvas.style.display = "block";

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
26,
1,
0.1,
1000
);

/* =========================================================
CAMERA POSITION
========================================================= */

electricCamera.position.set(
0,
0,
14
);

/* =========================================================
RENDERER
========================================================= */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,

alpha:true,

antialias:false,

powerPreference:"default"

});

/* =========================================================
RENDERER SETTINGS
========================================================= */

electricRenderer.setClearColor(
0x000000,
0
);

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,1.5)
);

electricRenderer.setSize(
electricCanvas.parentElement.offsetWidth,
electricCanvas.parentElement.offsetHeight,
false
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
3
);

electricScene.add(
ambient
);

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

/* =========================================================
RESPONSIVE SETTINGS
========================================================= */

function getSettings(){

if(window.innerWidth <= 480){

return{

scale:4.2,
y:-5.4

};

}

if(window.innerWidth <= 768){

return{

scale:5,
y:-5.2

};

}

if(window.innerWidth <= 1200){

return{

scale:5.8,
y:-5

};

}

return{

scale:6.3,
y:-4.8

};

}

let settings =
getSettings();

/* =========================================================
LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
LOAD MODEL
========================================================= */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
OPTIMIZATION
========================================================= */

electricGuitar.traverse(

(child)=>{

if(child.isMesh){

child.castShadow = false;

child.receiveShadow = false;

child.frustumCulled = false;

}

}

);

/* =========================================================
SIZE
========================================================= */

electricGuitar.scale.set(
settings.scale,
settings.scale,
settings.scale
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
2.4,
settings.y,
0
);

/* =========================================================
FORCED VERTICAL POSITION
========================================================= */

/*
X = vertical neck up
Y = showroom angle
Z = slight premium tilt
*/

electricGuitar.rotation.set(

-1.55,
1.3,
0.12

);

/* =========================================================
ADD
========================================================= */

electricScene.add(
electricGuitar
);

console.log(
"Premium electric guitar loaded"
);

resizeElectric();

},

undefined,

(error)=>{

console.error(
"GLB ERROR",
error
);

}

);

/* =========================================================
RESIZE
========================================================= */

function resizeElectric(){

const width =
electricCanvas.parentElement.offsetWidth;

const height =
electricCanvas.parentElement.offsetHeight;

if(width < 10 || height < 10){

return;

}

electricCamera.aspect =
width / height;

electricCamera.updateProjectionMatrix();

electricRenderer.setSize(
width,
height,
false
);

settings =
getSettings();

if(electricGuitar){

electricGuitar.scale.set(
settings.scale,
settings.scale,
settings.scale
);

electricGuitar.position.set(
2.4,
settings.y,
0
);

}

}

/* =========================================================
RESIZE EVENTS
========================================================= */

window.addEventListener(
"resize",
resizeElectric
);

setTimeout(
resizeElectric,
300
);

setTimeout(
resizeElectric,
1000
);

/* =========================================================
ANIMATION
========================================================= */

function animate(){

requestAnimationFrame(
animate
);

if(electricGuitar){

/* =========================================================
VERY SLOW SHOWROOM ROTATION
========================================================= */

electricGuitar.rotation.y +=
0.0015;

}

electricRenderer.render(
electricScene,
electricCamera
);

}

animate();

}
);