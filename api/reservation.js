/* =========================================================
ZARABESSO STUDIO
PREMIUM RESERVATION API
FINAL WHATSAPP VERSION
VERCEL READY
ULTRA SECURE
========================================================= */

export default async function handler(req, res) {

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
"strict-origin-when-cross-origin"
);

res.setHeader(
"Permissions-Policy",
"camera=(), microphone=(), geolocation=()"
);

/* =========================================================
ONLY POST
========================================================= */

if (req.method !== "POST") {

return res.status(405).json({

success: false,

error: "Method not allowed"

});

}

/* =========================================================
TRY
========================================================= */

try {

/* =========================================================
BODY
========================================================= */

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
REQUIRED VALIDATION
========================================================= */

if (
!name ||
!phone ||
!date ||
!time
) {

return res.status(400).json({

success: false,

error: "Missing required fields"

});

}

/* =========================================================
SAFE STRINGS
========================================================= */

const safeName =
String(name)
.trim()
.slice(0, 80);

const safePhone =
String(phone)
.trim()
.slice(0, 30);

const safeDate =
String(date)
.trim()
.slice(0, 30);

const safeTime =
String(time)
.trim()
.slice(0, 30);

const safeService =
service
? String(service)
.trim()
.slice(0, 100)
: "Studio Session";

const safeMessage =
message
? String(message)
.trim()
.slice(0, 500)
: "No message";

/* =========================================================
NAME VALIDATION
========================================================= */

if (safeName.length < 2) {

return res.status(400).json({

success: false,

error: "Invalid name"

});

}

/* =========================================================
PHONE VALIDATION
========================================================= */

const phoneRegex =
/^[0-9+\s()-]{6,20}$/;

if (!phoneRegex.test(safePhone)) {

return res.status(400).json({

success: false,

error: "Invalid phone number"

});

}

/* =========================================================
ANTI SPAM
========================================================= */

const forbiddenWords = [

"<script",
"</script>",
"DROP TABLE",
"SELECT *",
"INSERT INTO",
"<?php",
"UNION SELECT"

];

const rawText =
JSON.stringify(body)
.toLowerCase();

const suspicious =
forbiddenWords.some((word) =>
rawText.includes(
word.toLowerCase()
)
);

if (suspicious) {

return res.status(403).json({

success: false,

error: "Suspicious activity detected"

});

}

/* =========================================================
RESERVATION OBJECT
========================================================= */

const reservation = {

id:
`ZARA-${Date.now()}`,

name:
safeName,

phone:
safePhone,

date:
safeDate,

time:
safeTime,

service:
safeService,

message:
safeMessage,

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
"NEW RESERVATION:",
reservation
);

/* =========================================================
WHATSAPP MESSAGE
FINAL PREMIUM COMPATIBLE VERSION
========================================================= */

const whatsappMessage =

`🎸 *ZARABESSO STUDIO*

✨ Nouvelle Réservation

==============================

👤 *ARTISTE*
${reservation.name}

==============================

📞 *CONTACT*
${reservation.phone}

==============================

📅 *DATE*
${reservation.date}

==============================

⏰ *HEURE*
${reservation.time}

==============================

🎵 *SERVICE*
${reservation.service}

==============================

📝 *PROJET MUSICAL*
${reservation.message}

==============================

🆔 *RÉFÉRENCE*
${reservation.id}

==============================

🔥 *GOLD MUSIC EXPERIENCE*

🎧 Production • Créativité • Excellence

Merci d’avoir choisi
*Zarabesso Studio* 🎸`;

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

success: true,

message:
"Reservation created successfully",

reservationId:
reservation.id,

whatsappURL

});

}

/* =========================================================
ERROR
========================================================= */

catch (error) {

console.error(
"API ERROR:",
error
);

return res.status(500).json({

success: false,

error:
"Internal server error"

});

}

}