// ===============================
// PREMIUM OLED GUITAR SCENE
// ZARABESSO STUDIO
// three-scene.js
// ===============================

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x050505, 0.035);

// CAMERA

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 1.2, 7);

// RENDERER

const renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("webgl"),
alpha: true,
antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.5;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ===============================
// BACKGROUND OLED
// ===============================

scene.background = new THREE.Color(0x020202);

// ===============================
// LIGHTS
// ===============================

// RED LIGHT

const redLight = new THREE.PointLight(
0xff003c,
18,
30
);

redLight.position.set(-4, 2, 4);

redLight.castShadow = true;

scene.add(redLight);

// PURPLE LIGHT

const purpleLight = new THREE.PointLight(
0x8f00ff,
20,
35
);

purpleLight.position.set(4, 3, 2);

purpleLight.castShadow = true;

scene.add(purpleLight);

// GREEN LIGHT

const greenLight = new THREE.PointLight(
0x00ff99,
16,
25
);

greenLight.position.set(0, -2, 5);

greenLight.castShadow = true;

scene.add(greenLight);

// AMBIENT

const ambient = new THREE.AmbientLight(
0xffffff,
0.35
);

scene.add(ambient);

// SPOTLIGHT PREMIUM

const spotLight = new THREE.SpotLight(
0xffffff,
15
);

spotLight.position.set(0, 10, 8);

spotLight.angle = 0.35;

spotLight.penumbra = 1;

spotLight.decay = 2;

spotLight.distance = 50;

spotLight.castShadow = true;

scene.add(spotLight);

// ===============================
// FLOOR OLED
// ===============================

const floorGeometry = new THREE.CircleGeometry(5, 64);

const floorMaterial = new THREE.MeshStandardMaterial({

color: 0x090909,

metalness: 1,

roughness: 0.15,

emissive: 0x120012,

emissiveIntensity: 0.35

});

const floor = new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -2.3;

floor.receiveShadow = true;

scene.add(floor);

// ===============================
// NEON RINGS
// ===============================

const ringGeometry = new THREE.TorusGeometry(
3.5,
0.04,
16,
100
);

const ringMaterial = new THREE.MeshBasicMaterial({
color: 0x8f00ff
});

const ring = new THREE.Mesh(
ringGeometry,
ringMaterial
);

ring.rotation.x = Math.PI / 2;

ring.position.y = -1.2;

scene.add(ring);

const ring2 = ring.clone();

ring2.scale.set(1.3,1.3,1.3);

ring2.material = new THREE.MeshBasicMaterial({
color:0xff004c
});

scene.add(ring2);

// ===============================
// PARTICLES
// ===============================

const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 2500;

const posArray = new Float32Array(
particlesCount * 3
);

for(let i = 0; i < particlesCount * 3; i++){

posArray[i] = (Math.random() - 0.5) * 20;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial =
new THREE.PointsMaterial({

size: 0.02,

color: 0x8f00ff,

transparent: true,

opacity: 0.8

});

const particlesMesh = new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

// ===============================
// LOADER
// ===============================

const loader = new THREE.GLTFLoader();

let guitar;

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

guitar.scale.set(2.4,2.4,2.4);

guitar.position.set(0,-1.1,0);

guitar.rotation.y = 0.5;

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 1;

child.material.roughness = 0.25;

}

}

});

scene.add(guitar);

},

undefined,

(error)=>{

console.log("Erreur modèle :", error);

}

);

// ===============================
// ANIMATION
// ===============================

const clock = new THREE.Clock();

function animate(){

requestAnimationFrame(animate);

const elapsed = clock.getElapsedTime();

// GUITAR

if(guitar){

guitar.rotation.y += 0.003;

guitar.position.y =
-1.1 + Math.sin(elapsed * 1.5) * 0.15;

guitar.rotation.z =
Math.sin(elapsed * 0.8) * 0.03;

}

// PULSING LIGHTS

redLight.intensity =
15 + Math.sin(elapsed * 2) * 6;

purpleLight.intensity =
18 + Math.sin(elapsed * 1.5) * 7;

greenLight.intensity =
12 + Math.sin(elapsed * 2.5) * 5;

// NEON RINGS

ring.rotation.z += 0.003;

ring2.rotation.z -= 0.002;

// PARTICLES

particlesMesh.rotation.y += 0.0007;

// CAMERA PARALLAX

camera.position.x =
Math.sin(elapsed * 0.3) * 0.3;

camera.lookAt(0,0,0);

renderer.render(scene, camera);

}

animate();

// ===============================
// RESIZE
// ===============================

window.addEventListener("resize",()=>{

camera.aspect =
window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});