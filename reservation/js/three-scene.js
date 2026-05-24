/* ==================================================
ZARABESSO STUDIO
PREMIUM RESPONSIVE THREE.JS
VISIBLE GUITAR FINAL VERSION
COMPATIBLE WITH YOUR CURRENT CSS
================================================== */

const canvas =
document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

/* ==================================================
CANVAS PRIORITY
================================================== */

canvas.style.position = "absolute";

canvas.style.inset = "0";

canvas.style.width = "100%";

canvas.style.height = "100%";

canvas.style.zIndex = "150";

canvas.style.pointerEvents = "none";

canvas.style.display = "block";

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
45,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

/* BETTER POSITION */

camera.position.set(
0,
0,
7
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
container.clientWidth,
container.clientHeight
);

/* PIXEL RATIO */

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
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

/* SHADOW */

renderer.shadowMap.enabled =
false;

/* ==================================================
LIGHTS
================================================== */

/* MAIN LIGHT */

const mainLight =
new THREE.DirectionalLight(
0xffffff,
5
);

mainLight.position.set(
0,
2,
5
);

scene.add(mainLight);

/* GOLD LIGHT */

const goldLight =
new THREE.PointLight(
0xffb300,
18,
20
);

goldLight.position.set(
2,
2,
4
);

scene.add(goldLight);

/* PURPLE LIGHT */

const purpleLight =
new THREE.PointLight(
0xbb00ff,
12,
18
);

purpleLight.position.set(
-3,
2,
3
);

scene.add(purpleLight);

/* PINK LIGHT */

const pinkLight =
new THREE.PointLight(
0xff0088,
10,
18
);

pinkLight.position.set(
3,
-1,
2
);

scene.add(pinkLight);

/* ==================================================
AMBIENT LIGHT
================================================== */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.5
);

scene.add(ambient);

/* ==================================================
FLOOR
================================================== */

const floorGeometry =
new THREE.CircleGeometry(
5,
64
);

const floorMaterial =
new THREE.MeshStandardMaterial({

color:0x120018,

metalness:0.3,

roughness:0.6,

transparent:true,

opacity:0.9

});

const floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

floor.position.y = -2;

scene.add(floor);

/* ==================================================
RESPONSIVE SCALE
================================================== */

function getResponsiveScale(){

if(window.innerWidth < 500){

return 1;

}

if(window.innerWidth < 900){

return 1.3;

}

return 1.7;

}

/* ==================================================
GUITAR MODEL
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* LOAD MODEL */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
AUTO RESPONSIVE SIZE
================================================== */

const scale =
getResponsiveScale();

guitar.scale.set(
scale,
scale,
scale
);

/* ==================================================
POSITION
================================================== */

guitar.position.set(
0,
-1,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y = 0.4;

/* ==================================================
MATERIAL FIX
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
0.25;

child.material.roughness =
0.55;

child.material.envMapIntensity =
1.5;

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
"GUITAR SUCCESSFULLY VISIBLE"
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
"GUITAR LOAD ERROR:",
error
);

}

);

/* ==================================================
MOUSE INTERACTION
================================================== */

let mouseX = 0;

window.addEventListener(
"mousemove",
(e)=>{

mouseX =
(
e.clientX /
window.innerWidth
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

/* ROTATION */

guitar.rotation.y +=
0.002;

/* MOUSE */

guitar.rotation.y +=
mouseX * 0.008;

/* FLOAT */

guitar.position.y =
-1 +
Math.sin(
elapsed * 1.4
) * 0.08;

/* SMALL TILT */

guitar.rotation.z =
Math.sin(
elapsed * 0.8
) * 0.02;

}

/* FLOOR */

floor.rotation.z +=
0.001;

/* CAMERA */

camera.lookAt(
0,
-0.4,
0
);

/* RENDER */

renderer.render(
scene,
camera
);

}

animate();

/* ==================================================
RESPONSIVE RESIZE
================================================== */

window.addEventListener(
"resize",
()=>{

camera.aspect =
container.clientWidth /
container.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
container.clientWidth,
container.clientHeight
);

/* RESPONSIVE SCALE UPDATE */

if(guitar){

const scale =
getResponsiveScale();

guitar.scale.set(
scale,
scale,
scale
);

}

}
);