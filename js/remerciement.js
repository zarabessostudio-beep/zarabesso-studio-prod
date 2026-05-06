// Animation légère style Apple (smooth)
document.addEventListener("mousemove", (e) => {
    const box = document.querySelector(".glass-box");

    let x = (window.innerWidth / 2 - e.pageX) / 40;
    let y = (window.innerHeight / 2 - e.pageY) / 40;

    box.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
// BURGER MENU
const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// EFFET PARALLAX GLASS
document.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".glass-card");

  let x = (window.innerWidth / 2 - e.pageX) / 50;
  let y = (window.innerHeight / 2 - e.pageY) / 50;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
// apparition douce du footer
const footer = document.querySelector(".footer");

window.addEventListener("scroll", () => {
  const position = footer.getBoundingClientRect().top;

  if(position < window.innerHeight){
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  }
});