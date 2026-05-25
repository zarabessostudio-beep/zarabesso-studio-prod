/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR ENGINE
PREMIUM SMALL VERSION
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

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
32,
electricCanvas.clientWidth /
electricCanvas.clientHeight,
0.1,
1000
);

/* POSITION */

electricCamera.position.set(
0,
0.1,
7
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

electricRenderer.physicallyCorrectLights =
true;

/* =========================================================
LIGHTS
========================================================= */

const electricAmbient =
new THREE.AmbientLight(
0xffffff,
2.2
);

electricScene.add(
electricAmbient
);

/* GOLD */

const electricGold =
new THREE.PointLight(
0xffcc66,
4,
25
);

electricGold.position.set(
4,
4,
5
);

electricScene.add(
electricGold
);

/* BLUE */

const electricBlue =
new THREE.PointLight(
0x3b82f6,
2,
20
);

electricBlue.position.set(
-4,
-2,
3
);

electricScene.add(
electricBlue
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

function(gltf){

electricGuitar =
gltf.scene;

/* KEEP ORIGINAL GLB MATERIALS */

electricGuitar.traverse(
(child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.envMapIntensity = 1.4;

child.material.needsUpdate = true;

}

}

}
);

/* =========================================================
SIZE
========================================================= */

/* SMALLER */

electricGuitar.scale.set(
2.1,
2.1,
2.1
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
1.4,
-0.8,
0
);

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.set(
0.15,
-0.9,
0.05
);

electricScene.add(
electricGuitar
);

},

undefined,

function(error){

console.error(
"Erreur electric guitar :",
error
);

}

);

/* =========================================================
MOUSE
========================================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(

"mousemove",

(event)=>{

mouseX =
(event.clientX / window.innerWidth - 0.5);

mouseY =
(event.clientY / window.innerHeight - 0.5);

}

);

/* =========================================================
ZOOM
========================================================= */

window.addEventListener(

"wheel",

(event)=>{

electricCamera.position.z +=
event.deltaY * 0.003;

/* LIMIT */

electricCamera.position.z =
Math.max(
5,
Math.min(
10,
electricCamera.position.z
)
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

function animateElectric(){

requestAnimationFrame(
animateElectric
);

const time =
electricClock.getElapsedTime();

if(electricGuitar){

/* FLOAT */

electricGuitar.position.y =
-0.8 +
Math.sin(time*1.6)*0.06;

/* AUTO ROTATION */

electricGuitar.rotation.y +=
0.0015;

/* MOUSE PARALLAX */

electricGuitar.rotation.x =
mouseY * 0.12;

electricGuitar.rotation.z =
mouseX * 0.06;

}

/* CAMERA SMOOTH */

electricCamera.position.x +=
(mouseX * 0.3
- electricCamera.position.x)
* 0.02;

electricRenderer.render(
electricScene,
electricCamera
);

}

animateElectric();

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