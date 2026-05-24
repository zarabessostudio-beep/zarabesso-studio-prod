/* ==================================================
ZARABESSO STUDIO
ULTRA CINEMATIC FLOATING GUITAR
MEGA PREMIUM CENTER VERSION
+40% BIGGER EDITION
================================================== */

/* ==================================================
CANVAS
================================================== */

const canvas =
document.getElementById("webgl");

/* ==================================================
HERO
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

/* ABOVE ALL */

canvas.style.zIndex = "600";

/* INTERACTIVE */

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
36,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* MORE DEPTH */

camera.position.set(
0,
0,
10
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
3
);

scene.add(ambient);

/* GOLD */

const goldLight =
new THREE.PointLight(
0xffcc66,
24,
30
);

goldLight.position.set(
2,
4,
6
);

scene.add(goldLight);

/* PURPLE */

const purpleLight =
new THREE.PointLight(
0xbb00ff,
26,
30
);

purpleLight.position.set(
-4,
3,
5
);

scene.add(purpleLight);

/* PINK */

const pinkLight =
new THREE.PointLight(
0xff0088,
22,
30
);

pinkLight.position.set(
5,
-1,
5
);

scene.add(pinkLight);

/* FRONT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
3.5
);

frontLight.position.set(
0,
2,
8
);

scene.add(frontLight);

/* ==================================================
RESPONSIVE SCALE
+40% BIGGER
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 1.45;

}

if(window.innerWidth < 1000){

return 1.9;

}

return 2.4;

}

/* ==================================================
LOADER
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* ==================================================
LOAD MODEL
================================================== */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
BIG SCALE
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
CENTER RIGHT PREMIUM
================================================== */

guitar.position.set(
2.2,
1.9,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
-0.45;

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
0.3;

child.material.roughness =
0.42;

child.material.envMapIntensity =
1.8;

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
"PREMIUM GUITAR READY"
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
MOUSE INTERACTION
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
1.9 +
Math.sin(
elapsed * 1.3
) * 0.22;

/* ROTATION */

guitar.rotation.y +=
0.0028;

/* MOUSE */

guitar.rotation.y +=
mouseX * 0.014;

guitar.rotation.x =
mouseY * 0.11;

/* PREMIUM TILT */

guitar.rotation.z =
Math.sin(
elapsed * 0.9
) * 0.04;

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

/* RESPONSIVE */

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