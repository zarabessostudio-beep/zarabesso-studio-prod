/* ==================================================
ZARABESSO STUDIO
FINAL PREMIUM HERO GUITAR
SAFE VERSION — NO DESIGN BREAK
================================================== */

/* ==================================================
IMPORTS
================================================== */

const canvas =
document.getElementById("webgl");

/* ==================================================
SAFE CANVAS
NO CONFLICT WITH CURRENT DESIGN
================================================== */

canvas.style.position = "absolute";
canvas.style.top = "-180px";
canvas.style.right = "-260px";

canvas.style.width = "1000px";
canvas.style.height = "1000px";

canvas.style.zIndex = "500";

canvas.style.pointerEvents = "auto";
canvas.style.touchAction = "none";

canvas.style.background = "transparent";

canvas.style.transform = "translateZ(0)";
canvas.style.willChange = "transform";

canvas.style.filter =
`
drop-shadow(0 0 80px rgba(255,140,0,.15))
drop-shadow(0 0 140px rgba(170,0,255,.16))
`;

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
28,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

/* ==================================================
CINEMATIC CAMERA
================================================== */

camera.position.set(
0,
1,
14
);

/* ==================================================
RENDERER
================================================== */

const renderer =
new THREE.WebGLRenderer({

canvas,
alpha:true,
antialias:true,
powerPreference:"high-performance"

});

/* ==================================================
RENDERER SETTINGS
================================================== */

renderer.setPixelRatio(
Math.min(
window.devicePixelRatio,
2
)
);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
1.15;

renderer.setClearColor(
0x000000,
0
);

/* ==================================================
LIGHTS
SAFE PREMIUM LIGHTING
================================================== */

/* MAIN LIGHT */

const ambient =
new THREE.AmbientLight(
0xffffff,
2.8
);

scene.add(ambient);

/* GOLD CINEMATIC */

const goldLight =
new THREE.PointLight(
0xffcc66,
18,
60
);

goldLight.position.set(
8,
10,
12
);

scene.add(goldLight);

/* PURPLE EDGE */

const purpleLight =
new THREE.PointLight(
0x8b5cf6,
16,
60
);

purpleLight.position.set(
-10,
4,
10
);

scene.add(purpleLight);

/* FRONT LIGHT */

const frontLight =
new THREE.DirectionalLight(
0xffffff,
3
);

frontLight.position.set(
0,
4,
14
);

scene.add(frontLight);

/* BLUE REFLECTION */

const blueLight =
new THREE.PointLight(
0x00ccff,
10,
50
);

blueLight.position.set(
-5,
-4,
6
);

scene.add(blueLight);

/* ==================================================
RESPONSIVE SCALE
================================================== */

function getScale(){

if(window.innerWidth < 600){

return 5.2;

}

if(window.innerWidth < 1000){

return 7;

}

return 9.5;

}

/* ==================================================
RESPONSIVE POSITION
================================================== */

function getPosition(){

if(window.innerWidth < 600){

return {
x:1.4,
y:5
};

}

if(window.innerWidth < 1000){

return {
x:2.2,
y:6
};

}

return {
x:3.5,
y:7.2
};

}

/* ==================================================
LOADER
================================================== */

const loader =
new THREE.GLTFLoader();

let guitar;

/* ==================================================
INTERACTION
================================================== */

let mouseX = 0;
let mouseY = 0;

let targetRotationY = 0;
let targetRotationX = 0;

/* ==================================================
MOUSE
================================================== */

window.addEventListener(
"mousemove",
(e)=>{

mouseX =
(
e.clientX /
window.innerWidth
- 0.5
);

mouseY =
(
e.clientY /
window.innerHeight
- 0.5
);

targetRotationY =
mouseX * 0.18;

targetRotationX =
mouseY * 0.08;

}
);

/* ==================================================
TOUCH
================================================== */

window.addEventListener(
"touchmove",
(e)=>{

const touch =
e.touches[0];

mouseX =
(
touch.clientX /
window.innerWidth
- 0.5
);

mouseY =
(
touch.clientY /
window.innerHeight
- 0.5
);

targetRotationY =
mouseX * 0.18;

targetRotationX =
mouseY * 0.08;

},
{ passive:true }
);

/* ==================================================
LOAD GLB
================================================== */

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

/* ==================================================
MEGA SCALE
================================================== */

const scale =
getScale();

guitar.scale.set(
scale,
scale,
scale
);

/* ==================================================
POSITION
================================================== */

const pos =
getPosition();

guitar.position.set(
pos.x,
pos.y,
0
);

/* ==================================================
ROTATION
FACE AVANT VISIBLE
================================================== */

guitar.rotation.y =
-2.35;

/* SLIGHT UP */

guitar.rotation.x =
-0.05;

/* STUDIO TILT */

guitar.rotation.z =
0.08;

/* ==================================================
KEEP ORIGINAL GLB MATERIALS
================================================== */

guitar.traverse((child)=>{

if(child.isMesh){

child.visible = true;

if(child.material){

/* KEEP ORIGINAL TEXTURES */

child.material.side =
THREE.FrontSide;

/* SMALL REFLECTION BOOST */

if(
child.material.envMapIntensity
!== undefined
){

child.material.envMapIntensity =
1.2;

}

child.material.needsUpdate =
true;

}

child.castShadow = false;
child.receiveShadow = false;

}

});

/* ==================================================
ADD TO SCENE
================================================== */

scene.add(guitar);

console.log(
"FINAL PREMIUM GUITAR READY"
);

},

(xhr)=>{

if(xhr.total){

console.log(
"Loading:",
(
xhr.loaded /
xhr.total *
100
).toFixed(0) + "%"
);

}

},

(error)=>{

console.error(
"GLB ERROR:",
error
);

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

const pos =
getPosition();

/* FLOAT */

guitar.position.y =
pos.y +
Math.sin(
elapsed * 1.2
) * 0.18;

/* HERO ROTATION */

guitar.rotation.y +=
(
(-2.35 + targetRotationY)
-
guitar.rotation.y
) * 0.03;

/* X ROTATION */

guitar.rotation.x +=
(
(-0.05 + targetRotationX)
-
guitar.rotation.x
) * 0.03;

/* CINEMATIC TILT */

guitar.rotation.z =
0.08 +
Math.sin(
elapsed * 1
) * 0.02;

/* VERY SLOW AUTO MOTION */

guitar.rotation.y +=
0.0008;

}

/* ==================================================
CAMERA TARGET
================================================== */

camera.lookAt(
0,
2,
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
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

if(guitar){

const scale =
getScale();

guitar.scale.set(
scale,
scale,
scale
);

const pos =
getPosition();

guitar.position.x =
pos.x;

guitar.position.y =
pos.y;

}

});