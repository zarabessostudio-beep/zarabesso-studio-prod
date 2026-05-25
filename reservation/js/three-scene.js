/* ==================================================
ZARABESSO STUDIO
MEGA CINEMATIC GUITAR
UPWARD LEFT HERO POSITION
ULTRA REALISTIC FRONT STRINGS VIEW
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
canvas.style.zIndex = "950";
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
28,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* ==================================================
CAMERA POSITION
MORE CINEMATIC
================================================== */

camera.position.set(
0,
1.2,
14
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
1.45;

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* GLOBAL LIGHT */

const ambient =
new THREE.AmbientLight(
0xffffff,
4.8
);

scene.add(ambient);

/* MAIN GOLD */

const goldLight =
new THREE.PointLight(
0xffcc66,
45,
80
);

goldLight.position.set(
8,
10,
12
);

scene.add(goldLight);

/* LEFT PURPLE EDGE */

const purpleLight =
new THREE.PointLight(
0x9d00ff,
40,
70
);

purpleLight.position.set(
-10,
6,
10
);

scene.add(purpleLight);

/* FRONT WHITE */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
6
);

frontLight.position.set(
0,
6,
15
);

scene.add(frontLight);

/* BLUE REFLECTION */

const blueLight =
new THREE.PointLight(
0x00ccff,
28,
70
);

blueLight.position.set(
-5,
-5,
8
);

scene.add(blueLight);

/* PINK SIDE */

const pinkLight =
new THREE.PointLight(
0xff0077,
25,
70
);

pinkLight.position.set(
10,
0,
6
);

scene.add(pinkLight);

/* ==================================================
RESPONSIVE SCALE
BIGGER THAN CURRENT VERSION
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 4.4;

}

if(window.innerWidth < 1000){

return 5.8;

}

return 7.2;

}

/* ==================================================
RESPONSIVE POSITION
UPPER LEFT HERO POSITION
================================================== */

function getPosition(){

if(window.innerWidth < 600){

return {
x:-1.8,
y:3.8
};

}

if(window.innerWidth < 1000){

return {
x:-3,
y:4.2
};

}

return {
x:-4.5,
y:4.8
};

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

/* MORE REALISTIC */

targetRotationY =
mouseX * 0.8;

targetRotationX =
mouseY * 0.35;

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
mouseX * 0.8;

targetRotationX =
mouseY * 0.35;

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
UPPER LEFT
================================================== */

const pos =
getPosition();

guitar.position.set(
pos.x,
pos.y,
0
);

/* ==================================================
ROTATION
IMPORTANT:
FACE FRONT + STRINGS VISIBLE
================================================== */

/* LEFT ANGLE */

guitar.rotation.y =
0.95;

/* UPWARD */

guitar.rotation.x =
-0.32;

/* SLIGHT CINEMATIC */

guitar.rotation.z =
0.08;

/* ==================================================
REALISTIC MATERIALS
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.visible = true;

child.castShadow = false;
child.receiveShadow = false;

if(child.material){

child.material.side =
THREE.DoubleSide;

/* PREMIUM REFLECTIONS */

child.material.metalness =
0.38;

child.material.roughness =
0.18;

child.material.envMapIntensity =
4.5;

child.material.needsUpdate =
true;

}

}

});

/* ==================================================
ADD TO SCENE
================================================== */

scene.add(guitar);

console.log(
"GUITAR HERO READY"
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
GUITAR ANIMATION
================================================== */

if(guitar){

const pos =
getPosition();

/* FLOAT */

guitar.position.y =
pos.y +
Math.sin(
elapsed * 1.3
) * 0.18;

/* SMOOTH Y ROTATION */

guitar.rotation.y +=
(
(0.95 + targetRotationY)
-
guitar.rotation.y
) * 0.035;

/* SMOOTH X ROTATION */

guitar.rotation.x +=
(
(-0.32 + targetRotationX)
-
guitar.rotation.x
) * 0.035;

/* CINEMATIC Z */

guitar.rotation.z =
0.08 +
Math.sin(
elapsed * 1.1
) * 0.03;

/* VERY SLOW AUTO MOTION */

guitar.rotation.y +=
0.0012;

}

/* ==================================================
CAMERA TARGET
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

const pos =
getPosition();

guitar.position.x =
pos.x;

guitar.position.y =
pos.y;

}

}
);