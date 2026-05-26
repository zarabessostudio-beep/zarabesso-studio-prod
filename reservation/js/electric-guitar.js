/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR
FINAL STABLE VERSION
NO WRAPPER
NO ERRORS
========================================================= */

/* =========================================================
CANVAS
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

if(!electricCanvas){

console.error(
"Canvas introuvable"
);

}

/* =========================================================
SCENE
========================================================= */

const electricScene =
new THREE.Scene();

/* =========================================================
CAMERA
========================================================= */

const electricCamera =
new THREE.PerspectiveCamera(

28,

electricCanvas.clientWidth /
electricCanvas.clientHeight,

0.1,
1000

);

electricCamera.position.set(
0,
0,
9
);

/* =========================================================
RENDERER
========================================================= */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,

alpha:true,

antialias:true,

powerPreference:
"high-performance"

});

electricRenderer.setSize(

electricCanvas.clientWidth,
electricCanvas.clientHeight

);

electricRenderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
1.5
)

);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

electricRenderer.setClearColor(
0x000000,
0
);

/* =========================================================
LIGHTS
========================================================= */

const electricAmbient =
new THREE.AmbientLight(
0xffffff,
2.5
);

electricScene.add(
electricAmbient
);

const electricFront =
new THREE.DirectionalLight(
0xffffff,
1.2
);

electricFront.position.set(
0,
2,
5
);

electricScene.add(
electricFront
);

/* =========================================================
LOADER
========================================================= */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
RESPONSIVE
========================================================= */

function electricConfig(){

if(window.innerWidth <= 480){

return{

scale:1.2,
y:-1.1,
speed:0.008

};

}

if(window.innerWidth <= 768){

return{

scale:1.6,
y:-1,
speed:0.007

};

}

if(window.innerWidth <= 1200){

return{

scale:2,
y:-0.9,
speed:0.006

};

}

return{

scale:2.4,
y:-0.8,
speed:0.005

};

}

let electricSettings =
electricConfig();

/* =========================================================
LOAD MODEL
========================================================= */

electricLoader.load(

"/reservation/assets/models/guitar.glb",

function(gltf){

electricGuitar =
gltf.scene;

/* =========================================================
OPTIMIZATION
========================================================= */

electricGuitar.traverse(

function(child){

if(child.isMesh){

child.castShadow =
false;

child.receiveShadow =
false;

child.frustumCulled =
false;

}

}

);

/* =========================================================
SCALE
========================================================= */

electricGuitar.scale.set(

electricSettings.scale,
electricSettings.scale,
electricSettings.scale

);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
0,
electricSettings.y,
0
);

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.set(
0,
0,
0
);

/* =========================================================
ADD
========================================================= */

electricScene.add(
electricGuitar
);

console.log(
"Guitar loaded"
);

},

undefined,

function(error){

console.error(
"GLB ERROR",
error
);

}

);

/* =========================================================
CLOCK
========================================================= */

const electricClock =
new THREE.Clock();

/* =========================================================
ANIMATION
========================================================= */

function electricAnimate(){

requestAnimationFrame(
electricAnimate
);

const elapsed =
electricClock.getElapsedTime();

if(electricGuitar){

electricGuitar.rotation.y +=
electricSettings.speed;

electricGuitar.position.y =

electricSettings.y +

Math.sin(elapsed * 1.5)
* 0.03;

}

electricRenderer.render(
electricScene,
electricCamera
);

}

electricAnimate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(

"resize",

function(){

electricSettings =
electricConfig();

const width =
electricCanvas.clientWidth;

const height =
electricCanvas.clientHeight;

electricCamera.aspect =
width / height;

electricCamera.updateProjectionMatrix();

electricRenderer.setSize(
width,
height
);

if(electricGuitar){

electricGuitar.scale.set(

electricSettings.scale,
electricSettings.scale,
electricSettings.scale

);

electricGuitar.position.set(
0,
electricSettings.y,
0
);

}

}

);