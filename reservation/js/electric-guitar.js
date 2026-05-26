/* =========================================================
ZARABESSO STUDIO
PURE GLB GUITAR ENGINE
ULTRA STABLE CLEAN VERSION
NO PARTICLES
NO FX
ONLY GLB
VERTICAL POSITION
360 ROTATION
FULL RESPONSIVE
IOS + MOBILE SAFE
INDEPENDENT GUITAR
OLED BACKGROUND READY
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

if(electricCanvas){

/* =========================================================
SAFE GLOBAL
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

const isIOS =
/iPad|iPhone|iPod/.test(
navigator.userAgent
);

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

22,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
1000

);

/*
SAFE DISTANCE
FULL GUITAR VISIBLE
*/

camera.position.set(
0,
0,
18
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

renderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
isMobile ? 1.2 : 1.8
)

);

renderer.setSize(

electricCanvas.clientWidth,
electricCanvas.clientHeight,
false

);

renderer.setClearColor(
0x000000,
0
);

renderer.outputEncoding =
THREE.sRGBEncoding;

renderer.shadowMap.enabled =
false;

renderer.physicallyCorrectLights =
false;

/* =========================================================
LIGHTS
CLEAN ONLY
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.4
);

scene.add(ambient);

const front =
new THREE.DirectionalLight(
0xffffff,
1.2
);

front.position.set(
0,
2,
5
);

scene.add(front);

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

/* SMALL MOBILE */

if(window.innerWidth <= 480){

return{

scale:1.9,
x:0,
y:-1.15,
rotationSpeed:0.006

};

}

/* MOBILE */

if(window.innerWidth <= 768){

return{

scale:2.4,
x:0,
y:-1.1,
rotationSpeed:0.0065

};

}

/* TABLET */

if(window.innerWidth <= 1100){

return{

scale:3.0,
x:0.2,
y:-1.05,
rotationSpeed:0.007

};

}

/* DESKTOP */

return{

scale:3.5,
x:0.8,
y:-1,
rotationSpeed:0.0075

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

child.castShadow = false;
child.receiveShadow = false;
child.frustumCulled = false;

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
VERTICAL POSITION
========================================================= */

guitar.rotation.set(

0,
Math.PI / 2,
0

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

/* =========================================================
SMOOTH 360 ROTATION
========================================================= */

guitar.rotation.y +=
config.rotationSpeed;

/* =========================================================
VERY LIGHT FLOAT
========================================================= */

guitar.position.y =

config.y +

Math.sin(elapsed * 1.5)
* 0.03;

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
IOS SAFE
========================================================= */

if(isIOS){

window.addEventListener(
"touchstart",
()=>{},
{ passive:true }
);

}

/* =========================================================
MEMORY CLEAN
========================================================= */

window.addEventListener(

"pagehide",

()=>{

renderer.dispose();

}

);

}