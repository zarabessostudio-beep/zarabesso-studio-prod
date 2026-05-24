// ===============================
// PREMIUM OLED PARTICLES SYSTEM
// particles.js
// ZARABESSO STUDIO
// ===============================

const particlesContainer =
document.getElementById("particles");

// PERFORMANCE SAFE

const PARTICLES_COUNT =
window.innerWidth < 768 ? 45 : 120;

// COLORS OLED

const colors = [

"#8f00ff", // violet
"#ff004c", // rouge
"#00ffb3", // vert neon
"#ffffff"

];

// ===============================
// CREATE PARTICLES
// ===============================

for(let i = 0; i < PARTICLES_COUNT; i++){

const particle =
document.createElement("div");

particle.classList.add("particle");

// RANDOM SIZE

const size =
Math.random() * 5 + 2;

// STYLE

particle.style.width = `${size}px`;

particle.style.height = `${size}px`;

particle.style.left =
Math.random() * 100 + "vw";

particle.style.top =
Math.random() * 100 + "vh";

particle.style.opacity =
Math.random() * 0.8 + 0.2;

particle.style.background =
colors[Math.floor(
Math.random() * colors.length
)];

particle.style.animationDuration =
`${8 + Math.random() * 12}s`;

particle.style.animationDelay =
`${Math.random() * 5}s`;

// GLOW EFFECT

particle.style.boxShadow = `
0 0 10px currentColor,
0 0 20px currentColor,
0 0 40px currentColor
`;

particlesContainer.appendChild(particle);

}

// ===============================
// MOUSE LIGHT EFFECT
// ===============================

document.addEventListener("mousemove",(e)=>{

const glow =
document.createElement("div");

glow.classList.add("mouse-glow");

glow.style.left = e.clientX + "px";

glow.style.top = e.clientY + "px";

particlesContainer.appendChild(glow);

setTimeout(()=>{

glow.remove();

},500);

});

// ===============================
// AMBIENT FLASH LIGHT
// ===============================

setInterval(()=>{

const randomParticle =
particlesContainer.children[
Math.floor(
Math.random() *
particlesContainer.children.length
)
];

if(randomParticle){

randomParticle.animate([

{
transform:"scale(1)",
opacity:.5
},

{
transform:"scale(2.5)",
opacity:1
},

{
transform:"scale(1)",
opacity:.5
}

],{

duration:1500,
iterations:1

});

}

},1200);