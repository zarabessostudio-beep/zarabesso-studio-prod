/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR ENGINE
FINAL STABLE VERSION
========================================================= */

const electricCanvas =
document.getElementById("webgl-electric");

/* SAFETY */

if(electricCanvas){

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
30,
electricCanvas.clientWidth /
electricCanvas.clientHeight,
0.1,
1000
);

electricCamera.position.set(
0,
0,
6
);

/* =========================================================
RENDERER
========================================================= */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,
alpha:true,
antialias:true,
powerPreference:"high-performance"

});

electricRenderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

electricRenderer.outputEncoding =
THREE.sRGBEncoding;

/* =========================================================
LIGHTS
========================================================= */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.8
);

electricScene.add(ambient);

const gold =
new THREE.PointLight(
0xffcc66,
5,
25
);

gold.position.set(
4,
4,
5
);

electricScene.add(gold);

const blue =
new THREE.PointLight(
0x3b82f6,
2,
20
);

blue.position.set(
-4,
-2,
4
);

electricScene.add(blue);

/* =========================================================
LOADER
========================================================= */

const loader =
new THREE.GLTFLoader();

let electricGuitar = null;

/* =========================================================
LOAD MODEL
========================================================= */

loader.load(

"/reservation/assets/models/electrique.glb",

(gltf)=>{

electricGuitar =
gltf.scene;

/* MATERIALS */

electricGuitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;
child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.45;
child.material.roughness = 0.38;
child.material.envMapIntensity = 1.5;

}

}

});

/* =========================================================
SIZE
========================================================= */

electricGuitar.scale.set(
1.8,
1.8,
1.8
);

/* =========================================================
POSITION
========================================================= */

electricGuitar.position.set(
0.4,
-0.45,
0
);

/* =========================================================
ROTATION
========================================================= */

electricGuitar.rotation.set(
0.15,
-0.8,
0.05
);

electricScene.add(
electricGuitar
);

},

undefined,

(error)=>{

console.error(
"Erreur GLB électrique :",
error
);

}

);

/* =========================================================
MOUSE
========================================================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
"mousemove",
(event)=>{

mouseX =
(event.clientX /
window.innerWidth - 0.5);

mouseY =
(event.clientY /
window.innerHeight - 0.5);

}
);

/* =========================================================
ANIMATION
========================================================= */

const clock =
new THREE.Clock();

function animate(){

requestAnimationFrame(
animate
);

const time =
clock.getElapsedTime();

if(electricGuitar){

/* FLOAT */

electricGuitar.position.y =
-0.45 +
Math.sin(time*1.8)*0.05;

/* AUTO ROTATION */

electricGuitar.rotation.y +=
0.0015;

/* PARALLAX */

electricGuitar.rotation.x =
mouseY * 0.08;

electricGuitar.rotation.z =
mouseX * 0.05;

}

/* CAMERA */

electricCamera.position.x +=
(mouseX * 0.25
- electricCamera.position.x)
* 0.02;

electricRenderer.render(
electricScene,
electricCamera
);

}

animate();

/* =========================================================
RESIZE
========================================================= */

window.addEventListener(
"resize",
()=>{

electricCamera.aspect =
electricCanvas.clientWidth /
electricCanvas.clientHeight;

electricCamera.updateProjectionMatrix();

electricRenderer.setSize(
electricCanvas.clientWidth,
electricCanvas.clientHeight
);

}
);

}