/* BURGER */
const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

burger.onclick = () => {
  nav.classList.toggle("active");
};

/* SCROLL ANIMATION */
const sections = document.querySelectorAll(".about-section");

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