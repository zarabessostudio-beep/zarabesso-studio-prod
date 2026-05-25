/* =========================================================
ZARABESSO STUDIO
SHOWROOM ELECTRIC GUITAR
VERTICAL GLB VERSION
SMOOTH ROTATION • NO FLOAT
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

/*
CAMÉRA PLUS LOIN
POUR VOIR
TOUTE LA GUITARE
*/

electricCamera.position.set(
0,
0,
8
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

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/* =========================================================
LIGHTS
========================================================= */

/*
LUMIÈRES DOUCES
STYLE VITRINE
*/

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.4
);

electricScene.add(
ambientLight
);

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

const topLight =
new THREE.DirectionalLight(
0xffffff,
1.2
);

topLight.position.set(
0,
8,
0
);

electricScene.add(
topLight
);

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
GARDE LE LOOK
ORIGINAL DU GLB
*/

child.material.metalness = 0.25;

child.material.roughness = 0.45;

child.material.envMapIntensity = 1.1;

}

}

});

/* =========================================================
SIZE
========================================================= */

/*
TAILLE RÉDUITE
À 50%
*/

electricGuitar.scale.set(
0.9,
0.9,
0.9
);

/* =========================================================
POSITION
========================================================= */

/*
POSITION CENTRALE
STYLE VITRINE
*/

electricGuitar.position.set(
0,
-1.2,
0
);

/* =========================================================
ROTATION
========================================================= */

/*
POSITION VERTICALE
MANCHE VERS LE HAUT
FACE AVANT VISIBLE
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
MOUSE ROTATION
========================================================= */

let targetRotationY = 0;

window.addEventListener(

"mousemove",

(event)=>{

targetRotationY =
(event.clientX /
window.innerWidth - 0.5)
* 1.4;

}

);

/* =========================================================
CLOCK
========================================================= */

const clock =
new THREE.Clock();

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
STYLE VITRINE
*/

electricGuitar.rotation.y +=
0.002;

/*
ROTATION FLUIDE
AVEC LA SOURIS
*/

electricGuitar.rotation.y +=
(
targetRotationY -
electricGuitar.rotation.y
)
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