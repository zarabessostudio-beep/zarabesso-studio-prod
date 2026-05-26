/* =========================================================
ZARABESSO STUDIO
HERO ELECTRIC GUITAR ENGINE
VERTICAL SHOWROOM VERSION
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
28,
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
8.8
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
1.15;

/* =========================================================
LIGHTS
========================================================= */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.5
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

const warmLight =
new THREE.PointLight(
0xffd27a,
2.5,
20
);

warmLight.position.set(
3,
2,
4
);

electricScene.add(
warmLight
);

const blueLight =
new THREE.PointLight(
0x3b82f6,
1.8,
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

child.material.metalness = 0.38;

child.material.roughness = 0.38;

child.material.envMapIntensity = 1.5;

}

}

});

/* =========================================================
SIZE
========================================================= */

/*
40% PLUS PETIT
*/

electricGuitar.scale.set(
0.82,
0.82,
0.82
);

/* =========================================================
POSITION
========================================================= */

/*
POSITION HERO HAUTE
*/

electricGuitar.position.set(
0.9,
0.2,
0
);

/* =========================================================
ROTATION
========================================================= */

/*
VERTICAL
MANCHE EN HAUT
*/

electricGuitar.rotation.set(

0,
0,
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
GUITAR ANIMATION
========================================================= */

if(electricGuitar){

/*
ROTATION 360 LENTE
*/

electricGuitar.rotation.y +=
0.0035;

/*
FLOATING SHOWROOM
*/

electricGuitar.position.y =
0.2 +
Math.sin(elapsed * 1.2)
* 0.08;

/*
LEGERE INCLINAISON
*/

electricGuitar.rotation.z =
Math.sin(elapsed * 0.7)
* 0.015;

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