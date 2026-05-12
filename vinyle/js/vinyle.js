/* =======================================================
   VYNILE UI ENGINE
   Premium Interface Controller
======================================================= */

/* ================= DOM READY ================= */

document.addEventListener("DOMContentLoaded", () => {

  initFooterGlow();

  initNavbarEffects();

  initBurgerMenu();

  initSmoothReveal();

});

/* =======================================================
   FOOTER GLOW EFFECT
======================================================= */

function initFooterGlow() {

  const footer =
  document.querySelector(".premium-footer");

  if (!footer) return;

  window.addEventListener("scroll", () => {

    const rect =
    footer.getBoundingClientRect();

    const visible =
    rect.top < window.innerHeight &&
    rect.bottom > 0;

    footer.classList.toggle(
      "active-glow",
      visible
    );

  });

}

/* =======================================================
   NAVBAR EFFECTS
======================================================= */

function initNavbarEffects() {

  const navbar =
  document.querySelector(".navbar");

  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {

    const currentScroll =
    window.pageYOffset;

    /* HIDE NAVBAR */

    if (
      currentScroll > lastScroll &&
      currentScroll > 80
    ) {

      navbar.classList.add("hide");

    } else {

      navbar.classList.remove("hide");

      navbar.classList.add("show-glow");

    }

    /* REMOVE GLOW TOP */

    if (currentScroll < 10) {

      navbar.classList.remove("show-glow");

    }

    lastScroll = currentScroll;

  });

}

/* =======================================================
   BURGER MENU
======================================================= */

function initBurgerMenu() {

  const burger =
  document.getElementById("burger");

  const navLinks =
  document.querySelector(".nav-links");

  if (!burger || !navLinks) return;

  burger.addEventListener("click", () => {

    burger.classList.toggle("active");

    navLinks.classList.toggle("active");

  });

  document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      burger.classList.remove("active");

      navLinks.classList.remove("active");

    });

  });

}

/* =======================================================
   PREMIUM REVEAL EFFECT
======================================================= */

function initSmoothReveal() {

  const reveals =
  document.querySelectorAll(
    ".album-card, .track-card, .spotify-track"
  );

  const observer =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        entry.target.classList.add("reveal-visible");

      }

    });

  },{

    threshold:0.15

  });

  reveals.forEach(item=>{

    observer.observe(item);

  });

}