/* ==================================================
ZARABESSO STUDIO
MEGA CINEMATIC GUITAR
50% SCREEN RATIO • ULTRA DETAIL VERSION
PREMIUM REALISTIC INTERACTIVE EDITION
================================================== */

/* ==================================================
CANVAS
================================================== */

const canvas =
document.getElementById("webgl");

/* ==================================================
CANVAS STYLE
================================================== */

canvas.style.position = "absolute";
canvas.style.inset = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";

/* TOP LAYER */

canvas.style.zIndex = "950";

/* INTERACTION */

canvas.style.pointerEvents = "auto";
canvas.style.touchAction = "none";

/* ==================================================
SCENE
================================================== */

const scene =
new THREE.Scene();

/* ==================================================
CAMERA
================================================== */

const camera =
new THREE.PerspectiveCamera(
30,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* MORE CINEMATIC */

camera.position.set(
0,
0,
13
);

/* ==================================================
RENDERER
================================================== */

const renderer =
new THREE.WebGLRenderer({

canvas,
alpha:true,
antialias:true,
powerPreference:"high-performance"

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
)
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
1.35;

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* MAIN AMBIENT */

const ambient =
new THREE.AmbientLight(
0xffffff,
4.2
);

scene.add(ambient);

/* GOLD CINEMATIC */

const goldLight =
new THREE.PointLight(
0xffcc66,
40,
60
);

goldLight.position.set(
5,
8,
10
);

scene.add(goldLight);

/* PURPLE EDGE */

const purpleLight =
new THREE.PointLight(
0x9d00ff,
45,
70
);

purpleLight.position.set(
-7,
5,
8
);

scene.add(purpleLight);

/* PINK */

const pinkLight =
new THREE.PointLight(
0xff0088,
35,
60
);

pinkLight.position.set(
8,
-2,
7
);

scene.add(pinkLight);

/* BLUE REFLECTION */

const blueLight =
new THREE.PointLight(
0x00ccff,
25,
60
);

blueLight.position.set(
-5,
-4,
6
);

scene.add(blueLight);

/* FRONT LIGHT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
5
);

frontLight.position.set(
0,
4,
12
);

scene.add(frontLight);

/* ==================================================
RESPONSIVE SCALE
50% SCREEN RATIO
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 3.2;

}

if(window.innerWidth < 1000){

return 4.2;

}

return 5.6;

}

/* ==================================================
LOADER
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* ==================================================
INTERACTION
================================================== */

let targetRotationY = 0;
let targetRotationX = 0;

let mouseX = 0;
let mouseY = 0;

/* ==================================================
MOUSE INTERACTION
================================================== */

window.addEventListener(
"mousemove",
(e)=>{

mouseX =
(
e.clientX /
window.innerWidth
- 0.5
);

mouseY =
(
e.clientY /
window.innerHeight
- 0.5
);

/* STRONG REAL INTERACTION */

targetRotationY =
mouseX * 2.2;

targetRotationX =
mouseY * 1.2;

}
);

/* ==================================================
TOUCH INTERACTION
================================================== */

window.addEventListener(
"touchmove",
(e)=>{

const touch =
e.touches[0];

mouseX =
(
touch.clientX /
window.innerWidth
- 0.5
);

mouseY =
(
touch.clientY /
window.innerHeight
- 0.5
);

targetRotationY =
mouseX * 2.2;

targetRotationX =
mouseY * 1.2;

},
{ passive:true }
);

/* ==================================================
LOAD MODEL
================================================== */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
GIANT SCALE
================================================== */

const scale =
getScale();

guitar.scale.set(
scale,
scale,
scale
);

/* ==================================================
POSITION
70% SCREEN POSITION
HIGHER + CENTERED
================================================== */

guitar.position.set(
1.8,
3.6,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
-0.15;

/* ==================================================
REALISTIC MATERIAL BOOST
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.visible = true;

child.castShadow = false;
child.receiveShadow = false;

if(child.material){

child.material.side =
THREE.DoubleSide;

/* REALISTIC */

child.material.metalness =
0.45;

child.material.roughness =
0.22;

child.material.envMapIntensity =
3.5;

child.material.needsUpdate =
true;

}

}

});

/* ==================================================
ADD
================================================== */

scene.add(guitar);

console.log(
"MEGA GUITAR READY"
);

},

(xhr)=>{

if(xhr.total){

console.log(
"Loading:",
(
xhr.loaded /
xhr.total *
100
).toFixed(0) + "%"
);

}

},

(error)=>{

console.error(
"GLB ERROR:",
error
);

}

);

/* ==================================================
CLOCK
================================================== */

const clock =
new THREE.Clock();

/* ==================================================
ANIMATION
================================================== */

function animate(){

requestAnimationFrame(
animate
);

const elapsed =
clock.getElapsedTime();

/* ==================================================
GUITAR
================================================== */

if(guitar){

/* FLOAT */

guitar.position.y =
3.6 +
Math.sin(
elapsed * 1.2
) * 0.22;

/* ULTRA SMOOTH ROTATION */

guitar.rotation.y +=
(
targetRotationY -
guitar.rotation.y
) * 0.045;

/* X AXIS */

guitar.rotation.x +=
(
targetRotationX -
guitar.rotation.x
) * 0.045;

/* AUTO ROTATION */

guitar.rotation.y +=
0.0025;

/* CINEMATIC TILT */

guitar.rotation.z =
Math.sin(
elapsed * 1.1
) * 0.04;

}

/* ==================================================
CAMERA
================================================== */

camera.lookAt(
0,
1,
0
);

/* ==================================================
RENDER
================================================== */

renderer.render(
scene,
camera
);

}

animate();

/* ==================================================
RESIZE
================================================== */

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

if(guitar){

const scale =
getScale();

guitar.scale.set(
scale,
scale,
scale
);

}

}
);