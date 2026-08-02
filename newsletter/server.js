import express from "express"
import fs from "fs"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())


const FILE="subscribers.json"



app.post("/subscribe",(req,res)=>{


const email=req.body.email


if(!email){

return res.status(400).send("Missing email")

}



let list=[]


if(fs.existsSync(FILE)){

list=JSON.parse(
fs.readFileSync(FILE)
)

}



if(!list.includes(email)){

list.push(email)

}


fs.writeFileSync(
FILE,
JSON.stringify(list,null,2)
)



res.send("Subscribed")


})




app.listen(3000,()=>{

console.log(
"Newsletter server running"
)

})
