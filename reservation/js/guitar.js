/* =========================================================
ZARABESSO STUDIO
PREMIUM GUITAR ENGINE
THREE.JS SAFE VERSION
========================================================= */

const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

/* =========================================================
CAMERA
========================================================= */

const camera = new THREE.PerspectiveCamera(
35,
canvas.clientWidth / canvas.clientHeight,
0.1,
1000
);

camera.position.set(0, 0.8, 5);

/* =========================================================
RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({
canvas,
alpha:true,
antialias:true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

renderer.outputEncoding = THREE.sRGBEncoding;

renderer.physicallyCorrectLights = true;

/* =========================================================
LIGHTS
========================================================= */

const ambientLight = new THREE.AmbientLight(
0xffffff,
2.2
);

scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(
0xffffff,
3
);

mainLight.position.set(5,5,5);

scene.add(mainLight);

const orangeLight = new THREE.PointLight(
0xffaa33,
4,
20
);

orangeLight.position.set(2,2,3);

scene.add(orangeLight);

const blueLight = new THREE.PointLight(
0x4488ff,
2,
20
);

blueLight.position.set(-3,-1,2);

scene.add(blueLight);

/* =========================================================
LOAD MODEL
========================================================= */

const loader = new THREE.GLTFLoader();

let guitar = null;

loader.load(

"/reservation/assets/models/guitar.glb",

function(gltf){

guitar = gltf.scene;

/* =========================================================
ORIGINAL COLORS
========================================================= */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.4;

child.material.roughness = 0.5;

}

}

});

/* =========================================================
SIZE
========================================================= */

guitar.scale.set(4.2,4.2,4.2);

/* =========================================================
POSITION
========================================================= */

guitar.position.set(
1.8,
-1.2,
0
);

/* =========================================================
ROTATION
========================================================= */

guitar.rotation.set(
0.2,
-0.7,
0.05
);

scene.add(guitar);

},

undefined,

function(error){

console.error(
"Erreur chargement GLB :",
error
);

}

);

/* =========================================================
MOUSE PARALLAX
========================================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",(event)=>{

mouseX =
(event.clientX / window.innerWidth - 0.5);

mouseY =
(event.clientY / window.innerHeight - 0.5);

});

/* =========================================================
ANIMATION
========================================================= */

function animate(){

requestAnimationFrame(animate);

if(guitar){

guitar.rotation.y += 0.002;

guitar.rotation.x =
mouseY * 0.15;

guitar.position.y =
-1.2 +
Math.sin(Date.now()*0.0015)*0.08;

}

camera.position.x +=
(mouseX * 0.5 - camera.position.x)*0.03;

renderer.render(scene,camera);

}

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener("resize",()=>{

camera.aspect =
canvas.clientWidth / canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
canvas.clientWidth,
canvas.clientHeight
);

});