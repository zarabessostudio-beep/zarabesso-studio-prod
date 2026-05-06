/* 🎬 SCROLL ANIMATION */
const sections = document.querySelectorAll(".service-block");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

sections.forEach(sec=>{
  sec.style.opacity = 0;
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "1s";
  observer.observe(sec);
});

/* ✨ TITLE 3D MOUSE EFFECT */
const title = document.querySelector(".title-3d");

document.addEventListener("mousemove", e=>{
  let x = (e.clientX / window.innerWidth - 0.5) * 20;
  let y = (e.clientY / window.innerHeight - 0.5) * 20;

  title.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg)`;
});
/* ================= BURGER MENU ================= */

const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});