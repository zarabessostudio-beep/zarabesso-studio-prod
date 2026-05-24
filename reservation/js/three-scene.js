/* ==================================================
ZARABESSO STUDIO
ULTRA PREMIUM CINEMATIC THREE.JS
FINAL OLED VERSION
================================================== */

const canvas =
document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

/* ==================================================
CANVAS PRIORITY
================================================== */

/* ABOVE ALL ANIMATIONS */

canvas.style.position = "absolute";
canvas.style.inset = "0";
canvas.style.zIndex = "900";

/* BELOW NAVBAR + BURGER */

document.querySelector(
".reservation-navbar"
).style.zIndex = "99999";

/* IMPORTANT */

canvas.style.pointerEvents = "none";

/* ==================================================
SCENE
================================================== */

const scene =
new THREE.Scene();

scene.background = null;

scene.fog =
new THREE.FogExp2(
0x050505,
0.045
);

/* ==================================================
CAMERA
================================================== */

const camera =
new THREE.PerspectiveCamera(
30,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

camera.position.set(
0,
0,
12
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

/* TONE */

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
1.8;

/* SHADOW */

renderer.shadowMap.enabled =
true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

/* LIGHT */

renderer.physicallyCorrectLights =
true;

/* TRANSPARENT */

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* GLOBAL */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.6
);

scene.add(ambient);

/* GOLD CINEMA */

const goldLight =
new THREE.SpotLight(
0xffd700,
350
);

goldLight.position.set(
0,
8,
8
);

goldLight.angle = 0.32;

goldLight.penumbra = 1;

goldLight.decay = 2;

goldLight.distance = 80;

goldLight.castShadow = true;

goldLight.shadow.mapSize.width =
4096;

goldLight.shadow.mapSize.height =
4096;

scene.add(goldLight);

/* BLUE OLED */

const blueLight =
new THREE.PointLight(
0x00bbff,
55,
40
);

blueLight.position.set(
-5,
2,
5
);

scene.add(blueLight);

/* RED CINEMA */

const redLight =
new THREE.PointLight(
0xff2200,
40,
35
);

redLight.position.set(
5,
1,
4
);

scene.add(redLight);

/* FRONT LIGHT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
8
);

frontLight.position.set(
0,
2,
10
);

scene.add(frontLight);

/* RIM LIGHT */

const rimLight =
new THREE.DirectionalLight(
0xffffff,
6
);

rimLight.position.set(
0,
2,
-8
);

scene.add(rimLight);

/* ==================================================
FLOOR
================================================== */

const floorGeometry =
new THREE.CircleGeometry(
10,
128
);

const floorMaterial =
new THREE.MeshPhysicalMaterial({

color:0x050505,

metalness:1,

roughness:0.08,

clearcoat:1,

reflectivity:1,

transparent:true,

opacity:0.96

});

const floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

floor.position.y = -2.5;

floor.receiveShadow = true;

scene.add(floor);

/* ==================================================
ENERGY PLATFORM
================================================== */

const platformGeometry =
new THREE.TorusGeometry(
3.5,
0.08,
32,
200
);

const platformMaterial =
new THREE.MeshBasicMaterial({

color:0xffd700,

transparent:true,

opacity:0.9

});

const platform =
new THREE.Mesh(
platformGeometry,
platformMaterial
);

platform.rotation.x =
Math.PI / 2;

platform.position.y = -2.15;

scene.add(platform);

/* ==================================================
PREMIUM PARTICLES
================================================== */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 1800;

const positions =
new Float32Array(
particlesCount * 3
);

for(let i = 0;
i < particlesCount * 3;
i++){

positions[i] =
(Math.random() - 0.5)
* 18;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.03,

color:0xffd700,

transparent:true,

opacity:0.55,

depthWrite:false

});

const particles =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

/* ==================================================
GUITAR MODEL
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* INTERACTION */

let targetX = 0;
let targetY = 0;

/* LOAD */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* SCALE */

guitar.scale.set(
3.8,
3.8,
3.8
);

/* POSITION */

guitar.position.set(
0,
-2,
0
);

/* ROTATION */

guitar.rotation.y =
0.35;

/* MATERIALS */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

child.material.side =
THREE.DoubleSide;

if(child.material){

child.material.metalness =
0.45;

child.material.roughness =
0.28;

child.material.envMapIntensity =
2.5;

child.material.emissive =
new THREE.Color(0x221100);

child.material.emissiveIntensity =
0.08;

child.material.needsUpdate =
true;

}

}

});

scene.add(guitar);

console.log(
"ULTRA PREMIUM GUITAR LOADED"
);

},

undefined,

(error)=>{

console.error(
"GLB ERROR :",
error
);

}

);

/* ==================================================
MOUSE
================================================== */

window.addEventListener(
"mousemove",
(e)=>{

targetX =
(e.clientX /
window.innerWidth - 0.5);

targetY =
(e.clientY /
window.innerHeight - 0.5);

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

/* GUITAR */

if(guitar){

/* AUTO ROTATION */

guitar.rotation.y +=
0.0025;

/* MOUSE */

guitar.rotation.y +=
(targetX * 0.012);

guitar.rotation.x =
targetY * 0.08;

/* FLOAT */

guitar.position.y =
-2 +
Math.sin(elapsed * 1.5)
* 0.18;

/* TILT */

guitar.rotation.z =
Math.sin(elapsed * 0.8)
* 0.025;

}

/* LIGHTS */

goldLight.intensity =
320 +
Math.sin(elapsed * 2)
* 30;

blueLight.intensity =
48 +
Math.sin(elapsed)
* 8;

redLight.intensity =
35 +
Math.sin(elapsed * 1.5)
* 5;

/* PLATFORM */

platform.rotation.z +=
0.002;

/* PARTICLES */

particles.rotation.y +=
0.0007;

/* CAMERA */

camera.position.x =
Math.sin(elapsed * 0.3)
* 0.15;

camera.position.y =
Math.sin(elapsed * 0.5)
* 0.08;

camera.lookAt(
0,
-1,
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
RESIZE
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

}
);