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

// ===============================
// FORM
// ===============================

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const data = {

name:
document.getElementById("name").value,

phone:
document.getElementById("phone").value,

service:
document.getElementById("service").value,

date:
document.getElementById("date").value,

time:selectedTime,

message:
document.getElementById("message").value

};

// SAVE API

try{

await fetch("/api/reservation",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

}catch(err){

console.log(err);

}

// WHATSAPP

const whatsappMessage = `

🎵 ZARABESSO STUDIO

👤 Nom: ${data.name}
📞 Téléphone: ${data.phone}
🎧 Service: ${data.service}
📅 Date: ${data.date}
⏰ Heure: ${data.time}
📝 Projet: ${data.message}

`;

window.open(

`https://wa.me/261342110356?text=${encodeURIComponent(whatsappMessage)}`,

"_blank"

);

});