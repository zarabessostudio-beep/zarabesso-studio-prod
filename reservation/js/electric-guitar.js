/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
RAW GLB VERSION
NO EFFECT VERSION
NO CONFLICT
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
Math.min(window.devicePixelRatio,2)
);

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/*
PAS D'EFFETS PREMIUM
GLB BRUT
*/

electricRenderer.physicallyCorrectLights =
false;

electricRenderer.toneMapping =
THREE.NoToneMapping;

/* IMPORTANT */

electricRenderer.domElement.style.overflow =
"visible";

/* =========================================================
LIGHTS
========================================================= */

/*
LUMIERE SIMPLE
SANS VIOLET
*/

const ambientLight =
new THREE.AmbientLight(
0xffffff,
1.8
);

electricScene.add(
ambientLight
);

const frontLight =
new THREE.DirectionalLight(
0xffffff,
1.2
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
LOAD MODEL
========================================================= */

electricLoader.load(

/*
NOUVEAU GLB
*/

"/reservation/assets/models/guitar.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
RAW GLB
========================================================= */

/*
AUCUNE RETOUCHE MATERIAU
*/

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = false;

child.receiveShadow = false;

}

});

/* =========================================================
SIZE
========================================================= */

/*
-20% TAILLE ORIGINALE
*/

electricGuitar.scale.set(
1.36,
1.36,
1.36
);

/* =========================================================
POSITION
========================================================= */

/*
PARALLELE AU H1
*/

electricGuitar.position.set(
1.4,
0.3,
0
);

/* =========================================================
ROTATION
========================================================= */

/*
70° EN PENTE
MANCHE EN HAUT
*/

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

/*
ROTATION 360°
*/

electricGuitar.rotation.y +=
0.0035;

/*
FLOAT LIBRE
SANS LIMITATION
*/

electricGuitar.position.y =
0.3 +
Math.sin(elapsed * 1)
* 0.10;

/*
MOUVEMENT LATERAL
*/

electricGuitar.position.x =
1.4 +
Math.cos(elapsed * 0.5)
* 0.05;

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