/* ==================================================
ZARABESSO STUDIO
TITAN CINEMATIC GUITAR
ULTRA PREMIUM MASSIVE VERSION
+65% BIGGER • TOUCH + MOUSE INTERACTIVE
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

/* VERY TOP */

canvas.style.zIndex = "900";

/* FULL INTERACTION */

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
34,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* CINEMATIC DEPTH */

camera.position.set(
0,
0,
11
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

/* SIZE */

renderer.setSize(
window.innerWidth,
window.innerHeight
);

/* GPU SAFE */

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
1.5
)
);

/* COLORS */

renderer.outputColorSpace =
THREE.SRGBColorSpace;

/* CLEAR */

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* AMBIENT */

const ambient =
new THREE.AmbientLight(
0xffffff,
3.5
);

scene.add(ambient);

/* GOLD */

const goldLight =
new THREE.PointLight(
0xffd166,
30,
40
);

goldLight.position.set(
3,
5,
8
);

scene.add(goldLight);

/* PURPLE */

const purpleLight =
new THREE.PointLight(
0xbb00ff,
35,
45
);

purpleLight.position.set(
-5,
4,
6
);

scene.add(purpleLight);

/* PINK */

const pinkLight =
new THREE.PointLight(
0xff0088,
28,
40
);

pinkLight.position.set(
6,
-2,
6
);

scene.add(pinkLight);

/* FRONT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
4
);

frontLight.position.set(
0,
3,
10
);

scene.add(frontLight);

/* ==================================================
RESPONSIVE SCALE
+65% BIGGER
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 2.1;

}

if(window.innerWidth < 1000){

return 2.8;

}

return 3.9;

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
MOUSE
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

/* STRONGER INTERACTION */

targetRotationY =
mouseX * 1.4;

targetRotationX =
mouseY * 0.7;

}
);

/* ==================================================
TOUCH MOBILE
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
mouseX * 1.4;

targetRotationX =
mouseY * 0.7;

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
MEGA SCALE
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
70% SCREEN AREA
================================================== */

guitar.position.set(
1.2,
2.6,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
-0.35;

/* ==================================================
MATERIAL BOOST
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.visible = true;

child.castShadow = false;

child.receiveShadow = false;

if(child.material){

child.material.side =
THREE.DoubleSide;

child.material.transparent =
false;

child.material.opacity = 1;

child.material.metalness =
0.35;

child.material.roughness =
0.38;

child.material.envMapIntensity =
2;

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
"TITAN GUITAR READY"
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
2.6 +
Math.sin(
elapsed * 1.2
) * 0.28;

/* SMOOTH INTERACTION */

guitar.rotation.y +=
(
targetRotationY -
guitar.rotation.y
) * 0.03;

/* X AXIS */

guitar.rotation.x +=
(
targetRotationX -
guitar.rotation.x
) * 0.03;

/* AUTO MOTION */

guitar.rotation.y +=
0.003;

/* PREMIUM TILT */

guitar.rotation.z =
Math.sin(
elapsed * 1.1
) * 0.05;

}

/* ==================================================
CAMERA
================================================== */

camera.lookAt(
0,
0,
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

/* RESPONSIVE SCALE */

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