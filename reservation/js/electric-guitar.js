/* =========================================================
ZARABESSO STUDIO
VERTICAL ELECTRIC GUITAR
ISOLATED ENGINE
NO CONFLICT
========================================================= */

/* =========================================================
CANVAS
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

if(!electricCanvas){

console.error(
"Electric canvas missing"
);

}else{

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
22,
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

antialias:true,

powerPreference:
"high-performance"

});

/* =========================================================
SAFE RENDER
========================================================= */

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,1.5)
);

electricRenderer.setClearColor(
0x000000,
0
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

electricRenderer.physicallyCorrectLights =
false;

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.8
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
2,
10
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
RESPONSIVE
========================================================= */

function getElectricSettings(){

if(window.innerWidth <= 480){

return{

scale:2.6,
y:-4.4

};

}

if(window.innerWidth <= 768){

return{

scale:3.1,
y:-4.2

};

}

if(window.innerWidth <= 1200){

return{

scale:3.6,
y:-4

};

}

return{

scale:4.0,
y:-3.8

};

}

/* =========================================================
SIZE
========================================================= */

}

let electricSettings =
getElectricSettings();

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

electricGuitar.traverse(

(child)=>{

if(child.isMesh){

child.castShadow = false;

child.receiveShadow = false;

child.frustumCulled = false;

if(child.material){

child.material.metalness = 0.25;

child.material.roughness = 0.55;

}

}

}

);

/* =========================================================
SCALE
========================================================= */

electricGuitar.scale.set(
electricSettings.scale,
electricSettings.scale,
electricSettings.scale
);

/* =========================================================
VERTICAL POSITION
========================================================= */

electricGuitar.position.set(
0,
electricSettings.y,
0
);

/* =========================================================
REAL VERTICAL ROTATION
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
"Electric guitar loaded"
);

},

undefined,

(error)=>{

console.error(
"Electric GLB error",
error
);

}

);

/* =========================================================
RESIZE
========================================================= */

function resizeElectric(){

const width =
electricCanvas.offsetWidth;

const height =
electricCanvas.offsetHeight;

if(width === 0 || height === 0){
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

electricSettings =
getElectricSettings();

if(electricGuitar){

electricGuitar.scale.set(
electricSettings.scale,
electricSettings.scale,
electricSettings.scale
);

electricGuitar.position.set(
0,
electricSettings.y,
0
);

}

}

resizeElectric();

window.addEventListener(
"resize",
resizeElectric
);

/* =========================================================
ANIMATION
========================================================= */

function electricAnimate(){

requestAnimationFrame(
electricAnimate
);

/* =========================================================
NO ROTATION
NO FLOAT
PURE SHOWROOM GUITAR
========================================================= */

electricRenderer.render(
electricScene,
electricCamera
);

}

electricAnimate();

