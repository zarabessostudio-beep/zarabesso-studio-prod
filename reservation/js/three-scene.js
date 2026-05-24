/* ==================================================
ZARABESSO STUDIO
FLOATING GUITAR UI VERSION
OPTIMIZED PREMIUM EDITION
================================================== */

const canvas =
document.getElementById("webgl");

/* ==================================================
USE HERO SECTION
================================================== */

const hero =
document.querySelector(".reservation-hero");

/* ==================================================
CANVAS STYLE
================================================== */

canvas.style.position = "absolute";

canvas.style.top = "0";

canvas.style.left = "0";

canvas.style.width = "100%";

canvas.style.height = "100%";

/* ABOVE ALL EFFECTS */

canvas.style.zIndex = "80";

/* BELOW NAVBAR */

canvas.style.pointerEvents = "none";

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
40,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* POSITION */

camera.position.z = 8;

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
1.5
)
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* MAIN */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.5
);

scene.add(ambient);

/* PURPLE */

const purpleLight =
new THREE.PointLight(
0xbb00ff,
20,
20
);

purpleLight.position.set(
-2,
2,
4
);

scene.add(purpleLight);

/* PINK */

const pinkLight =
new THREE.PointLight(
0xff0088,
20,
20
);

pinkLight.position.set(
3,
-1,
4
);

scene.add(pinkLight);

/* FRONT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
3
);

frontLight.position.set(
0,
1,
5
);

scene.add(frontLight);

/* ==================================================
RESPONSIVE SCALE
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 0.7;

}

if(window.innerWidth < 1000){

return 0.9;

}

return 1.1;

}

/* ==================================================
MODEL
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* ==================================================
LOAD GUITAR
================================================== */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
SIZE
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
================================================== */

/*
RIGHT SIDE
TOP SIDE
OPPOSITE H1
*/

guitar.position.set(
3.2,
1.2,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
-0.5;

/* ==================================================
MATERIAL FIX
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.visible = true;

if(child.material){

child.material.side =
THREE.DoubleSide;

child.material.metalness =
0.25;

child.material.roughness =
0.5;

child.material.envMapIntensity =
1.2;

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
"GUITAR LOADED"
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
MOUSE
================================================== */

let mouseX = 0;

let mouseY = 0;

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
1.2 +
Math.sin(
elapsed * 1.5
) * 0.12;

/* AUTO ROTATION */

guitar.rotation.y +=
0.002;

/* MOUSE INTERACTION */

guitar.rotation.y +=
mouseX * 0.01;

guitar.rotation.x =
mouseY * 0.08;

/* SMALL TILT */

guitar.rotation.z =
Math.sin(
elapsed
) * 0.03;

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