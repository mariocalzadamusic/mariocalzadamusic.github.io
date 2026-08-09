import express from "express";
import cors from "cors";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());



const FILE = "subscribers.json";



function getSubscribers(){

    if(!fs.existsSync(FILE)){
        return [];
    }

    return JSON.parse(
        fs.readFileSync(FILE)
    );

}



function saveSubscribers(subscribers){

    fs.writeFileSync(
        FILE,
        JSON.stringify(subscribers,null,2)
    );

}





/*
    EMAIL CONFIGURATION
*/


const transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{

        user:process.env.EMAIL_USER,

        pass:process.env.EMAIL_PASSWORD

    }

});








/*
    SUBSCRIBE
*/


app.post("/subscribe", async(req,res)=>{


    const email = req.body.email;


    if(!email){

        return res.status(400)
        .send("Email missing");

    }




    let subscribers = getSubscribers();




    const exists = subscribers.find(
        person => person.email === email
    );



    if(exists){

        return res.send(
            "Already subscribed"
        );

    }




    const token = uuidv4();




    subscribers.push({

        email:email,

        confirmed:false,

        token:token,

        date:new Date().toISOString()

    });



    saveSubscribers(subscribers);




    const confirmationURL =

    `${process.env.SERVER_URL}/confirm/${token}`;





    await transporter.sendMail({


        from:

        `"Mario Calzada" <${process.env.EMAIL_USER}>`,


        to:email,


        subject:

        "Confirm your Mario Calzada newsletter subscription",



        html:


        `

        <h2>Welcome!</h2>


        <p>
        Thank you for subscribing to my newsletter.
        </p>


        <p>
        Please confirm your subscription:
        </p>


        <a href="${confirmationURL}">
        Confirm subscription
        </a>


        <p>
        If you did not request this,
        you can ignore this email.
        </p>

        `


    });




    res.send(
        "Confirmation email sent"
    );



});









/*
    CONFIRM SUBSCRIPTION
*/


app.get("/confirm/:token",(req,res)=>{


    const token =
    req.params.token;



    let subscribers =
    getSubscribers();




    const subscriber =
    subscribers.find(
        person => person.token === token
    );




    if(!subscriber){

        return res.send(
            "Invalid confirmation link"
        );

    }




    subscriber.confirmed = true;



    saveSubscribers(subscribers);




    res.send(

    `

    <h1>
    Subscription confirmed!
    </h1>


    <p>
    Thank you for joining the newsletter.
    </p>

    `

    );



});









/*
    UNSUBSCRIBE
*/


app.get("/unsubscribe/:token",(req,res)=>{


    const token =
    req.params.token;



    let subscribers =
    getSubscribers();



    subscribers =
    subscribers.filter(
        person => person.token !== token
    );



    saveSubscribers(subscribers);



    res.send(

    `

    <h1>
    You have been unsubscribed.
    </h1>

    `

    );


});









app.get("/",(req,res)=>{


    res.send(
        "Mario Calzada Newsletter Server running"
    );


});








app.listen(3000,()=>{


console.log(
"Newsletter server running on port 3000"
);


});
