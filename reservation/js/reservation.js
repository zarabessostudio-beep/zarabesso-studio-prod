/* =========================================================
ZARABESSO STUDIO
PREMIUM RESERVATION SYSTEM
FINAL PRODUCTION VERSION
SECURE + WHATSAPP + MOBILE SAFE
========================================================= */

/* =========================================================
ELEMENTS
========================================================= */

const form =
document.getElementById(
"reservationForm"
);

const burger =
document.getElementById(
"burger"
);

const navLinks =
document.getElementById(
"navLinks"
);

const loaderScreen =
document.getElementById(
"loaderScreen"
);

/* =========================================================
SAFE BURGER MENU
========================================================= */

if(
burger &&
navLinks
){

burger.addEventListener(

"click",

()=>{

navLinks.classList.toggle(
"active"
);

}

);

}

/* =========================================================
AUTO CLOSE MENU MOBILE
========================================================= */

document.querySelectorAll(
"#navLinks a"
).forEach((link)=>{

link.addEventListener(

"click",

()=>{

if(navLinks){

navLinks.classList.remove(
"active"
);

}

}

);

});

/* =========================================================
PREMIUM LOADER
========================================================= */

window.addEventListener(

"load",

()=>{

if(loaderScreen){

setTimeout(()=>{

loaderScreen.style.opacity =
"0";

loaderScreen.style.pointerEvents =
"none";

setTimeout(()=>{

loaderScreen.style.display =
"none";

},1200);

},1800);

}

}

/* =========================================================
SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach((anchor)=>{

anchor.addEventListener(

"click",

function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({

behavior:"smooth",
block:"start"

});

}

}

);

});

/* =========================================================
SAFE FORM
========================================================= */

if(form){

/* =========================================================
SUBMIT
========================================================= */

form.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

/* =========================================================
BUTTON LOCK
========================================================= */

const submitButton =
form.querySelector(
'button[type="submit"]'
);

if(submitButton){

submitButton.disabled =
true;

submitButton.innerHTML =
"Envoi en cours...";

}

/* =========================================================
DATA
========================================================= */

const data = {

name:
document.getElementById("name")
?.value
?.trim(),

phone:
document.getElementById("phone")
?.value
?.trim(),

service:
document.getElementById("service")
?.value
?.trim(),

date:
document.getElementById("date")
?.value
?.trim(),

time:
typeof selectedTime !== "undefined"
? selectedTime
: "",

message:
document.getElementById("message")
?.value
?.trim()

};

/* =========================================================
VALIDATION
========================================================= */

if(

!data.name ||
!data.phone ||
!data.date ||
!data.time

){

alert(
"Veuillez remplir tous les champs obligatoires."
);

/* =========================================================
UNLOCK BUTTON
========================================================= */

if(submitButton){

submitButton.disabled =
false;

submitButton.innerHTML =
"Réserver";

}

return;

}

/* =========================================================
PHONE VALIDATION
========================================================= */

const phoneRegex =
/^[0-9+\s()-]{6,20}$/;

if(
!phoneRegex.test(data.phone)
){

alert(
"Numéro téléphone invalide."
);

if(submitButton){

submitButton.disabled =
false;

submitButton.innerHTML =
"Réserver";

}

return;

}

/* =========================================================
API REQUEST
========================================================= */

try{

const response =
await fetch(

"/api/reservation",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

}

);

/* =========================================================
JSON
========================================================= */

const result =
await response.json();

/* =========================================================
SUCCESS
========================================================= */

if(result.success){

/* =========================================================
SUCCESS EFFECT
========================================================= */

alert(
"Réservation envoyée avec succès 🎸"
);

/* =========================================================
WHATSAPP OPEN
========================================================= */

if(result.whatsappURL){

window.open(

result.whatsappURL,

"_blank"

);

}

/* =========================================================
RESET FORM
========================================================= */

form.reset();

/* =========================================================
RESET TIME
========================================================= */

if(
typeof selectedTime !==
"undefined"
){

selectedTime = "";

}

/* =========================================================
OPTIONAL ACTIVE TIME RESET
========================================================= */

document
.querySelectorAll(
".time-slot.active"
)
.forEach((slot)=>{

slot.classList.remove(
"active"
);

});

}else{

alert(

result.error ||

"Erreur réservation"

);

}

/* =========================================================
ERROR
========================================================= */

}catch(err){

console.error(
"Reservation Error:",
err
);

alert(
"Erreur serveur. Réessayez plus tard."
);

}

/* =========================================================
UNLOCK BUTTON
========================================================= */

if(submitButton){

submitButton.disabled =
false;

submitButton.innerHTML =
"Réserver";

}

}

);

}

/* =========================================================
ANTI LAG MOBILE
========================================================= */

window.addEventListener(

"pageshow",

()=>{

document.body.style.opacity =
"1";

}

);

/* =========================================================
IOS TOUCH OPTIMIZATION
========================================================= */

document.addEventListener(

"touchstart",

()=>{},

{ passive:true }

);

/* =========================================================
SAFE ERROR HANDLER
========================================================= */

window.addEventListener(

"error",

(event)=>{

console.error(
"Global Error:",
event.error
);

}

);

/* =========================================================
UNHANDLED PROMISE
========================================================= */

window.addEventListener(

"unhandledrejection",

(event)=>{

console.error(
"Promise Error:",
event.reason
);

}

);

/* =========================================================
END
========================================================= */