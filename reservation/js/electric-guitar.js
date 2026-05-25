/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR ENGINE
========================================================= */

const electricCanvas =
document.getElementById(
"webgl-electric"
);

const electricScene =
new THREE.Scene();

/* CAMERA */

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
0.2,
6
);

/* RENDERER */

const electricRenderer =
new THREE.WebGLRenderer({

canvas:electricCanvas,
alpha:true,
antialias:true

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

/* LIGHTS */

const electricAmbient =
new THREE.AmbientLight(
0xffffff,
2.5
);

electricScene.add(
electricAmbient
);

const electricGold =
new THREE.PointLight(
0xffcc66,
5,
20
);

electricGold.position.set(
3,
4,
5
);

electricScene.add(
electricGold
);

const electricBlue =
new THREE.PointLight(
0x3b82f6,
2,
20
);

electricBlue.position.set(
-3,
-2,
3
);

electricScene.add(
electricBlue
);

/* LOADER */

const electricLoader =
new THREE.GLTFLoader();

let electricGuitar = null;

electricLoader.load(

"/reservation/assets/models/electrique.glb",

function(gltf){

electricGuitar =
gltf.scene;

electricGuitar.traverse(
(child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 0.5;

child.material.roughness = 0.4;

}

}

}
);

/* SIZE */

electricGuitar.scale.set(
3.2,
3.2,
3.2
);

/* POSITION */

electricGuitar.position.set(
0,
-1,
0
);

/* ROTATION */

electricGuitar.rotation.set(
0.2,
-0.9,
0.1
);

electricScene.add(
electricGuitar
);

}

);

/* ANIMATION */

const electricClock =
new THREE.Clock();

function animateElectric(){

requestAnimationFrame(
animateElectric
);

const time =
electricClock.getElapsedTime();

if(electricGuitar){

electricGuitar.rotation.y +=
0.0025;

electricGuitar.position.y =
-1 +
Math.sin(time*1.8)*0.08;

}

electricRenderer.render(
electricScene,
electricCamera
);

}

animateElectric();

/* RESIZE */

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