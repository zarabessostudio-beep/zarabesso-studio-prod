/* =========================================================
ZARABESSO STUDIO
FREE FLOATING ELECTRIC GUITAR
ULTRA PREMIUM ENGINE
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

electricRenderer.toneMapping =
THREE.ACESFilmicToneMapping;

electricRenderer.toneMappingExposure =
1.4;

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.8
);

electricScene.add(ambient);

/* GOLD */

const gold =
new THREE.PointLight(
0xffcc66,
5,
30
);

gold.position.set(
5,
5,
6
);

electricScene.add(gold);

/* BLUE */

const blue =
new THREE.PointLight(
0x3b82f6,
2.5,
25
);

blue.position.set(
-5,
-2,
5
);

electricScene.add(blue);

/* PINK */

const pink =
new THREE.PointLight(
0xff0088,
2,
20
);

pink.position.set(
0,
4,
-2
);

electricScene.add(pink);

/* =========================================================
LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
LOAD GLB
========================================================= */

loader.load(

"/reservation/assets/models/electrique.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* =========================================================
KEEP ORIGINAL GLB LOOK
========================================================= */

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.42;

child.material.roughness = 0.35;

child.material.envMapIntensity = 1.8;

child.material.needsUpdate = true;

}

}

});

/* =========================================================
ORIGINAL GLB SIZE
========================================================= */

/*
ICI :
ON GARDE UNE TAILLE
PROCHE DU GLB ORIGINAL
*/

electricGuitar.scale.set(
2.8,
2.8,
2.8
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
0.8,
-0.2,
0
);

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.set(
0.18,
-0.9,
0.06
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
MOUSE
========================================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
"mousemove",
(event)=>{

mouseX =
(event.clientX /
window.innerWidth - 0.5);

mouseY =
(event.clientY /
window.innerHeight - 0.5);

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

const time =
clock.getElapsedTime();

if(electricGuitar){

/* =========================================================
FREE FLOAT
========================================================= */

electricGuitar.position.y =
-0.2 +
Math.sin(time * 1.4) * 0.16;

/* =========================================================
FREE SPACE MOVEMENT
========================================================= */

electricGuitar.position.x =
0.8 +
Math.sin(time * 0.7) * 0.18;

/* =========================================================
AUTO ROTATION
========================================================= */

electricGuitar.rotation.y +=
0.0018;

/* =========================================================
PARALLAX
========================================================= */

electricGuitar.rotation.x =
mouseY * 0.16;

electricGuitar.rotation.z =
mouseX * 0.08;

/* =========================================================
SMOOTH CAMERA
========================================================= */

electricCamera.position.x +=
(mouseX * 0.5
- electricCamera.position.x)
* 0.02;

electricCamera.position.y +=
(-mouseY * 0.2
- electricCamera.position.y)
* 0.02;

electricCamera.lookAt(
electricGuitar.position
);

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