/* ==================================================
ZARABESSO STUDIO
LIGHT PREMIUM THREE.JS VERSION
VISIBLE GUITAR FIX
================================================== */

const canvas =
document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

/* ==================================================
CANVAS
================================================== */

canvas.style.position = "absolute";
canvas.style.inset = "0";
canvas.style.zIndex = "500";
canvas.style.pointerEvents = "none";

/* ==================================================
SCENE
================================================== */

const scene =
new THREE.Scene();

/* ==================================================
CAMERA
================================================== */

const camera =
new THREE.PerspectiveCamera(
45,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

/* IMPORTANT */

camera.position.set(
0,
0,
6
);

/* ==================================================
RENDERER
================================================== */

const renderer =
new THREE.WebGLRenderer({

canvas,
alpha:true,
antialias:true

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

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
================================================== */

/* MAIN LIGHT */

const mainLight =
new THREE.DirectionalLight(
0xffffff,
4
);

mainLight.position.set(
0,
2,
5
);

scene.add(mainLight);

/* GOLD LIGHT */

const goldLight =
new THREE.PointLight(
0xffd700,
15
);

goldLight.position.set(
2,
2,
3
);

scene.add(goldLight);

/* BLUE LIGHT */

const blueLight =
new THREE.PointLight(
0x3b82f6,
8
);

blueLight.position.set(
-3,
1,
2
);

scene.add(blueLight);

/* ==================================================
FLOOR
================================================== */

const floorGeometry =
new THREE.CircleGeometry(
5,
64
);

const floorMaterial =
new THREE.MeshStandardMaterial({

color:0x111111,

metalness:0.5,

roughness:0.4

});

const floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

floor.position.y = -2;

scene.add(floor);

/* ==================================================
GUITAR MODEL
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* IMPORTANT */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
NORMAL SIZE
================================================== */

/* CHANGE THIS VALUE TO CONTROL SIZE */

guitar.scale.set(
1.5,
1.5,
1.5
);

/* ==================================================
POSITION
================================================== */

guitar.position.set(
0,
-1.2,
0
);

/* ==================================================
ROTATION
================================================== */

guitar.rotation.y =
0.5;

/* ==================================================
MATERIALS
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

/* LIGHT PREMIUM LOOK */

child.material.metalness =
0.3;

child.material.roughness =
0.5;

child.material.needsUpdate =
true;

}

}

});

/* ==================================================
ADD TO SCENE
================================================== */

scene.add(guitar);

console.log(
"GUITAR LOADED SUCCESSFULLY"
);

},

(xhr)=>{

console.log(
"Loading:",
(xhr.loaded / xhr.total * 100).toFixed(0) + "%"
);

},

(error)=>{

console.error(
"GLB ERROR :",
error
);

}

);

/* ==================================================
MOUSE INTERACTION
================================================== */

let mouseX = 0;

window.addEventListener(
"mousemove",
(e)=>{

mouseX =
(e.clientX / window.innerWidth - 0.5);

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

/* ==================================================
GUITAR
================================================== */

if(guitar){

/* AUTO ROTATION */

guitar.rotation.y +=
0.003;

/* MOUSE EFFECT */

guitar.rotation.y +=
mouseX * 0.01;

/* FLOAT */

guitar.position.y =
-1.2 +
Math.sin(elapsed * 1.5)
* 0.08;

}

/* FLOOR */

floor.rotation.z +=
0.001;

/* CAMERA */

camera.lookAt(
0,
-0.5,
0
);

/* ==================================================
RENDER
================================================== */

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