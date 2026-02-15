import express from "express"
import fs from "fs"
import nodemailer from "nodemailer"

const app = express()
app.use(express.json())
app.use(express.static("public"))

const FILE = "subscribers.json"

/* SAVE EMAIL */
app.post("/subscribe", (req,res)=>{
  const { email } = req.body

  if(!email) return res.sendStatus(400)

  const list = JSON.parse(fs.readFileSync(FILE))
  list.push(email)
  fs.writeFileSync(FILE, JSON.stringify(list,null,2))

  res.sendStatus(200)
})

/* SEND NEWSLETTER */
app.post("/send", async(req,res)=>{
  const { subject, message } = req.body

  const list = JSON.parse(fs.readFileSync(FILE))

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"YOUR_EMAIL@gmail.com",
      pass:"YOUR_APP_PASSWORD"
    }
  })

  for(const email of list){
    await transporter.sendMail({
      from:"Mario Calzada",
      to:email,
      subject,
      html:message
    })
  }

  res.send("Newsletter sent")
})

app.listen(3000,()=>console.log("Server running"))
