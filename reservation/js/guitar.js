/* =========================================================
ZARABESSO STUDIO
ULTRA PREMIUM CINEMATIC GUITAR ENGINE
THREE.JS FINAL VERSION
========================================================= */

/* =========================================================
CANVAS
========================================================= */

const canvas =
document.getElementById("webgl");

/* =========================================================
SCENE
========================================================= */

const scene =
new THREE.Scene();

scene.fog =
new THREE.FogExp2(
0x050505,
0.045
);

/* =========================================================
CAMERA
========================================================= */

const camera =
new THREE.PerspectiveCamera(
28,
canvas.clientWidth / canvas.clientHeight,
0.1,
1000
);

/* PREMIUM POSITION */

camera.position.set(
0,
0.4,
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

renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

renderer.outputEncoding =
THREE.sRGBEncoding;

renderer.physicallyCorrectLights = true;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.45;

/* =========================================================
LIGHTING SYSTEM
========================================================= */

/* AMBIENT */

const ambientLight =
new THREE.AmbientLight(
0xffffff,
2.6
);

scene.add(ambientLight);

/* MAIN GOLD */

const mainGoldLight =
new THREE.DirectionalLight(
0xffd27a,
5
);

mainGoldLight.position.set(
6,
8,
8
);

scene.add(mainGoldLight);

/* ORANGE SIDE */

const orangeLight =
new THREE.PointLight(
0xff8800,
7,
30
);

orangeLight.position.set(
4,
2,
5
);

scene.add(orangeLight);

/* BLUE CONTRAST */

const blueLight =
new THREE.PointLight(
0x3b82f6,
3,
25
);

blueLight.position.set(
-5,
-2,
4
);

scene.add(blueLight);

/* PINK CINEMATIC */

const pinkLight =
new THREE.PointLight(
0xff0088,
2,
20
);

pinkLight.position.set(
0,
4,
-3
);

scene.add(pinkLight);

/* =========================================================
BACKGROUND PARTICLES
========================================================= */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 120;

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
new THREE.BufferAttribute(posArray,3)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.035,
color:0xffd27a,
transparent:true,
opacity:0.7

});

const particlesMesh =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

/* =========================================================
GLTF LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let guitar = null;

/* =========================================================
LOAD MODEL
========================================================= */

loader.load(

"/reservation/assets/models/guitar.glb",

function(gltf){

guitar = gltf.scene;

/* =========================================================
MODEL SETTINGS
========================================================= */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

/* MATERIAL */

if(child.material){

child.material.metalness = 0.55;

child.material.roughness = 0.38;

child.material.envMapIntensity = 1.7;

}

}

});

/* =========================================================
SIZE
========================================================= */

guitar.scale.set(
5.2,
5.2,
5.2
);

/* =========================================================
POSITION
========================================================= */

guitar.position.set(
2.3,
-1.7,
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

/* =========================================================
ADD TO SCENE
========================================================= */

scene.add(guitar);

},

undefined,

function(error){

console.error(
"Erreur GLB :",
error
);

}

);

/* =========================================================
MOUSE INTERACTION
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
CLOCK
========================================================= */

const clock =
new THREE.Clock();

/* =========================================================
ANIMATION LOOP
========================================================= */

function animate(){

requestAnimationFrame(animate);

const elapsedTime =
clock.getElapsedTime();

/* =========================================================
PARTICLES
========================================================= */

particlesMesh.rotation.y += 0.0008;

/* =========================================================
GUITAR
========================================================= */

if(guitar){

/* FLOATING */

guitar.position.y =
-1.7 +
Math.sin(elapsedTime*1.6)*0.12;

/* CINEMATIC ROTATION */

guitar.rotation.y += 0.0015;

/* MOUSE PARALLAX */

guitar.rotation.x =
(mouseY * 0.18);

guitar.rotation.z =
(mouseX * 0.08);

/* SMOOTH CAMERA */

camera.position.x +=
(mouseX * 0.9 - camera.position.x)
* 0.02;

camera.position.y +=
(-mouseY * 0.3 + 0.4 - camera.position.y)
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