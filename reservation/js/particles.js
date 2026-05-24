// ======================================
// ZARABESSO STUDIO
// LIGHT PREMIUM PARTICLES
// SAFE VERSION FOR THREE.JS
// ======================================

const particlesContainer =
document.getElementById("particles");

/* ======================================
SAFE RESET
====================================== */

particlesContainer.innerHTML = "";

/* ======================================
PERFORMANCE SAFE
====================================== */

const isMobile =
window.innerWidth < 768;

const PARTICLES_COUNT =
isMobile ? 22 : 45;

/* ======================================
COLORS
SOFT PREMIUM COLORS
====================================== */

const colors = [

"rgba(255,215,0,.45)",
"rgba(255,255,255,.35)",
"rgba(120,120,120,.25)"

];

/* ======================================
CREATE PARTICLES
====================================== */

for(let i = 0; i < PARTICLES_COUNT; i++){

const particle =
document.createElement("div");

particle.classList.add("particle");

/* RANDOM SIZE */

const size =
Math.random() * 4 + 2;

/* STYLE */

particle.style.width =
`${size}px`;

particle.style.height =
`${size}px`;

particle.style.left =
Math.random() * 100 + "vw";

particle.style.top =
Math.random() * 100 + "vh";

particle.style.background =
colors[
Math.floor(
Math.random() * colors.length
)
];

/* LIGHT OPACITY */

particle.style.opacity =
Math.random() * 0.35 + 0.08;

/* SAFE ANIMATION */

particle.style.animationDuration =
`${18 + Math.random() * 20}s`;

particle.style.animationDelay =
`${Math.random() * 8}s`;

/* VERY LIGHT GLOW */

particle.style.boxShadow =
`
0 0 8px rgba(255,215,0,.15)
`;

particlesContainer.appendChild(
particle
);

}

/* ======================================
SOFT AMBIENT MOVEMENT
====================================== */

function animateParticles(){

const particles =
document.querySelectorAll(".particle");

particles.forEach((particle,index)=>{

const speed =
0.08 + index * 0.0002;

const currentTop =
parseFloat(
particle.dataset.y || particle.style.top
);

let next =
currentTop - speed;

if(next < -10){

next = 110;

}

particle.dataset.y = next;

particle.style.transform =
`translateY(${next}px)`;

});

requestAnimationFrame(
animateParticles
);

}

animateParticles();

/* ======================================
RESIZE SAFE
====================================== */

window.addEventListener(
"resize",
()=>{

if(window.innerWidth < 768){

document
.querySelectorAll(".particle")
.forEach((particle,index)=>{

if(index > 22){

particle.remove();

}

});

}

}
);