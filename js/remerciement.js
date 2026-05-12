/* =========================
   BURGER MENU
========================= */

const burger =
document.getElementById("burger");

const nav =
document.getElementById("navLinks");

if(burger && nav){

  burger.addEventListener("click", () => {

    burger.classList.toggle("active");

    nav.classList.toggle("active");

  });

}

/* =========================
   CLOSE MENU ON CLICK
========================= */

document
.querySelectorAll("#navLinks a")
.forEach(link => {

  link.addEventListener("click", () => {

    burger.classList.remove("active");

    nav.classList.remove("active");

  });

});

/* =========================
   AUTO HIDE NAVBAR
========================= */

let lastScroll = 0;

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  const currentScroll =
  window.pageYOffset;

  if(currentScroll > lastScroll
  && currentScroll > 100){

    navbar.classList.add("hide");

  } else {

    navbar.classList.remove("hide");

  }

  lastScroll = currentScroll;

});

/* =========================
   GLASS PARALLAX
========================= */

const glassCard =
document.querySelector(".glass-card");

let ticking = false;

document.addEventListener("mousemove", (e) => {

  if(!glassCard) return;

  if(!ticking){

    window.requestAnimationFrame(() => {

      const x =
      (window.innerWidth / 2 - e.clientX) / 45;

      const y =
      (window.innerHeight / 2 - e.clientY) / 45;

      glassCard.style.transform =
      `
      rotateY(${x}deg)
      rotateX(${y}deg)
      `;

      ticking = false;

    });

    ticking = true;
  }

});

/* =========================
   RESET POSITION MOBILE
========================= */

window.addEventListener("resize", () => {

  if(window.innerWidth <= 768){

    if(glassCard){

      glassCard.style.transform =
      "rotateY(0deg) rotateX(0deg)";
    }

  }

});

/* =========================
   FOOTER REVEAL
========================= */

const footer =
document.querySelector(".footer");

function revealFooter(){

  if(!footer) return;

  const position =
  footer.getBoundingClientRect().top;

  if(position < window.innerHeight - 50){

    footer.style.opacity = "1";

    footer.style.transform =
    "translateY(0)";
  }

}

window.addEventListener("scroll", revealFooter);

revealFooter();
/* =========================
   DISABLE PARALLAX MOBILE
========================= */

if(window.innerWidth <= 768){

  document.removeEventListener("mousemove", null);

  if(glassCard){

    glassCard.style.transform =
    "rotateY(0deg) rotateX(0deg)";
  }

}