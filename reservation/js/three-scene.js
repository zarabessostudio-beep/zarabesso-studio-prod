/* ==================================================
ZARABESSO STUDIO
ULTRA PREMIUM FLOATING GUITAR
FINAL CINEMATIC VERSION
OPTIMIZED FOR VERCEL + THREE.JS
================================================== */

/* ==================================================
CANVAS
================================================== */

const canvas =
document.getElementById("webgl");

/* ==================================================
HERO SECTION
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

/* ABOVE GLASSMORPHISM */

canvas.style.zIndex = "500";

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
38,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* MORE CINEMATIC */

camera.position.set(
0,
0,
9
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

/* OPTIMIZATION */

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
1.5
)
);

/* COLOR */

renderer.outputColorSpace =
THREE.SRGBColorSpace;

/* CLEAR */

renderer.setClearColor(
0x000000,
0
);

/* SHADOW */

renderer.shadowMap.enabled =
false;

/* ==================================================
LIGHTS
================================================== */

/* AMBIENT */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.8
);

scene.add(ambient);

/* GOLD */

const goldLight =
new THREE.PointLight(
0xffcc66,
18,
25
);

goldLight.position.set(
2,
3,
5
);

scene.add(goldLight);

/* PURPLE */

const purpleLight =
new THREE.PointLight(
0xbb00ff,
22,
25
);

purpleLight.position.set(
-3,
2,
4
);

scene.add(purpleLight);

/* PINK */

const pinkLight =
new THREE.PointLight(
0xff0088,
18,
25
);

pinkLight.position.set(
4,
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
6
);

scene.add(frontLight);

/* ==================================================
RESPONSIVE SCALE
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 1.05;

}

if(window.innerWidth < 1000){

return 1.35;

}

return 1.7;

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
OUTSIDE GLASS
*/

guitar.position.set(
4.2,
2.8,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
-0.55;

/* ==================================================
MATERIAL BOOST
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = false;

child.receiveShadow = false;

child.visible = true;

if(child.material){

child.material.side =
THREE.DoubleSide;

child.material.transparent =
false;

child.material.opacity = 1;

child.material.metalness =
0.28;

child.material.roughness =
0.45;

child.material.envMapIntensity =
1.6;

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
"GUITAR LOADED SUCCESSFULLY"
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
GUITAR ANIMATION
================================================== */

if(guitar){

/* FLOAT */

guitar.position.y =
2.8 +
Math.sin(
elapsed * 1.4
) * 0.18;

/* AUTO ROTATION */

guitar.rotation.y +=
0.0025;

/* INTERACTION */

guitar.rotation.y +=
mouseX * 0.012;

guitar.rotation.x =
mouseY * 0.09;

/* SMALL TILT */

guitar.rotation.z =
Math.sin(
elapsed * 0.8
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