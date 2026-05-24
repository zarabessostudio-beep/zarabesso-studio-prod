// ===============================
// PREMIUM GLASSMORPHISM CALENDAR
// calendar.js
// ZARABESSO STUDIO
// ===============================

const timeSlots =
document.getElementById("timeSlots");

// HOURS

const hours = [

"09:00",
"10:00",
"11:00",
"12:00",
"14:00",
"15:00",
"16:00",
"17:00",
"18:00",
"19:00"

];

let selectedTime = "";

// ===============================
// CREATE SLOTS
// ===============================

hours.forEach((hour,index)=>{

const slot =
document.createElement("div");

slot.className = "slot";

// RANDOM GLOW COLOR

const colors = [

"violet",
"blue",
"green",
"red"

];

const randomColor =
colors[Math.floor(
Math.random() * colors.length
)];

slot.classList.add(randomColor);

// CONTENT

slot.innerHTML = `

<div class="slot-glow"></div>

<div class="slot-inner">

<i class="ri-time-line"></i>

<span>${hour}</span>

</div>

`;

// CLICK

slot.onclick = ()=>{

document.querySelectorAll(".slot")
.forEach((s)=>{

s.classList.remove("active");

});

slot.classList.add("active");

selectedTime = hour;

// PULSE EFFECT

slot.animate([

{
transform:"scale(1)"
},

{
transform:"scale(1.08)"
},

{
transform:"scale(1)"
}

],{

duration:700,
iterations:1

});

};

// APPEAR ANIMATION

slot.style.animationDelay =
`${index * 0.08}s`;

timeSlots.appendChild(slot);

});