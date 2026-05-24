const canvas =
document.getElementById("webgl");

const container =
document.querySelector(".booking-right");

const scene = new THREE.Scene();

scene.fog =
new THREE.FogExp2(0x050505,0.018);

// CAMERA

const camera =
new THREE.PerspectiveCamera(
40,
container.clientWidth /
container.clientHeight,
0.1,
1000
);

camera.position.set(0,1.2,8);

// RENDERER

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

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.15;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

// BACKGROUND

scene.background =
new THREE.Color(0x020202);

// LIGHTS

const goldLight =
new THREE.PointLight(
0xffd700,
22,
40
);

goldLight.position.set(3,4,4);

goldLight.castShadow = true;

scene.add(goldLight);

const whiteLight =
new THREE.PointLight(
0xffffff,
10,
30
);

whiteLight.position.set(-4,2,5);

scene.add(whiteLight);

const blueLight =
new THREE.PointLight(
0x3b82f6,
8,
25
);

blueLight.position.set(0,-2,4);

scene.add(blueLight);

const ambient =
new THREE.AmbientLight(
0xffffff,
0.8
);

scene.add(ambient);

const spotLight =
new THREE.SpotLight(
0xfff4d6,
18
);

spotLight.position.set(0,10,6);

spotLight.angle = 0.28;

spotLight.penumbra = 1;

spotLight.decay = 1.5;

spotLight.distance = 60;

spotLight.castShadow = true;

scene.add(spotLight);

// FLOOR

const floorGeometry =
new THREE.CircleGeometry(5,64);

const floorMaterial =
new THREE.MeshStandardMaterial({

color:0x090909,

metalness:1,

roughness:0.15,

emissive:0x332200,

emissiveIntensity:0.2

});

const floor =
new THREE.Mesh(
floorGeometry,
floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

floor.position.y = -2.3;

floor.receiveShadow = true;

scene.add(floor);

// HALO

const haloGeometry =
new THREE.TorusGeometry(
2.8,
0.06,
16,
100
);

const haloMaterial =
new THREE.MeshBasicMaterial({

color:0xffd700,

transparent:true,

opacity:0.7

});

const halo =
new THREE.Mesh(
haloGeometry,
haloMaterial
);

halo.rotation.x =
Math.PI / 2;

halo.position.y = -0.5;

scene.add(halo);

// PARTICLES

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 1800;

const posArray =
new Float32Array(
particlesCount * 3
);

for(let i=0;i<
particlesCount*3;i++){

posArray[i] =
(Math.random()-0.5)*20;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
posArray,
3
)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.02,

color:0xffd700,

transparent:true,

opacity:0.5

});

const particlesMesh =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

// MODEL

const loader =
new THREE.GLTFLoader();

let guitar;

loader.load(

"/reservation/assets/models/guitar.glb",

(gltf)=>{

guitar = gltf.scene;

guitar.scale.set(
4.2,
4.2,
4.2
);

guitar.position.set(
0,
-2,
0
);

guitar.rotation.y = 0.5;

guitar.traverse((child)=>{

if(child.isMesh){

child.castShadow = true;

child.receiveShadow = true;

if(child.material){

child.material.metalness = 1;

child.material.roughness = 0.28;

}

}

});

scene.add(guitar);

},

undefined,

(error)=>{

console.log(
"Erreur modèle GLB :",
error
);

}

);

// CLOCK

const clock =
new THREE.Clock();

// ANIMATION

function animate(){

requestAnimationFrame(animate);

const elapsed =
clock.getElapsedTime();

// GUITAR

if(guitar){

guitar.rotation.y += 0.003;

guitar.position.y =
-2 +
Math.sin(elapsed*1.5)
*0.12;

guitar.rotation.z =
Math.sin(elapsed*0.8)
*0.03;

}

// LIGHTS

goldLight.intensity =
20 +
Math.sin(elapsed*1.2)
*2;

whiteLight.intensity =
10 +
Math.sin(elapsed*0.8);

blueLight.intensity =
7 +
Math.sin(elapsed*1.5);

// HALO

halo.rotation.z += 0.004;

halo.material.opacity =
0.45 +
Math.sin(elapsed*2)
*0.12;

// PARTICLES

particlesMesh.rotation.y +=
0.0005;

// CAMERA

camera.position.x =
Math.sin(elapsed*0.3)
*0.25;

camera.lookAt(0,0,0);

renderer.render(scene,camera);

}

animate();

// RESIZE

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