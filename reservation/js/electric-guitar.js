/* =========================================================
ZARABESSO STUDIO
PURE GLB GUITAR ENGINE
FINAL CLEAN STABLE VERSION
NO PARTICLES
NO EFFECTS
ONLY GLB
FULL GUITAR VISIBLE
-5% SMALLER
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

if(electricCanvas){

/* =========================================================
SAFE OVERFLOW
========================================================= */

[
document.body,
document.documentElement,
electricCanvas,
electricCanvas.parentElement
].forEach(el=>{

if(!el) return;

el.style.overflow = "visible";
el.style.clipPath = "none";

});

/* =========================================================
DEVICE
========================================================= */

const isMobile =
window.innerWidth < 768;

/* =========================================================
SCENE
========================================================= */

const scene =
new THREE.Scene();

/* =========================================================
CAMERA
========================================================= */

const camera =
new THREE.PerspectiveCamera(

20,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
5000

);

/*
MORE FAR
NO CROPPING
*/

camera.position.set(
0,
0,
19
);

/* =========================================================
RENDERER
========================================================= */

const renderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,

alpha:true,

antialias:true,

powerPreference:
"high-performance"

});

renderer.setClearColor(
0x000000,
0
);

renderer.outputEncoding =
THREE.sRGBEncoding;

renderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
isMobile ? 1.2 : 2
)

);

renderer.setSize(

electricCanvas.clientWidth,
electricCanvas.clientHeight,
false

);

renderer.shadowMap.enabled =
false;

renderer.physicallyCorrectLights =
false;

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.6
);

scene.add(ambient);

const front =
new THREE.DirectionalLight(
0xffffff,
1.8
);

front.position.set(
0,
3,
10
);

scene.add(front);

const rim =
new THREE.DirectionalLight(
0xffffff,
1
);

rim.position.set(
5,
2,
5
);

scene.add(rim);

/* =========================================================
LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let guitar = null;

/* =========================================================
RESPONSIVE CONFIG
========================================================= */

function getConfig(){

if(window.innerWidth < 480){

return{

scale:2.0,

x:0,

y:-0.8,

rotationSpeed:0.006

};

}

if(window.innerWidth < 768){

return{

scale:2.6,

x:0,

y:-0.9,

rotationSpeed:0.007

};

}

if(window.innerWidth < 1200){

return{

scale:3.4,

x:0.8,

y:-1,

rotationSpeed:0.008

};

}

return{

scale:4.0,

x:1.3,

y:-1.1,

rotationSpeed:0.009

};

}

}

let config =
getConfig();

/* =========================================================
LOAD MODEL
========================================================= */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar =
gltf.scene;

/* =========================================================
OPTIMIZATION
========================================================= */

guitar.traverse((child)=>{

if(child.isMesh){

child.frustumCulled =
false;

child.castShadow =
false;

child.receiveShadow =
false;

if(child.material){

child.material.needsUpdate =
true;

}

}

});

/* =========================================================
SCALE
========================================================= */

guitar.scale.set(
config.scale,
config.scale,
config.scale
);

/* =========================================================
POSITION
========================================================= */

guitar.position.set(
config.x,
config.y,
0
);

/* =========================================================
ROTATION
========================================================= */

guitar.rotation.set(

0,
Math.PI / 2,
-1.05

);

/* =========================================================
ADD
========================================================= */

scene.add(guitar);

},

undefined,

(error)=>{

console.error(
"Erreur GLB:",
error
);

}

);

/* =========================================================
CLOCK
========================================================= */

const clock =
new THREE.Clock();

/* =========================================================
ANIMATION
========================================================= */

function animate(){

requestAnimationFrame(
animate
);

const elapsed =
clock.getElapsedTime();

if(guitar){

/*
SMOOTH ROTATION
*/

guitar.rotation.y +=
config.rotationSpeed;

/*
SMOOTH FLOAT
*/

guitar.position.y =

config.y +

Math.sin(elapsed * 1.6)

* 0.05;

}

/* =========================================================
RENDER
========================================================= */

renderer.render(
scene,
camera
);

}

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(

"resize",

()=>{

config =
getConfig();

const width =
electricCanvas.clientWidth;

const height =
electricCanvas.clientHeight;

camera.aspect =
width / height;

camera.updateProjectionMatrix();

renderer.setSize(
width,
height,
false
);

if(guitar){

guitar.scale.set(
config.scale,
config.scale,
config.scale
);

guitar.position.set(
config.x,
config.y,
0
);

}

},

{ passive:true }

);

/* =========================================================
CLEAN MEMORY
========================================================= */

window.addEventListener(

"pagehide",

()=>{

renderer.dispose();

}

);

