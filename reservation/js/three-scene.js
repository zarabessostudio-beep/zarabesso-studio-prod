const canvas =
document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

/* ==================================================
SCENE
================================================== */

const scene =
new THREE.Scene();

scene.background = null;

scene.fog =
new THREE.FogExp2(
0x050505,
0.006
);

/* ==================================================
CAMERA
================================================== */

const camera =
new THREE.PerspectiveCamera(
35,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

camera.position.set(
0,
0.2,
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

renderer.setSize(
container.clientWidth,
container.clientHeight
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
1.3;

renderer.shadowMap.enabled =
true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

renderer.physicallyCorrectLights =
true;

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
1.8
);

scene.add(ambient);

/* MAIN GOLD */

const mainLight =
new THREE.SpotLight(
0xffd700,
220
);

mainLight.position.set(
0,
8,
6
);

mainLight.angle = 0.28;

mainLight.penumbra = 1;

mainLight.decay = 2;

mainLight.distance = 60;

mainLight.castShadow = true;

mainLight.shadow.mapSize.width =
2048;

mainLight.shadow.mapSize.height =
2048;

scene.add(mainLight);

/* BLUE SIDE */

const blueLight =
new THREE.PointLight(
0x3b82f6,
40,
30
);

blueLight.position.set(
-4,
2,
4
);

scene.add(blueLight);

/* RED SIDE */

const redLight =
new THREE.PointLight(
0xff3300,
25,
25
);

redLight.position.set(
4,
1,
3
);

scene.add(redLight);

/* BACK RIM */

const rimLight =
new THREE.DirectionalLight(
0xffffff,
6
);

rimLight.position.set(
0,
2,
-6
);

scene.add(rimLight);

/* ==================================================
FLOOR
================================================== */

const floorGeometry =
new THREE.CircleGeometry(
8,
128
);

const floorMaterial =
new THREE.MeshPhysicalMaterial({

color:0x050505,

metalness:1,

roughness:0.12,

clearcoat:1,

reflectivity:1,

transparent:true,

opacity:0.92

});

const floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

floor.position.y = -2.2;

floor.receiveShadow = true;

scene.add(floor);

/* ==================================================
ENERGY PLATFORM
================================================== */

const platformGeometry =
new THREE.TorusGeometry(
3,
0.08,
32,
200
);

const platformMaterial =
new THREE.MeshBasicMaterial({

color:0xffd700,

transparent:true,

opacity:0.7

});

const platform =
new THREE.Mesh(
platformGeometry,
platformMaterial
);

platform.rotation.x =
Math.PI / 2;

platform.position.y = -1.9;

scene.add(platform);

/* ==================================================
PREMIUM PARTICLES
================================================== */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 1200;

const positions =
new Float32Array(
particlesCount * 3
);

for(let i = 0;
i < particlesCount * 3;
i++){

positions[i] =
(Math.random() - 0.5)
* 14;

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

size:0.025,

color:0xffd700,

transparent:true,

opacity:0.4,

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

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* SCALE */

guitar.scale.set(
7,
7,
7
);

/* POSITION */

guitar.position.set(
0,
-1,
0
);

/* ROTATION */

guitar.rotation.y = 0.3;

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

child.material.side =
THREE.DoubleSide;

/* PREMIUM MATERIAL */

if(child.material){

child.material.metalness =
0.9;

child.material.roughness =
0.18;

child.material.envMapIntensity =
4;

child.material.needsUpdate =
true;

}

}

});

scene.add(guitar);

console.log(
"Guitar loaded successfully"
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
MOUSE + TOUCH
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

window.addEventListener(
"touchmove",
(e)=>{

targetX =
(e.touches[0].clientX /
window.innerWidth - 0.5);

targetY =
(e.touches[0].clientY /
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

guitar.rotation.y += 0.003;

/* INTERACTION */

guitar.rotation.y +=
(targetX * 0.02);

guitar.rotation.x =
targetY * 0.15;

/* FLOAT */

guitar.position.y =
-1 +
Math.sin(elapsed * 1.8)
* 0.15;

/* TILT */

guitar.rotation.z =
Math.sin(elapsed)
* 0.03;

}

/* LIGHTS */

mainLight.intensity =
210 +
Math.sin(elapsed * 2)
* 20;

blueLight.intensity =
35 +
Math.sin(elapsed)
* 5;

/* PLATFORM */

platform.rotation.z +=
0.003;

/* PARTICLES */

particles.rotation.y +=
0.0005;

/* CAMERA */

camera.position.x =
Math.sin(elapsed * 0.3)
* 0.2;

camera.lookAt(
0,
0,
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