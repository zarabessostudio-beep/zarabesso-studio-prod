/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
90 DEG SHOWROOM VERSION
UNLIMITED FLOAT
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

electricRenderer.physicallyCorrectLights =
true;

electricRenderer.toneMapping =
THREE.ACESFilmicToneMapping;

electricRenderer.toneMappingExposure =
1.2;

/* IMPORTANT */

electricRenderer.domElement.style.overflow =
"visible";

/* =========================================================
LIGHTS
========================================================= */

/* AMBIENT */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.2
);

electricScene.add(
ambientLight
);

/* FRONT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
1.8
);

frontLight.position.set(
0,
2,
6
);

electricScene.add(
frontLight
);

/* VIOLET PREMIUM */

const purpleLight =
new THREE.PointLight(
0x8b5cf6,
2.8,
25
);

purpleLight.position.set(
3,
1,
5
);

electricScene.add(
purpleLight
);

/* SOFT BLUE */

const blueLight =
new THREE.PointLight(
0x60a5fa,
1.5,
20
);

blueLight.position.set(
-3,
-2,
3
);

electricScene.add(
blueLight
);

/* BACK LIGHT */

const backLight =
new THREE.PointLight(
0xffffff,
1.2,
20
);

backLight.position.set(
0,
0,
-5
);

electricScene.add(
backLight
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

/*
NE CHANGE PAS LE STYLE GLB
JUSTE LE RENDU
*/

child.material.metalness = 0.35;

child.material.roughness = 0.4;

child.material.envMapIntensity = 1.4;

}

}

});

/* =========================================================
SIZE
========================================================= */

electricGuitar.scale.set(
0.82,
0.82,
0.82
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
1,
0.4,
0
);

/* =========================================================
ROTATION
========================================================= */

/*
90°
GUITARE DEBOUT
*/

electricGuitar.rotation.set(

0,
Math.PI / 2,
0

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
ROTATION 360°
========================================================= */

electricGuitar.rotation.y +=
0.004;

/* =========================================================
UNLIMITED FLOAT
========================================================= */

electricGuitar.position.y =
0.4 +
Math.sin(elapsed * 1.1)
* 0.12;

/* =========================================================
SIDE FLOAT
========================================================= */

electricGuitar.position.x =
1 +
Math.cos(elapsed * 0.6)
* 0.08;

/* =========================================================
LIGHT TILT
========================================================= */

electricGuitar.rotation.z =
Math.sin(elapsed * 0.8)
* 0.02;

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