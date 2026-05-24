const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer=new THREE.WebGLRenderer({
canvas:document.getElementById("webgl"),
alpha:true,
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z=5;

const light=new THREE.PointLight(0xffffff,2);
light.position.set(5,5,5);
scene.add(light);

const ambient=new THREE.AmbientLight(0xffffff,.5);
scene.add(ambient);

const loader=new THREE.GLTFLoader();

let guitar;

loader.load(
"/reservation/assets/models/guitar.glb",
(gltf)=>{

guitar=gltf.scene;

guitar.scale.set(2,2,2);
scene.add(guitar);

}
);

function animate(){

requestAnimationFrame(animate);

if(guitar){

guitar.rotation.y+=0.005;
guitar.rotation.x=Math.sin(Date.now()*0.001)*0.1;

}

renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

});