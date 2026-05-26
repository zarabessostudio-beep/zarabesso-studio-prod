/* =========================================================
ZARABESSO STUDIO
STATUS SYSTEM
========================================================= */

const studioToggle =
document.getElementById(
"studioToggle"
);

const studioStatus =
document.getElementById(
"studioStatus"
);

const statusTitle =
document.getElementById(
"statusTitle"
);

const statusText =
document.getElementById(
"statusText"
);

/* =========================================================
ADMIN PASSWORD
========================================================= */

const ADMIN_PASSWORD = "2103";

/* =========================================================
LOAD SAVED STATE
========================================================= */

const savedStatus =
localStorage.getItem(
"studioStatus"
);

/* =========================================================
DEFAULT
========================================================= */

if(savedStatus === "closed"){

setStudioClosed();

studioToggle.checked = false;

}else{

setStudioOpen();

studioToggle.checked = true;

}

/* =========================================================
SWITCH EVENT WITH PASSWORD
========================================================= */

studioToggle.addEventListener(

"change",

()=>{

const password = prompt(
"Code administrateur requis"
);

/* =========================
WRONG PASSWORD
========================= */

if(password !== ADMIN_PASSWORD){

alert(
"Code incorrect"
);

/* Retour état précédent */

studioToggle.checked =
!studioToggle.checked;

return;

}

/* =========================
CORRECT PASSWORD
========================= */

if(studioToggle.checked){

setStudioOpen();

localStorage.setItem(
"studioStatus",
"open"
);

}else{

setStudioClosed();

localStorage.setItem(
"studioStatus",
"closed"
);

}

}

);

/* =========================================================
OPEN
========================================================= */

function setStudioOpen(){

studioStatus.classList.remove(
"unavailable"
);

studioStatus.classList.add(
"available"
);

statusTitle.innerHTML =
"Studio Disponible";

statusText.innerHTML =
"Réservations ouvertes aujourd’hui";

}

/* =========================================================
CLOSED
========================================================= */

function setStudioClosed(){

studioStatus.classList.remove(
"available"
);

studioStatus.classList.add(
"unavailable"
);

statusTitle.innerHTML =
"Studio Fermé";

statusText.innerHTML =
"Jour férié • Maintenance • Indisponible";

}