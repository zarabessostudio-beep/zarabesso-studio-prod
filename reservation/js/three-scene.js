const canvas = document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

/* ===================================================
SCENE
=================================================== */

const scene = new THREE.Scene();

scene.fog =
new THREE.FogExp2(0x050505,0.009);

/* ===================================================
CAMERA
=================================================== */

const camera =
new THREE.PerspectiveCamera(
42,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

camera.position.set(0,0.6,8);

/* ===================================================
RENDERER
=================================================== */

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
Math.min(window.devicePixelRatio,2)
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.45;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

renderer.physicallyCorrectLights = true;

/* ===================================================
LIGHTS
=================================================== */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.2
);

scene.add(ambient);

/* GOLD MAIN LIGHT */

const goldLight =
new THREE.PointLight(
0xffd700,
120
);

goldLight.position.set(2,4,4);

goldLight.castShadow = true;

goldLight.shadow.mapSize.width = 2048;
goldLight.shadow.mapSize.height = 2048;

scene.add(goldLight);

/* BLUE CINEMATIC LIGHT */

const blueLight =
new THREE.PointLight(
0x3b82f6,
50
);

blueLight.position.set(-4,1,5);

scene.add(blueLight);

/* BACK RIM LIGHT */

const rimLight =
new THREE.DirectionalLight(
0xffffff,
5
);

rimLight.position.set(0,3,-5);

scene.add(rimLight);

/* SPOTLIGHT */

const spotLight =
new THREE.SpotLight(
0xfff4d6,
150
);

spotLight.position.set(0,8,5);

spotLight.angle = 0.22;

spotLight.penumbra = 1;

spotLight.decay = 2;

spotLight.distance = 40;

spotLight.castShadow = true;

scene.add(spotLight);

/* ===================================================
FLOOR
=================================================== */

const floorGeometry =
new THREE.CircleGeometry(7,128);

const floorMaterial =
new THREE.MeshPhysicalMaterial({

color:0x080808,

metalness:1,

roughness:0.18,

clearcoat:1,

clearcoatRoughness:0.1,

reflectivity:1,

emissive:0x221100,

emissiveIntensity:0.4

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

/* ===================================================
ENERGY RING
=================================================== */

const ringGeometry =
new THREE.TorusGeometry(
2.9,
0.08,
32,
200
);

const ringMaterial =
new THREE.MeshBasicMaterial({

color:0xffd700,

transparent:true,

opacity:0.9

});

const energyRing =
new THREE.Mesh(
ringGeometry,
ringMaterial
);

energyRing.rotation.x =
Math.PI / 2;

energyRing.position.y = -1.9;

scene.add(energyRing);

/* ===================================================
GOLD PARTICLES
=================================================== */

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 3500;

const positions =
new Float32Array(
particlesCount * 3
);

for(let i=0;i<
particlesCount*3;i++){

positions[i] =
(Math.random()-0.5)*18;

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

opacity:0.7,

depthWrite:false

});

const particles =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

/* ===================================================
SMOKE AURA
=================================================== */

const smokeGeometry =
new THREE.SphereGeometry(
2.8,
64,
64
);

const smokeMaterial =
new THREE.MeshBasicMaterial({

color:0xffd700,

transparent:true,

opacity:0.04,

wireframe:true

});

const smokeAura =
new THREE.Mesh(
smokeGeometry,
smokeMaterial
);

smokeAura.position.y = -0.2;

scene.add(smokeAura);

/* ===================================================
FLOATING MUSIC NOTES
=================================================== */

const notes = [];

for(let i=0;i<14;i++){

const noteGeometry =
new THREE.SphereGeometry(
0.04,
12,
12
);

const noteMaterial =
new THREE.MeshBasicMaterial({

color:i % 2 === 0
? 0xffd700
: 0xffffff

});

const note =
new THREE.Mesh(
noteGeometry,
noteMaterial
);

note.position.set(

(Math.random()-0.5)*5,

Math.random()*4 - 1,

(Math.random()-0.5)*5

);

scene.add(note);

notes.push(note);

}

/* ===================================================
MODEL
=================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* INTERACTION */

let targetRotation = 0;
let currentRotation = 0;

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* PREMIUM SCALE */

guitar.scale.set(
5.8,
5.8,
5.8
);

/* CENTER POSITION */

guitar.position.set(
0,
-1.4,
0
);

guitar.rotation.y = 0;

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

child.material.side =
THREE.DoubleSide;

child.material.needsUpdate = true;

/* PREMIUM MATERIAL */

if(child.material){

child.material.metalness = 0.85;

child.material.roughness = 0.2;

child.material.envMapIntensity = 3;

child.material.clearcoat = 1;

child.material.clearcoatRoughness = 0.05;

}

}

});

scene.add(guitar);

console.log(
"Guitare Premium chargée"
);

},

(xhr)=>{

console.log(
(xhr.loaded / xhr.total * 100)
+ "% chargé"
);

},

(error)=>{

console.log(
"Erreur GLB :",
error
);

}

);

/* ===================================================
MOUSE INTERACTION
=================================================== */

window.addEventListener(
"mousemove",
(e)=>{

const mouseX =
(e.clientX / window.innerWidth)
- 0.5;

targetRotation =
mouseX * Math.PI * 0.9;

}
);

/* ===================================================
CLOCK
=================================================== */

const clock =
new THREE.Clock();

/* ===================================================
ANIMATION
=================================================== */

function animate(){

requestAnimationFrame(animate);

const elapsed =
clock.getElapsedTime();

/* GUITAR */

if(guitar){

/* SMOOTH ROTATION */

currentRotation +=
(targetRotation - currentRotation)
* 0.04;

guitar.rotation.y =
currentRotation;

/* FLOATING */

guitar.position.y =
-1.4 +
Math.sin(elapsed*1.5)
*0.16;

/* TILT */

guitar.rotation.z =
Math.sin(elapsed)
*0.04;

/* ENERGY */

guitar.rotation.x =
Math.sin(elapsed*0.5)
*0.02;

}

/* LIGHTS ANIMATION */

goldLight.intensity =
115 +
Math.sin(elapsed*2)
*15;

blueLight.intensity =
45 +
Math.sin(elapsed*1.5)
*8;

/* RING */

energyRing.rotation.z +=
0.004;

energyRing.material.opacity =
0.65 +
Math.sin(elapsed*3)
*0.15;

/* PARTICLES */

particles.rotation.y +=
0.0007;

/* SMOKE */

smokeAura.rotation.y +=
0.002;

smokeAura.scale.set(

1 + Math.sin(elapsed*1.5)*0.04,

1 + Math.sin(elapsed*1.5)*0.04,

1 + Math.sin(elapsed*1.5)*0.04

);

/* NOTES FLOAT */

notes.forEach((note,index)=>{

note.position.y +=
Math.sin(
elapsed + index
)*0.002;

note.rotation.y += 0.02;

});

/* CAMERA CINEMATIC */

camera.position.x =
Math.sin(elapsed*0.25)
*0.25;

camera.position.y =
0.6 +
Math.sin(elapsed*0.4)
*0.08;

camera.lookAt(0,0,0);

/* RENDER */

renderer.render(scene,camera);

}

animate();

/* ===================================================
RESIZE
=================================================== */

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