/* =========================================================
ZARABESSO STUDIO
ULTRA PREMIUM CINEMATIC GUITAR
NO CONFLICT VERSION
========================================================= */

/* =========================================================
CANVAS
========================================================= */

const canvas =
document.getElementById(
"webgl"
);

/* =========================================================
SAFE START
========================================================= */

if(canvas){

/* =========================================================
SCENE
========================================================= */

const scene =
new THREE.Scene();

scene.fog =
new THREE.FogExp2(
0x050505,
0.03
);

/* =========================================================
CAMERA
========================================================= */

const camera =
new THREE.PerspectiveCamera(
28,
canvas.clientWidth /
canvas.clientHeight,
0.1,
1000
);

/* =========================================================
CAMERA POSITION
========================================================= */

camera.position.set(
0,
0.3,
7
);

/* =========================================================
RENDERER
========================================================= */

const renderer =
new THREE.WebGLRenderer({

canvas,
alpha:true,
antialias:true,
powerPreference:"high-performance"

});

/* IMPORTANT */

renderer.setClearColor(
0x000000,
0
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

renderer.outputEncoding =
THREE.sRGBEncoding;

renderer.physicallyCorrectLights =
true;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
1.4;

/* =========================================================
LIGHTS
========================================================= */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.5
);

scene.add(
ambientLight
);

const goldLight =
new THREE.DirectionalLight(
0xffd27a,
4
);

goldLight.position.set(
5,
7,
8
);

scene.add(
goldLight
);

const orangeLight =
new THREE.PointLight(
0xff8800,
5,
25
);

orangeLight.position.set(
4,
2,
5
);

scene.add(
orangeLight
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
4
);

scene.add(
blueLight
);

/* =========================================================
PARTICLES
========================================================= */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 100;

const posArray =
new Float32Array(
particlesCount * 3
);

for(let i=0;i<particlesCount*3;i++){

posArray[i] =
(Math.random()-0.5)*18;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
posArray,
3
)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.03,
color:0xffd27a,
transparent:true,
opacity:0.6

});

const particlesMesh =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(
particlesMesh
);

/* =========================================================
LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let guitar = null;

/* =========================================================
LOAD MODEL
========================================================= */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar =
gltf.scene;

/* =========================================================
MATERIALS
========================================================= */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.5;

child.material.roughness = 0.4;

child.material.envMapIntensity = 1.6;

}

}

});

/* =========================================================
SIZE
========================================================= */

guitar.scale.set(
4.6,
4.6,
4.6
);

/* =========================================================
POSITION
========================================================= */

guitar.position.set(
2.1,
-1.5,
0
);

/* =========================================================
ROTATION
========================================================= */

guitar.rotation.set(
0.18,
-0.85,
0.08
);

scene.add(
guitar
);

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

const elapsedTime =
clock.getElapsedTime();

/* =========================================================
PARTICLES
========================================================= */

particlesMesh.rotation.y +=
0.0005;

/* =========================================================
GUITAR
========================================================= */

if(guitar){

/*
FLOAT CINEMA
*/

guitar.position.y =
-1.5 +
Math.sin(elapsedTime*1.4)
* 0.08;

/*
ROTATION LENTE
*/

guitar.rotation.y +=
0.0013;

/*
PARALLAX
*/

guitar.rotation.x =
(mouseY * 0.12);

guitar.rotation.z =
(mouseX * 0.06);

camera.position.x +=
(mouseX * 0.6 -
camera.position.x)
* 0.02;

camera.position.y +=
(-mouseY * 0.2 + 0.3 -
camera.position.y)
* 0.02;

camera.lookAt(
guitar.position
);

}

/* =========================================================
RENDER
========================================================= */

renderer.render(
scene,
camera
);

}

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(

"resize",

()=>{

camera.aspect =
canvas.clientWidth /
canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

}

);

}