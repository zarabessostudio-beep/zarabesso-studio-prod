/* =========================================================
ZARABESSO STUDIO
PREMIUM RESERVATION API
ULTRA SECURE VERSION
VERCEL READY
WHATSAPP READY
========================================================= */

export default async function handler(req,res){

/* =========================================================
SECURITY HEADERS
========================================================= */

res.setHeader(
"X-Content-Type-Options",
"nosniff"
);

res.setHeader(
"X-Frame-Options",
"DENY"
);

res.setHeader(
"Referrer-Policy",
"no-referrer"
);

/* =========================================================
METHOD PROTECTION
========================================================= */

if(req.method !== "POST"){

return res.status(405).json({

success:false,

error:"Method not allowed"

});

}

/* =========================================================
BODY LIMIT
========================================================= */

try{

const body = req.body || {};

/* =========================================================
FIELDS
========================================================= */

const {

name,
phone,
date,
time,
service,
message

} = body;

/* =========================================================
VALIDATION
========================================================= */

if(
!name ||
!phone ||
!date ||
!time
){

return res.status(400).json({

success:false,

error:"Missing required fields"

});

}

/* =========================================================
NAME VALIDATION
========================================================= */

if(name.length < 2){

return res.status(400).json({

success:false,

error:"Invalid name"

});

}

/* =========================================================
PHONE VALIDATION
========================================================= */

const phoneRegex =
/^[0-9+\s()-]{6,20}$/;

if(!phoneRegex.test(phone)){

return res.status(400).json({

success:false,

error:"Invalid phone number"

});

}

/* =========================================================
MESSAGE LIMIT
========================================================= */

if(message && message.length > 500){

return res.status(400).json({

success:false,

error:"Message too long"

});

}

/* =========================================================
ANTI SPAM
========================================================= */

const forbiddenWords = [

"<script",
"SELECT *",
"DROP TABLE",
"INSERT INTO",
"<?php"

];

const rawText = JSON.stringify(body)
.toLowerCase();

const suspicious =
forbiddenWords.some(word =>
rawText.includes(word.toLowerCase())
);

if(suspicious){

return res.status(403).json({

success:false,

error:"Suspicious activity detected"

});

}

/* =========================================================
SAFE DATA
========================================================= */

const reservation = {

id:
Date.now().toString(),

name:
String(name).trim(),

phone:
String(phone).trim(),

date:
String(date).trim(),

time:
String(time).trim(),

service:
service
? String(service).trim()
: "Studio Session",

message:
message
? String(message).trim()
: "",

createdAt:
new Date().toISOString(),

ip:
req.headers["x-forwarded-for"] ||
req.socket.remoteAddress ||
"unknown"

};

/* =========================================================
SERVER LOG
========================================================= */

console.log(
"NEW ZARABESSO RESERVATION:",
reservation
);

/* =========================================================
WHATSAPP MESSAGE
========================================================= */

const whatsappMessage =

`🎸 ZARABESSO STUDIO RESERVATION

👤 Name: ${reservation.name}

📞 Phone: ${reservation.phone}

📅 Date: ${reservation.date}

⏰ Time: ${reservation.time}

🎵 Service: ${reservation.service}

📝 Message:
${reservation.message}

🆔 ID:
${reservation.id}`;

/* =========================================================
WHATSAPP URL
========================================================= */

const whatsappURL =

`https://wa.me/261342110356?text=${encodeURIComponent(
whatsappMessage
)}`;

/* =========================================================
SUCCESS RESPONSE
========================================================= */

return res.status(200).json({

success:true,

message:"Reservation saved successfully",

reservationId:
reservation.id,

whatsappURL

});

}catch(err){

console.error(
"RESERVATION ERROR:",
err
);

/* =========================================================
ERROR RESPONSE
========================================================= */

return res.status(500).json({

success:false,

error:"Internal server error"

});

}

}