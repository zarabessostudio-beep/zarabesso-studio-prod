/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
NO CONFLICT VERSION
SHOWROOM CINEMATIC
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
1000
);

/* =========================================================
CAMERA POSITION
========================================================= */

electricCamera.position.set(
0,
0,
8.5
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

/* IMPORTANT */

electricRenderer.setClearColor(
0x000000,
0
);

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

electricRenderer.physicallyCorrectLights =
true;

electricRenderer.toneMapping =
THREE.ACESFilmicToneMapping;

electricRenderer.toneMappingExposure =
1.2;

/* =========================================================
LIGHTS
========================================================= */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.8
);

electricScene.add(
ambientLight
);

const frontLight =
new THREE.DirectionalLight(
0xffffff,
2
);

frontLight.position.set(
0,
2,
6
);

electricScene.add(
frontLight
);

const goldLight =
new THREE.PointLight(
0xffd27a,
3,
20
);

goldLight.position.set(
3,
2,
4
);

electricScene.add(
goldLight
);

const blueLight =
new THREE.PointLight(
0x3b82f6,
2,
20
);

blueLight.position.set(
-4,
-2,
2
);

electricScene.add(
blueLight
);

/* =========================================================
LOADER
========================================================= */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
LOAD MODEL
========================================================= */

electricLoader.load(

"/reservation/assets/models/electrique.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
MATERIALS
========================================================= */

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.35;

child.material.roughness = 0.42;

child.material.envMapIntensity = 1.3;

}

}

});

/* =========================================================
SIZE
========================================================= */

electricGuitar.scale.set(
1.35,
1.35,
1.35
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
0.5,
-1,
0
);

/* =========================================================
ROTATION
========================================================= */

/*
STYLE SKETCHFAB
DIAGONALE SHOWROOM
*/

electricGuitar.rotation.set(

-0.35,
0.9,
0.15

);

electricScene.add(
electricGuitar
);

},

undefined,

(error)=>{

console.error(
"Erreur GLB électrique :",
error
);

}

);

/* =========================================================
MOUSE INTERACTION
========================================================= */

let targetRotationY = 0;

window.addEventListener(

"mousemove",

(event)=>{

targetRotationY =
(event.clientX /
window.innerWidth - 0.5)
* 0.45;

}

);

/* =========================================================
ANIMATION
========================================================= */

function animate(){

requestAnimationFrame(
animate
);

/* =========================================================
GUITAR
========================================================= */

if(electricGuitar){

/*
ROTATION LENTE
SHOWROOM
*/

electricGuitar.rotation.y +=
0.0018;

/*
INTERACTION SOURIS
*/

electricGuitar.rotation.y +=
(
targetRotationY -
electricGuitar.rotation.y + 0.9
)
* 0.01;

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

electricCamera.aspect =
electricCanvas.clientWidth /
electricCanvas.clientHeight;

electricCamera.updateProjectionMatrix();

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

}

);

}