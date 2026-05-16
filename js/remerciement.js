/* =========================
   ELEMENTS
========================= */

const burger =
document.getElementById("burger");

const nav =
document.getElementById("navLinks");

const navbar =
document.querySelector(".navbar");

const glassCard =
document.querySelector(".glass-card");

/* =========================
   BURGER MENU
========================= */

if(burger && nav){

  burger.addEventListener("click", () => {

    burger.classList.toggle("active");

    nav.classList.toggle("active");

    const expanded =
    burger.classList.contains("active");

    burger.setAttribute(
      "aria-expanded",
      expanded
    );

    document.body.style.overflow =
    expanded ? "hidden" : "";

  });

}

/* =========================
   CLOSE ON LINK
========================= */

document
.querySelectorAll("#navLinks a")
.forEach(link => {

  link.addEventListener("click", () => {

    burger.classList.remove("active");

    nav.classList.remove("active");

    document.body.style.overflow = "";

  });

});

/* =========================
   OUTSIDE CLICK
========================= */

document.addEventListener("click", (e) => {

  if(
    nav.classList.contains("active")
    &&
    !nav.contains(e.target)
    &&
    !burger.contains(e.target)
  ){

    nav.classList.remove("active");

    burger.classList.remove("active");

    document.body.style.overflow = "";

  }

});

/* =========================
   AUTO HIDE NAVBAR
========================= */

let lastScroll = 0;

window.addEventListener("scroll", () => {

  const currentScroll =
  window.pageYOffset;

  if(
    currentScroll > lastScroll
    &&
    currentScroll > 100
  ){

    navbar.classList.add("hide");

  } else {

    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;

});

/* =========================
   GLASS PARALLAX
========================= */

if(window.innerWidth > 768){

  document.addEventListener("mousemove", (e) => {

    if(!glassCard) return;

    const x =
    (window.innerWidth / 2 - e.clientX) / 45;

    const y =
    (window.innerHeight / 2 - e.clientY) / 45;

    glassCard.style.transform =
    `
    rotateY(${x}deg)
    rotateX(${y}deg)
    `;

  });

}

/* =========================
   RESET MOBILE
========================= */

window.addEventListener("resize", () => {

  if(
    window.innerWidth <= 768
    &&
    glassCard
  ){

    glassCard.style.transform =
    "rotateY(0deg) rotateX(0deg)";
  }

});