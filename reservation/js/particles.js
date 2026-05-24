const particles = document.getElementById("particles");

for(let i=0;i<50;i++){

const p=document.createElement("div");

p.style.position="fixed";
p.style.width="4px";
p.style.height="4px";
p.style.background="white";
p.style.borderRadius="50%";
p.style.left=Math.random()*100+"vw";
p.style.top=Math.random()*100+"vh";
p.style.opacity=Math.random();
p.style.animation=`float ${5+Math.random()*10}s linear infinite`;

particles.appendChild(p);
}