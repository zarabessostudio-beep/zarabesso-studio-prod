/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR
LINUX FIREFOX STABLE
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
"Canvas webgl-electric introuvable"
);

return;

}

/* =========================================================
FORCE SIZE
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
24,
1,
0.1,
1000
);

electricCamera.position.set(
0,
0,
18
);

/* =========================================================
RENDERER
========================================================= */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,

alpha:true,

antialias:false,

powerPreference:"default",

premultipliedAlpha:false,

preserveDrawingBuffer:false

});

/* =========================================================
SAFE RENDERER
========================================================= */

electricRenderer.setClearColor(
0x000000,
0
);

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,1.2)
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

const front =
new THREE.DirectionalLight(
0xffffff,
1.5
);

front.position.set(
0,
2,
8
);

electricScene.add(
front
);

/* =========================================================
SETTINGS
========================================================= */

function getSettings(){

if(window.innerWidth <= 480){

return{
scale:2.4,
y:-4.2
};

}

if(window.innerWidth <= 768){

return{
scale:3,
y:-4
};

}

if(window.innerWidth <= 1200){

return{
scale:3.6,
y:-3.8
};

}

return{
scale:4.0,
y:-3.6
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

child.frustumCulled = false;

child.castShadow = false;

child.receiveShadow = false;

}

}

);

/* =========================================================
SCALE
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
0,
settings.y,
0
);

/* =========================================================
VERTICAL POSITION
========================================================= */

electricGuitar.rotation.set(
0,
Math.PI / 2,
0
);

/* =========================================================
ADD
========================================================= */

electricScene.add(
electricGuitar
);

console.log(
"Electric guitar loaded successfully"
);

resizeElectric();

},

undefined,

(error)=>{

console.error(
"Erreur GLB :",
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
0,
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

electricRenderer.render(
electricScene,
electricCamera
);

}

animate();

}
);