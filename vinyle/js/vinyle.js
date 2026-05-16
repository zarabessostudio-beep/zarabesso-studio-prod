/* =======================================================
   VYNILE UI ENGINE
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initFooterGlow();
  initNavbarEffects();
  initBurgerMenu();
  initSmoothReveal();

});

/* =======================================================
   FOOTER GLOW
======================================================= */

function initFooterGlow(){

  const footer =
  document.querySelector(".premium-footer");

  if(!footer) return;

  const observer =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        footer.classList.add("active-glow");

      }else{

        footer.classList.remove("active-glow");

      }

    });

  },{
    threshold:0.15
  });

  observer.observe(footer);

}

/* =======================================================
   NAVBAR EFFECTS
======================================================= */

function initNavbarEffects(){

  const navbar =
  document.querySelector(".navbar");

  if(!navbar) return;

  let lastScroll = 0;

  window.addEventListener("scroll", ()=>{

    const current =
    window.scrollY;

    if(current > lastScroll && current > 100){

      navbar.classList.add("hide");

    }else{

      navbar.classList.remove("hide");

    }

    if(current > 20){

      navbar.classList.add("show-glow");

    }else{

      navbar.classList.remove("show-glow");

    }

    lastScroll = current;

  }, { passive:true });

}

/* =======================================================
   BURGER MENU
======================================================= */

function initBurgerMenu(){

  const burger =
  document.getElementById("burger");

  const nav =
  document.querySelector(".nav-links");

  if(!burger || !nav) return;

  burger.addEventListener("click", ()=>{

    burger.classList.toggle("active");

    nav.classList.toggle("active");

    document.body.classList.toggle("menu-open");

  });

  document
  .querySelectorAll(".nav-links a")
  .forEach(link=>{

    link.addEventListener("click", ()=>{

      burger.classList.remove("active");

      nav.classList.remove("active");

      document.body.classList.remove("menu-open");

    });

  });

}

/* =======================================================
   SMOOTH REVEAL
======================================================= */

function initSmoothReveal(){

  const items =
  document.querySelectorAll(
    ".album-card, .track-card, .spotify-track"
  );

  if(!items.length) return;

  const observer =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(entry.isIntersecting){

        entry.target.classList.add(
          "reveal-visible"
        );

      }

    });

  },{
    threshold:0.1
  });

  items.forEach(item=>{

    observer.observe(item);

  });

}