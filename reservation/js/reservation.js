// ===============================
// RESERVATION SYSTEM
// ZARABESSO STUDIO
// ===============================

const form =
document.getElementById("reservationForm");

const burger =
document.getElementById("burger");

const navLinks =
document.getElementById("navLinks");

// ===============================
// BURGER
// ===============================

burger.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

// ===============================
// LOADER
// ===============================

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader =
document.getElementById("loaderScreen");

loader.style.opacity = "0";

setTimeout(()=>{

loader.style.display = "none";

},1200);

},1800);

});
/* ===============================
FORM
=============================== */

form.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

/* ===============================
BUTTON
=============================== */

const submitButton =
document.querySelector(
".reserve-btn"
);

/* ===============================
ANTI DOUBLE CLICK
=============================== */

if(submitButton.disabled){
return;
}

submitButton.disabled = true;

submitButton.style.opacity = "0.7";

/* ===============================
DATA
=============================== */

const data = {

name:
document.getElementById(
"name"
).value.trim(),

phone:
document.getElementById(
"phone"
).value.trim(),

service:
document.getElementById(
"service"
).value,

date:
document.getElementById(
"date"
).value,

time:
selectedTime,

message:
document.getElementById(
"message"
).value.trim()

};

/* ===============================
VALIDATION
=============================== */

if(

!data.name ||
!data.phone ||
!data.date ||
!data.time

){

alert(
"Veuillez remplir tous les champs obligatoires"
);

submitButton.disabled = false;

submitButton.style.opacity = "1";

return;

}

/* ===============================
SEND API
=============================== */

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

const result =
await response.json();

/* ===============================
SUCCESS
=============================== */

if(result.success){

/* PREMIUM SUCCESS */

alert(
"Réservation envoyée avec succès 🎸"
);

/* ===============================
WHATSAPP REDIRECT
=============================== */

window.location.href =
result.whatsappURL;

/* ===============================
RESET FORM
=============================== */

form.reset();

}

/* ===============================
ERROR API
=============================== */

else{

alert(

result.error ||

"Erreur réservation"

);

}

/* ===============================
SERVER ERROR
=============================== */

}catch(err){

console.error(err);

alert(
"Erreur serveur"
);

}

/* ===============================
BUTTON RESTORE
=============================== */

submitButton.disabled = false;

submitButton.style.opacity = "1";

}
);