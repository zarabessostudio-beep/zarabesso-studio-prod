/* =========================================================
ZARABESSO STUDIO
ULTIMATE GUITAR ENGINE
FINAL STABLE RELEASE
NO CROPPING
FULL GUITAR VISIBLE
FAST PREMIUM ANIMATION
PARTICLE READY
GPU OPTIMIZED
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
el.style.maskImage = "none";
el.style.webkitMaskImage = "none";

});

/* =========================================================
DEVICE
========================================================= */

const isMobile =
window.innerWidth < 768;

const isTablet =
window.innerWidth >= 768 &&
window.innerWidth < 1200;

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

18,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
5000

);

/*
IMPORTANT
CAMERA MORE FAR
PREVENT CROPPING
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

renderer.setClearColor(
0x000000,
0
);

renderer.outputEncoding =
THREE.sRGBEncoding;

renderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
isMobile ? 1.3 : 2
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

renderer.toneMapping =
THREE.NoToneMapping;

/* =========================================================
GPU BOOST
========================================================= */

renderer.domElement.style.transform =
"translate3d(0,0,0)";

renderer.domElement.style.backfaceVisibility =
"hidden";

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.5
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

scale:2.2,

x:0,

y:-0.2,

rotationSpeed:0.008,

floatIntensity:0.04,

moveIntensity:0.02

};

}

if(window.innerWidth < 768){

return{

scale:2.8,

x:0,

y:-0.3,

rotationSpeed:0.009,

floatIntensity:0.05,

moveIntensity:0.03

};

}

if(window.innerWidth < 1200){

return{

scale:3.6,

x:1,

y:-0.4,

rotationSpeed:0.010,

floatIntensity:0.06,

moveIntensity:0.04

};

}

return{

scale:4.2,

x:1.6,

y:-0.5,

rotationSpeed:0.011,

floatIntensity:0.08,

moveIntensity:0.05

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

child.material.depthWrite =
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
PREMIUM FAST ROTATION
*/

guitar.rotation.y +=
config.rotationSpeed;

/*
FLOATING
*/

guitar.position.y =

config.y +

Math.sin(elapsed * 2)

*

config.floatIntensity;

/*
SIDE MOVEMENT
*/

guitar.position.x =

config.x +

Math.cos(elapsed * 0.8)

*

config.moveIntensity;

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
MEMORY CLEAN
========================================================= */

window.addEventListener(

"pagehide",

()=>{

renderer.dispose();

}

);

}