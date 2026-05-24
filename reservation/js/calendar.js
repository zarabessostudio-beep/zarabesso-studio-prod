const timeSlots=document.getElementById("timeSlots");

const hours=[
"09:00",
"10:00",
"11:00",
"12:00",
"14:00",
"15:00",
"16:00",
"17:00",
"18:00"
];

let selectedTime="";

hours.forEach(hour=>{

const slot=document.createElement("div");
slot.className="slot";
slot.innerText=hour;

slot.onclick=()=>{

document.querySelectorAll(".slot")
.forEach(s=>s.classList.remove("active"));

slot.classList.add("active");
selectedTime=hour;

};

timeSlots.appendChild(slot);
});