const form=document.getElementById("reservationForm");

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loaderScreen")
.style.opacity="0";

setTimeout(()=>{

document.getElementById("loaderScreen")
.style.display="none";

},1000);

},2000);

});

form.addEventListener("submit",async(e)=>{

  e.preventDefault();

  const data={
    name:document.getElementById("name").value,
    phone:document.getElementById("phone").value,
    service:document.getElementById("service").value,
    date:document.getElementById("date").value,
    time:selectedTime,
    message:document.getElementById("message").value
  };

  // SAVE BACKEND
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
  const whatsappMessage=`
🎵 ZARABESSO STUDIO RESERVATION

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
const form = document.getElementById("reservationForm");

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loaderScreen")
.style.opacity="0";

setTimeout(()=>{

document.getElementById("loaderScreen")
.style.display="none";

},1000);

},1500);

});

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const data={

name:document.getElementById("name").value,
phone:document.getElementById("phone").value,
service:document.getElementById("service").value,
date:document.getElementById("date").value,
time:selectedTime,
message:document.getElementById("message").value

};

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

const whatsappMessage=`
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