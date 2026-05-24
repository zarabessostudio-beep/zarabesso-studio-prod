export default async function handler(req,res){

if(req.method!=="POST"){
return res.status(405).json({error:"Method not allowed"});
}

try{

const body=req.body;

console.log("NEW RESERVATION:",body);

return res.status(200).json({
success:true,
message:"Reservation saved"
});

}catch(err){

return res.status(500).json({
error:err.message
});

}
}